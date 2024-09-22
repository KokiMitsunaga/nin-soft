"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ScrollPrompt from "./ScrollPrompt";
import { Nunito_Sans } from "next/font/google";
import { gsap } from "gsap";

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const textList = [
  "ゲーム紹介ステージへようこそ",
  "僕と一緒にゲームを探す冒険に出よう",
  "Here We Go！",
];

const Top = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [isFinalText, setIsFinalText] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  // human.png のリファレンスを作成
  const humanRef = useRef(null);

  useEffect(() => {
    if (isFinalText) {
      const timer = setTimeout(() => {
        setShowScrollPrompt(true); // 3秒後にScrollPromptを表示
      }, 3000);
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
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFinalText]);

  // // human.png のアニメーション
  useEffect(() => {
    const tl = gsap.timeline();

    // 最初の右への移動アニメーション
    tl.to(humanRef.current, {
      duration: 4, // 4秒かけて
      x: "50vw", // 横方向に画面中央へ
      ease: "power2.out", // 滑らかなアニメーション
      transform: "translateX(-50%)", // 正確な中央位置調整
    });

    // 右上への移動アニメーション
    tl.to(humanRef.current, {
      duration: 3, // 3秒かけて
      x: "75vw", // 右方向にさらに移動
      y: "-28vh", // 上方向に移動
      ease: "power2.out", // 滑らかなアニメーション
    });

    // 下に移動しながらフェードアウトするアニメーション
    tl.to(humanRef.current, {
      duration: 2, // 2秒かけて
      y: "11vh",
      clipPath: "inset(0% 0% 100% 0%)", // 下から上にクリップ
      ease: "power2.out", // 滑らかなアニメーション
    });

    return () => {
      tl.kill(); // タイムラインをクリーンアップ
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // スクロール量が一定以上ならIntoroduction画面に移動
    if (e.currentTarget.scrollTop > window.innerHeight * 0.8) {
      document
        .getElementById("introduction")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="h-screen overflow-hidden" onScroll={handleScroll}>
      <div
        className="relative flex justify-center h-screen w-screen"
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "bottom", // 画像の下側を固定
        }}
      >
        <div className="absolute pt-20 px-8 flex justify-center items-center w-full text-xl">
          <div className=" h-1/5 p-10 w-2/5 bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden">
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

      <div
        ref={humanRef} // human.png の要素にリファレンスを追加
        className="absolute"
        style={{
          width: "calc(100vw - 86vw)",
          height: "calc(100vh - 60vh)",
          top: "calc(100vh - 49vh)",
        }}
      >
        <Image
          alt="human"
          src="/human.png"
          layout="fill"
          objectFit="contain"
          className=""
        />
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
