"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export function ApplyIDO() {
  const [text, setText] = useState("");
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const fullText = "Do you want to launch your product on ModPad?";

  useEffect(() => {
    let currentIndex = 0;

    const animateText = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setAnimationCompleted(true);
        setTimeout(() => {
          setText(fullText.charAt(0));
          currentIndex = 1;
          setAnimationCompleted(false);
          animateText();
        }, 1000);
      }
    };

    const intervalId = setInterval(animateText, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center py-12 mt-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-center mb-4 px-6 text-gray-300">
          {text}
        </h1>
      </div>
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSdEaXgiQvPZ2CnT_nnCXXEmDyeOeJbypYQMc4Go9h3x1-AA8Q/viewform"
        className="border border-gray-500 text-gray-300 px-4 py-2 rounded-lg relative overflow-hidden mt-6 gradient-button"
      >
        Apply For IDO
      </Link>
    </div>
  );
}
