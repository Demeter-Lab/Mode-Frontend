export default function JoinPool() {
  return (
    <>
      <div className="p-8">
        <form className="border border-gray-600 p-6 md:p-12 lg:p-16 mx-auto rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="myInput"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Amount: (max: ETH)
            </label>
            <input
              type="text"
              id="myInput"
              name="myInput"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="0.0"
            />
          </div>

          <div className="mb-6 flex items-center justify-center">
            <button
              type="submit"
              className="border border-gray-400 w-1/2 text-gray-200 py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-blue-600"
            >
              Buy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
