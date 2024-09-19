"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const contentList = [
  {
    id: 1,
    image: "/game.jpg",
    alt: "Game 1",
    description: "Game 1 description goes here.",
  },
  {
    id: 2,
    image: "/game.jpg",
    alt: "Game 2",
    description: "Game 2 description goes here.",
  },
  {
    id: 3,
    image: "/game.jpg",
    alt: "Game 3",
    description: "Game 3 description goes here.",
  },
  {
    id: 4,
    image: "/game.jpg",
    alt: "Game 4",
    description: "Game 4 description goes here.",
  },
  {
    id: 5,
    image: "/game.jpg",
    alt: "Game 5",
    description: "Game 5 description goes here.",
  },
  {
    id: 6,
    image: "/game.jpg",
    alt: "Game 6",
    description: "Game 6 description goes here.",
  },
];

const comments = [
  "Discover the adventure in Game 1!",
  "Game 2 awaits you with new challenges!",
  "Explore the universe of Game 3!",
  "Game 4 is just around the corner!",
  "Prepare for an epic journey in Game 5!",
  "Game 6: The final frontier!",
];

const UnderSea = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const underSeaRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState(0); // 背景の位置を管理
  const [comment, setComment] = useState(comments[0]); // 文言の状態を管理

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      const underSea = underSeaRef.current;

      if (scrollContainer && underSea) {
        const rect = underSea.getBoundingClientRect();
        const isunderSeaInView =
          rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isunderSeaInView) {
          scrollContainer.scrollLeft += event.deltaY;

          // 背景を少しずつ左に動かす
          setBackgroundPosition(
            (prevPosition) => prevPosition - event.deltaY * 0.2
          ); // 0.2で速度を調整

          // スクロール量に応じて表示されるコンテンツを計算
          const contentWidth = scrollContainer.clientWidth / 1.3; // 各コンテンツの幅
          const scrollLeft = scrollContainer.scrollLeft;

          // ここで次のコンテンツが少しでも見えたら切り替えるように調整
          const visibleIndex = Math.min(
            Math.floor(scrollLeft / contentWidth),
            contentList.length - 1
          );

          // 現在のスクロール位置とコンテンツの境界をより敏感に判定
          if (scrollLeft % contentWidth > contentWidth * 0.05) {
            setComment(comments[visibleIndex]);
          }

          if (
            (scrollContainer.scrollLeft === 0 && event.deltaY < 0) ||
            (scrollContainer.scrollLeft + scrollContainer.clientWidth ===
              scrollContainer.scrollWidth &&
              event.deltaY > 0)
          ) {
            return;
          }
          event.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div ref={underSeaRef} className="relative w-full h-screen z-20">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url('/undersea.jpg')`,
          backgroundPosition: `${backgroundPosition}px 0`, // 水平方向に背景を動かす
          backgroundSize: "cover",
          transition: "background-position 0.1s linear", // スムーズに動かす
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto whitespace-nowrap w-full px-8 space-x-4"
        >
          {contentList.map((content) => (
            <Link href="/example" key={content.id}>
              <div
                className="inline-block bg-white p-4 rounded-lg flex-shrink-0"
                style={{
                  width: "calc(100vw / 1.3)",
                  height: "calc(100vh - 70vh)",
                }}
              >
                <div className="w-full h-auto mb-4">
                  <Image
                    src={content.image}
                    alt={content.alt}
                    layout="responsive"
                    width={900}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{content.alt}</h3>
                  <p className="text-sm mt-2">{content.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="absolute pt-20 px-8 flex justify-center items-center w-full">
          <div className="h-28 p-2 w-full bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden">
            <div className={NunitoFont.className}>{comment}</div>{" "}
            {/* 動的に文言を表示 */}
          </div>
        </div>

        <div
          className="z-30"
          style={{
            marginTop: "calc(100vh - 73vh)",
            marginRight: "calc(100vw - 40vw)",
          }}
        >
          <Image
            alt="human"
            className="rotate-90"
            height={80}
            width={80}
            src="/human.png"
          />
        </div>
      </div>
    </div>
  );
};

export default UnderSea;
