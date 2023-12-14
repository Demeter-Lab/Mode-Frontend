"use client";
import React from "react";
import Image from "next/image";
import ftr_ic01 from "/app/assets/icons/ftr_ic01.png";
import ftr_ic02 from "../app/assets/icons/ftr_ic08.png";
import ftr_ic03 from "../app/assets/icons/ftr_ic03.png";

const featuresData = [
  {
    id: 1,
    image: ftr_ic01,
    header: "Launchpad",
    paragraph:
      "ModPad is your platform to find the best innovative projects and investments on the Mode Blockchain.",
  },
  {
    id: 2,
    image: ftr_ic02,
    header: "Safer Investing",
    paragraph:
      "All the projects launched will be vetted and audited to ensure that all the investors are safe guarded against scams and rugs",
  },
  {
    id: 3,
    image: ftr_ic03,
    header: "Low Fees",
    paragraph:
      "Mode has implemented Optimism's Bedrock upgrade which has significantly reduced the fees to be over 95% less than Ethereum.",
  },
];

export function FeaturesBox() {
  return (
    <div id="features">
      <h1 className="word">
        <span>F</span>
        <span>E</span>
        <span>A</span>
        <span>T</span>
        <span>U</span>
        <span>R</span>
        <span>E</span>
        <span>S</span>
      </h1>

      <div className="container mx-auto py-8">
        <div className="px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#0f0c29] p-6 rounded-lg shadow-md flex flex-col items-center py-24 space-y-4 grid-item"
            >
              <Image
                src={feature.image}
                alt={feature.header}
                className="mb-2 w-12 h-12"
              />
              <h2 className="text-2xl text-gray-200 font-bold mb-2">
                {feature.header}
              </h2>
              <p className="text-gray-500 text-center">{feature.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


