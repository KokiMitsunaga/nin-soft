"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";
import gamesData from "../data/gamesData.json";
import Sidebar from "./Sidebar";

// ゲーム情報の型定義
interface GameInfo {
  id: number;
  image: string;
  alt: string;
  description: string;
  url: string;
}

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const Intoroduction = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intoroductionRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [comment, setComment] = useState("");
  const [scrollCompleted, setScrollCompleted] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<
    "ラインナップ" | "発売中" | "今後発売"
  >("ラインナップ");

  // 初期状態を gamesData から取得
  const [bgImage, setBgImage] = useState(gamesData[selectedGenre].bgImage);
  const [gameInfo, setGameInfo] = useState<GameInfo[]>(
    gamesData[selectedGenre].gameInfo
  );
  const [commentList, setCommentList] = useState<string[]>(
    gamesData[selectedGenre].commentList
  );
  const [humanImage, setHumanImage] = useState(
    gamesData[selectedGenre].humanImage
  );

  const handleSelectChange = (
    value: "ラインナップ" | "発売中" | "今後発売"
  ) => {
    setSelectedGenre(value);

    // ジャンルに応じて状態を更新
    setBgImage(gamesData[value].bgImage);
    setGameInfo(gamesData[value].gameInfo);
    setCommentList(gamesData[value].commentList);
    setHumanImage(gamesData[value].humanImage);

    // 横スクロール位置をリセット
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }

    // コメントもリセットして最初のコンテンツに対応するコメントを表示
    setComment(gamesData[value].commentList[0]);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      const intoroduction = intoroductionRef.current;

      if (scrollContainer && intoroduction) {
        const rect = intoroduction.getBoundingClientRect();
        const isIntoroductionInView =
          rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isIntoroductionInView) {
          // 横スクロール操作
          scrollContainer.scrollLeft += event.deltaY;

          const contentWidth = scrollContainer.clientWidth / 1.3;
          const scrollLeft = scrollContainer.scrollLeft;
          const maxScrollLeft =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;

          // スクロール位置に基づいて表示するコメントを更新
          let visibleIndex = Math.round(scrollLeft / contentWidth);

          // 正方向のスクロール時、最後のコンテンツで正確にコメントを表示
          if (event.deltaY > 0) {
            visibleIndex = Math.min(visibleIndex, gameInfo.length - 1);
          } else {
            // 逆方向のスクロール時、インデックスが負の数になるのを防ぐ
            visibleIndex = Math.max(visibleIndex, 0);
          }

          // コメントの更新
          setComment(commentList[visibleIndex]);

          // 背景画像のスクロール操作
          if (scrollLeft < maxScrollLeft && scrollLeft > 0) {
            const scrollFactor = 1; // 背景が進むスピード
            setBackgroundPosition(-(scrollLeft * scrollFactor));
          }

          // スクロールがコンテンツの終わりに到達した場合
          if (scrollLeft >= maxScrollLeft) {
            setScrollCompleted(true);
          } else if (scrollLeft === 0) {
            setScrollCompleted(false);
          }
        }
      }
    };

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
  }, [scrollCompleted, gameInfo, commentList]);

  return (
    <div ref={intoroductionRef} className="relative h-screen z-20 flex">
      {/* Main content */}
      <div className="w-5/6 h-full relative">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundPosition: `${backgroundPosition}px 0`,
            backgroundSize: "cover",
            transition: "background-position 0.1s linear",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start z-30">
          {/* 横スクロールコンテナ */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden whitespace-nowrap w-full px-8 space-x-96 scroll-container"
            style={{ paddingLeft: "16vw", paddingRight: "16vw" }} // 左に少し余白を調整
          >
            {gameInfo.map((game) => (
              <Link href={`${game.url}`} key={game.id}>
                <div
                  className="inline-block flex-shrink-0 link-container overflow-hidden relative group bg-white p-10 rounded-3xl" // 背景白、パディング追加
                  style={{
                    width: "calc(100vw / 2)",
                    marginTop: "calc(100vh - 95vh)",
                  }}
                >
                  <Image
                    src={game.image}
                    alt={game.alt}
                    layout="responsive"
                    width={900}
                    height={600}
                    className="object-cover rounded-3xl w-full h-full"
                  />
                  {/* タイトルと説明を重ねて表示 */}
                  <div className="link-content absolute bottom-0 left-0 w-full p-20 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                    <h3 className="font-bold text-3xl">{game.alt}</h3>
                    <p className="text-xl mt-2">{game.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="flex items-center"
            style={{
              marginTop: "calc(100vh - 98vh)",
              marginLeft: "calc(100vw - 94vw)",
            }}
          >
            {/* 人物画像 */}
            <div className="z-30 flex justify-center items-center">
              <div className="relative w-72 h-72 overflow-hidden rounded-full">
                <Image
                  alt="human"
                  src={humanImage}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
            </div>
            {/* コメント表示エリア */}
            <div
              className="flex justify-center items-center"
              style={{
                marginBottom: "calc(100vh - 88vh)",
              }}
            >
              <div
                className="p-2 bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  width: "calc(100vw - 80vw)",
                  height: "calc(100vh - 89vh)",
                }}
              >
                <div className={NunitoFont.className}>{comment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/6 h-full">
        <Sidebar onSelectChange={handleSelectChange} />
      </div>
    </div>
  );
};

export default Intoroduction;
