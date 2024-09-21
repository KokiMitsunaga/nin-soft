"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollPrompt from "./ScrollPrompt";
import { Nunito_Sans } from "next/font/google";

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const textList = [
  "ゲームラインナップページへようこそ",
  "僕と一緒にゲームを探す冒険に出よう",
  "Here We Go！",
];

const Top = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [isFinalText, setIsFinalText] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  useEffect(() => {
    if (isFinalText) {
      const timer = setTimeout(() => {
        setShowScrollPrompt(true); // 3秒後にScrollPromptを表示
      }, 3000); // 3秒後
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % textList.length;
          if (nextIndex === textList.length - 1) {
            setIsFinalText(true); // 最後のテキスト表示を設定
            clearInterval(interval); // タイマー停止
            return nextIndex;
          }
          return nextIndex;
        });
        setAnimateOut(false);
      }, 600); // アニメーションの長さに応じて調整（例: 600ms）
    }, 3000); // 3秒ごとに切り替え

    return () => clearInterval(interval);
  }, [isFinalText]);

  return (
    <main>
      <div className="relative flex justify-center h-screen w-screen">
        <Image
          src="/bg.svg"
          alt="background"
          className="object-cover"
          quality={100}
          sizes="100vw"
          fill
        />
        <div className="absolute pt-20 px-8 flex justify-center items-center w-full">
          <div className="h-28 p-2 w-full bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden">
            <div
              className={`${NunitoFont.className} ${
                animateOut ? "animate-slideOut" : "animate-slideIn"
              }`}
            >
              {textList[currentTextIndex]}
            </div>
          </div>
        </div>
      </div>

      {showScrollPrompt && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <ScrollPrompt />
        </div>
      )}
    </main>
  );
};

export default Top;
