"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I participate in IDOs?",
      answer:
        "Visit the launchpad list page, select the IDO you're interested in, conduct your research, gain confidence in the project, and invest in the pool.",
    },
    {
      question: "Is registration compulsory for each IDO",
      answer:
        "It is not compulsory, although each project is unique and they have different requirements like KYC or whitelisting.",
    },
    {
      question: "Which currency do you accept for IDO's?",
      answer:
        "ModPad Accepts $ETH(mode). You need to fund your wallet with $ETH(mode) to be able to participate in IDO's",
    },
    {
      question: "Are my investments safe?",
      answer:
        "All the projects listed on ModPad will be vetted and audited to ensure ModPad investors are safe against scams and rugs. As an investor, you need to make sure you thoroughly understand the project that you will be investing and do all the required research and only invest when you are confident.",
    },
    {
      question:
        "How do I find the token address for the project listed?",
      answer:
        "Generally, the official address will be shared by the respective projects. Also, you can see it on the pool page (you might need to refresh the page), as soon as ModePad team receives this information.",
    },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 gap-8 py-12 px-6">
      <h2 className="text-2xl text-gray-300 font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-400 py-4">
            <button
              className="flex justify-between items-center w-full focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span
                className={`font-bold text-gray-400 ${
                  openIndex === index ? "text-gray-200" : ""
                }`}
              >
                {faq.question}
              </span>
              <svg
                className={`w-4 h-4 rounded-full transition-transform transform ${
                  openIndex === index
                    ? "rotate-180 bg-gray-600 text-gray-200"
                    : "bg-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    openIndex === index
                      ? "M6 18L18 6M6 6l12 12"
                      : "M12 6v12M6 12h12"
                  }
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="mt-4 text-gray-500">{faq.answer}</div>
            )}
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default FAQ;
