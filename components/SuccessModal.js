import React, { useState } from "react";

const SuccessModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isVisible ? "visible" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-90"></div>{" "}
      {/* Backdrop */}
      <div className="bg-white w-96 p-8 rounded-md shadow-md relative">
        <h2 className="text-[#0f0c29] text-lg font-bold mb-4">
          Participation Successful!
        </h2>
        <p className="text-gray-700">
          Congratulations! You have successfully participated in this pool.
          Tokens have been sent to your wallet. Thank you from ModePad!
        </p>
        <button
          onClick={closeModal}
          className="mt-6 bg-black text-gray-300 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
