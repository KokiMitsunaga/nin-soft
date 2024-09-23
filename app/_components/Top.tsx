"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ScrollPrompt from "./ScrollPrompt";
import { gsap } from "gsap";

const textList = [
  "ゲーム紹介ステージへようこそ",
  "僕と一緒にゲームを探す冒険に出よう",
  "Here We Go!",
];

const Top = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [isFinalText, setIsFinalText] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

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
      duration: 4,
      x: "43vw",
      ease: "power2.out",
    });

    // 右上への移動アニメーション
    tl.to(humanRef.current, {
      duration: 3,
      x: "68vw",
      y: "-28vh",
      ease: "power2.out",
    });

    // 下に移動しながらフェードアウトするアニメーション
    tl.to(humanRef.current, {
      duration: 2,
      y: "11vh",
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "power2.out",
    });

    return () => {
      tl.kill();
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
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute pt-20 px-8 flex justify-center items-center w-full font-tsuku font-extrabold text-4xl 2xl:text-5xl">
          <div
            className="w-4/5 p-10 bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden"
            style={{ height: "20vh" }}
          >
            <div
              className={`${
                animateOut ? "animate-slideOut" : "animate-slideIn"
              }`}
            >
              {textList[currentTextIndex]}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={humanRef}
        className="absolute"
        style={{
          width: "14vw",
          height: "40vh",
          top: "51vh",
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
        <div className="absolute bottom-44 w-full flex justify-center">
          <ScrollPrompt />
        </div>
      )}
    </main>
  );
};

export default Top;
