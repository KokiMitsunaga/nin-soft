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

    // 横スクロール位置と背景位置をリセット
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    setBackgroundPosition(0); // 背景位置をリセット

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

          const contentWidth =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const scrollLeft = scrollContainer.scrollLeft;

          // 各コンテンツの幅の割合に基づいてコメント表示を調整
          const segmentWidth = contentWidth / gameInfo.length;
          const visibleIndex = Math.min(
            Math.max(Math.floor(scrollLeft / segmentWidth), 0),
            gameInfo.length - 1
          );

          // コメントの更新
          setComment(commentList[visibleIndex]);

          // 背景画像のスクロール操作
          if (scrollLeft < contentWidth && scrollLeft > 0) {
            const scrollFactor = 1; // 背景が進むスピード
            setBackgroundPosition(-(scrollLeft * scrollFactor));
          }

          // スクロールがコンテンツの終わりに到達した場合
          if (
            scrollLeft >= contentWidth &&
            visibleIndex === gameInfo.length - 1
          ) {
            setScrollCompleted(false);
            event.preventDefault(); // 縦スクロールの禁止
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
        event.preventDefault(); // 縦スクロールを無効化
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

        {/* ジャンル表示 */}
        <div className="absolute top-9 left-4 w-auto h-10 flex items-center justify-start z-40 bg-black bg-opacity-50 text-white text-2xl font-bold px-4 rounded">
          {selectedGenre}
        </div>

        {/* 現在のコンテンツ位置を示す丸点表示 */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-40 flex space-x-10 items-center">
          {gameInfo.map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full ${
                commentList.indexOf(comment) === index
                  ? "bg-white"
                  : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start z-30">
          {/* 横スクロールコンテナ */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden overflow-y-hidden whitespace-nowrap w-full px-8 space-x-96 scroll-container"
            style={{ paddingLeft: "16vw", paddingRight: "16vw" }}
          >
            {gameInfo.map((game) => (
              <Link href={`${game.url}`} key={game.id}>
                <div
                  className="inline-block flex-shrink-0 link-container overflow-hidden relative group bg-white p-4 rounded-3xl"
                  style={{
                    width: "50vw",
                    marginTop: "10vh",
                  }}
                >
                  <Image
                    src={game.image}
                    alt={game.alt}
                    layout="responsive"
                    width={900}
                    height={600}
                    className="rounded-3xl w-full h-full"
                  />
                  {/* タイトルと説明を重ねて表示 */}
                  <div
                    className="link-content absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg"
                    style={{
                      padding: "5vh",
                    }}
                  >
                    <h3 className="font-bold text-xl 2xl:text-2xl">
                      {game.alt}
                    </h3>
                    <p className="text-base 2xl:text-lg mt-2">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="absolute flex items-center justify-center"
            style={{
              marginTop: "72vh",
              marginLeft: "6vw",
            }}
          >
            {/* 人物画像 */}
            <div className="z-30 flex justify-center items-center">
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: "12vh",
                  height: "12vw",
                }}
              >
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
              className="flex justify-center items-center text-xl 2xl:text-2xl"
              style={{
                marginBottom: "12vh",
              }}
            >
              <div
                className="p-2 bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  width: "40vw",
                  height: "11vh",
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
