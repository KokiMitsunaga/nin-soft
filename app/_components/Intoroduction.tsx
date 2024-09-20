"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";
import GenreLabel from "./GenreLabel";
import ListButton from "./ListButton";

interface IntoroductionProps {
  label: string;
  labelColor: string;
  bgImage: string;
  gameInfo: {
    id: number;
    image: string;
    alt: string;
    description: string;
    url: string;
  }[];
  commentList: string[];
  humanImage: string;
  streamingImage?: string;
  buttonTextColor: string;
  buttonBgColor: string;
}

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const Intoroduction = ({
  label,
  labelColor,
  bgImage,
  gameInfo,
  commentList,
  humanImage,
  streamingImage,
  buttonTextColor,
  buttonBgColor,
}: IntoroductionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intoroductionRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState(0); // 背景の位置を管理
  const [comment, setComment] = useState(commentList[0]); // 文言の状態を管理
  const [scrollCompleted, setScrollCompleted] = useState(false); // スクロール完了の状態を管理

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      const intoroductioin = intoroductionRef.current;

      if (scrollContainer && intoroductioin) {
        const rect = intoroductioin.getBoundingClientRect();
        const isIntoroductionInView =
          rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isIntoroductionInView) {
          // 横スクロールを優先
          scrollContainer.scrollLeft += event.deltaY;

          // 背景を少しずつ左に動かす
          setBackgroundPosition(
            (prevPosition) => prevPosition - event.deltaY * 0.2
          );

          // スクロール量に応じて表示されるコンテンツを計算
          const contentWidth = scrollContainer.clientWidth / 1.3;
          const scrollLeft = scrollContainer.scrollLeft;

          // 次のコンテンツが少しでも見えたら切り替える
          const visibleIndex = Math.min(
            Math.floor(scrollLeft / contentWidth),
            gameInfo.length - 1
          );

          if (scrollLeft % contentWidth > contentWidth * 0.05) {
            setComment(commentList[visibleIndex]);
          }

          // 横スクロール完了を判定
          if (
            scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
          ) {
            setScrollCompleted(true);
          } else if (scrollLeft === 0) {
            // 最初のコンテンツに戻ったらスクロール完了を解除
            setScrollCompleted(false);
          }

          // 縦スクロールの制御
          if (
            (scrollLeft === 0 && event.deltaY < 0 && !scrollCompleted) ||
            (scrollLeft + scrollContainer.clientWidth ===
              scrollContainer.scrollWidth &&
              event.deltaY > 0 &&
              scrollCompleted)
          ) {
            return;
          }

          // 縦スクロールを防止
          if (scrollLeft > 0 && event.deltaY < 0) {
            event.preventDefault();
          }
        }
      }
    };

    // 画面全体でスクロールイベントをキャプチャする
    const handleGlobalScroll = (event: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      if (
        scrollContainer &&
        scrollContainer.scrollLeft > 0 &&
        !scrollCompleted
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("wheel", handleGlobalScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("wheel", handleGlobalScroll);
    };
  }, [scrollCompleted]);

  return (
    <div ref={intoroductionRef} className="relative w-full h-screen z-20">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundPosition: `${backgroundPosition}px 0`,
          backgroundSize: "cover",
          transition: "background-position 0.1s linear",
        }}
      />

      <GenreLabel label={label} textColor={labelColor} />
      <ListButton bgColor={buttonBgColor} textColor={buttonTextColor} />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto whitespace-nowrap w-full px-8 space-x-4"
        >
          {gameInfo.map((gameInfo) => (
            <Link href={`${gameInfo.url}`} key={gameInfo.id}>
              <div
                className="inline-block bg-white p-4 rounded-lg flex-shrink-0"
                style={{
                  width: "calc(100vw / 1.3)",
                  height: "calc(100vh - 70vh)",
                }}
              >
                <div className="w-full h-auto mb-4">
                  <Image
                    src={gameInfo.image}
                    alt={gameInfo.alt}
                    layout="responsive"
                    width={900}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{gameInfo.alt}</h3>
                  <p className="text-sm mt-2">{gameInfo.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="absolute pt-20 px-8 flex justify-center items-center w-full">
          <div className="h-28 p-2 w-full bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden">
            <div className={NunitoFont.className}>{comment}</div>
          </div>
        </div>

        <div
          className="z-30"
          style={{
            marginTop: "calc(100vh - 73vh)",
            marginRight: "calc(100vw - 30vw)",
          }}
        >
          <Image
            alt="human"
            className=""
            height={80}
            width={80}
            src={`${humanImage}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Intoroduction;
