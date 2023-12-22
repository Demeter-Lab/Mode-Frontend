import { LaunchpadABI } from "@/constants/constant";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import { app } from "@/firebase/firebase";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function JoinPool({
  LaunchpadContractAddress,
  signer,
  userAddress,
  poolID,
}) {
  const contract = new ethers.Contract(
    LaunchpadContractAddress,
    LaunchpadABI,
    signer
  );

  const [amount, setAmount] = useState("");
  const [maxInvestment, setMaxInvestment] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [userBalance, setUserBalance] = useState(0); 

  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMaxClick = () => {
    setAmount(String(maxInvestment));
  };

  const handleBuyTokens = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const amountAsNumber = parseFloat(amount);
      const result = (amountAsNumber * 10 ** 18).toString();

      const tx = await contract.buyTokens({ value: BigNumber.from(result) });
      const receipt = await tx.wait();
      const transactionHash = receipt.logs[1]?.transactionHash;

      if (!transactionHash) {
        throw new Error("Transaction hash not found");
      }

      setTransactionSuccess(true);
      console.log("Transaction successful: ", receipt.transactionHash);
      console.log("Transaction hash: ", transactionHash);

      const poolToUpdate = fetchedData.find((pool) => pool.id === poolID);
      console.log("Pool ID:", poolID);
      console.log("Fetched Data:", fetchedData);

      if (!poolToUpdate) {
        console.error("Pool not found");
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      const poolDocRef = doc(db, "pools", poolToUpdate.id);

      const poolDocSnapshot = await getDoc(poolDocRef);

      if (!poolDocSnapshot.exists()) {
        throw new Error("Pool document not found");
      }

      const currentData = poolDocSnapshot.data();

      const updatedData = {
        ...currentData,
        totalInvested: currentData.totalInvested + Number(amount),
      };

      await updateDoc(poolDocRef, updatedData);

      setLoading(false);
    } catch (error) {
      console.error("Error buying tokens:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getFirestore(app);
        const collectionRef = collection(db, "pools");
        const querySnapshot = await getDocs(collectionRef);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched data:", data);

        setFetchedData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching Data: ", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function getInvestment() {
      const maxInvestment = await contract.maxInvestment();
      const maxInvestmentInEthers = ethers.utils.formatUnits(
        maxInvestment.toString(),
        "ether"
      );
      const minInvestment = await contract.minInvestment();
      const minInvestmentInEthers = ethers.utils.formatUnits(
        minInvestment.toString(),
        "ether"
      );
      setMinInvestment(minInvestmentInEthers);
      setMaxInvestment(maxInvestmentInEthers);
    }

    getInvestment();
  }, []);

  useEffect(() => {
    async function getUserBalance() {
      try {
        const balanceWei = await signer.provider.getBalance(userAddress);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setUserBalance(balanceEth);
      } catch (error) {
        console.error("Error fetching user balance:", error.message);
      }
    }

    getUserBalance();
  }, [userAddress, signer]);

  return (
    <>
      <div className="p-8">
        <form
          onSubmit={handleBuyTokens}
          className="border border-gray-600 p-6 md:p-12 lg:p-16 mx-auto rounded-lg"
        >
          <div className="mb-4 relative">
            <label
              htmlFor="myInput"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Amount: (max: {maxInvestment} ETH)
            </label>
            <div className="relative flex">
              <input
                type="text"
                id="myInput"
                name="myInput"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder={`Min: ${minInvestment} ETH`}
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/3
                 text-red-500 cursor-pointer font-medium"
                onClick={handleMaxClick}
              >
                max
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-2 text-right">
              User ETH Balance: {userBalance} ETH
            </p>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <button
              type="submit"
              className="border border-gray-400 w-1/2 text-gray-200 py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              {loading ? "Buying..." : "Buy"}
            </button>
          </div>
        </form>
      </div>
      {transactionSuccess && (
        <SuccessModal onClose={() => setTransactionSuccess(false)} />
      )}
    </>
  );
}
