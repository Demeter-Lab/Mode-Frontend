import React from "react";

export function Footer() {
  return (
    <div className="bg-[#0f0c29] mt-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 py-12 px-6 min-h-[10vh]">
        <div className="w-full lg:w-1/5 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-300 mb-2">
            <span className="mr-2">🛰️</span>
            <span className="tracking-wide">ModePad</span>
          </h1>
          <p className="text-[#6F6C90] text-xm">
            ...empowering token projects to reach their full potential
          </p>
        </div>

        <div className="w-full lg:w-1/5 flex flex-col items-start">
          <h1 className="lg:text-lg font-medium text-gray-300">Solutions</h1>
          <ul className="text-gray-700 font-normal mt-6">
            <li className="text-sm text-gray-400 mt-2">Use Cases</li>
            <li className="text-sm text-gray-400 mt-2">Apply For IDO</li>
          </ul>
        </div>

        <div className="w-full lg:w-1/5 flex flex-col items-start">
          <h1 className="lg:text-lg font-medium text-gray-300">Company</h1>
          <ul className="text-gray-700 font-normal mt-6">
            <li className="text-sm text-gray-400">About Us</li>
            <li className="text-sm text-gray-400 mt-2">Newsletters</li>
            <li className="text-sm text-gray-400 mt-2">Our Partners</li>
            <li className="text-sm text-gray-400 mt-2">Career</li>
            <li className="text-sm text-gray-400 mt-2">Contact Us</li>
          </ul>
        </div>

        <div className="w-full lg:w-1/5 flex flex-col items-start">
          <h1 className="lg:text-lg font-medium text-gray-300">Help</h1>
          <ul className="text-gray-700 font-normal mt-6">
            <li className="text-sm text-gray-400">FAQ</li>
            <li className="text-sm text-gray-400 mt-2">Documentation</li>
            <li className="text-sm text-gray-400 mt-2">How to participate in IDO</li>
          </ul>
        </div>

        <div className="w-full lg:w-1/5 flex flex-col items-start">
          <h1 className="lg:text-lg font-medium text-gray-300">Follow Us</h1>
          <ul className="text-gray-700 font-normal mt-6">
            <li className="text-sm text-gray-400 mt-2">
              <a href="https://twitter.com/">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="py-4 px-8">
          {" "}
          <hr
            className="border-t-2 border-gray-400 my-4"
            style={{ maxWidth: "90%" }}
          />{" "}
        </div>
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center py-4 px-6">
          <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
            <span className="mb-2 lg:mb-0 lg:mr-2 text-gray-500">
              Privacy Policy
            </span>
            <span className="hidden lg:inline lg:mx-2 text-gray-600">|</span>
            <span className="mb-2 lg:mb-0 lg:mr-2 text-gray-500">
              Terms & Conditions
            </span>
            <span className="hidden lg:inline lg:mx-2 text-gray-600">|</span>
            <span className="mb-2 lg:mb-0 text-gray-500">Cookie Policy</span>
          </div>

          <div className="text-gray-500">
            &copy; ModPad {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

