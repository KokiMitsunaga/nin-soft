"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";
import ListButton from "./ListButton";
import GenreSelectBox from "./GenreSelectBox";
import gamesData from "../data/gamesData.json";

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

  const [isInView, setIsInView] = useState(false); // ビューポートに入ったかどうかを追跡

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

        // Intoroductionがビューポートに入ったかを更新
        setIsInView(isIntoroductionInView);

        if (isIntoroductionInView) {
          // 横スクロール操作
          scrollContainer.scrollLeft += event.deltaY;

          // 背景位置の更新
          const scrollFactor = 0.2;
          setBackgroundPosition(
            (prevPosition) => prevPosition - event.deltaY * scrollFactor
          );

          const contentWidth = scrollContainer.clientWidth / 1.3;
          const scrollLeft = scrollContainer.scrollLeft;

          // コメントの更新
          const visibleIndex = Math.min(
            Math.round(scrollLeft / contentWidth),
            gameInfo.length - 1
          );
          setComment(commentList[visibleIndex]);

          // スクロールがコンテンツの終わりに達した場合の処理
          if (
            scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
          ) {
            setScrollCompleted(true);
          } else if (scrollLeft === 0) {
            setScrollCompleted(false);
          }

          // 横スクロールの制御
          if (
            (scrollLeft === 0 && event.deltaY < 0 && !scrollCompleted) ||
            (scrollLeft + scrollContainer.clientWidth ===
              scrollContainer.scrollWidth &&
              event.deltaY > 0 &&
              scrollCompleted)
          ) {
            return;
          }

          // スクロールを途中で止める処理
          if (scrollLeft > 0 && event.deltaY < 0) {
            event.preventDefault();
          }
        }
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const deltaY = event.touches[0].clientY - event.touches[0].screenY;

        // 横スクロール操作
        scrollContainer.scrollLeft += deltaY;

        event.preventDefault(); // 縦スクロールを防止
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrollCompleted, gameInfo, commentList]);

  useEffect(() => {
    // Intoroductionがビューポートに入った時、縦スクロールを無効化
    if (isInView) {
      document.body.style.overflowY = "hidden"; // 縦スクロールを無効化
    } else {
      document.body.style.overflowY = "auto"; // 縦スクロールを有効化
    }
  }, [isInView]);

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

      {/* セレクトボックス */}
      <GenreSelectBox onSelectChange={handleSelectChange} />

      {/* ボタン */}
      <ListButton />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
        {/* 横スクロールコンテナ */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto whitespace-nowrap w-full px-8 space-x-4 scroll-container"
        >
          {gameInfo.map((game) => (
            <Link href={`${game.url}`} key={game.id}>
              <div
                className="inline-block bg-white p-4 rounded-lg flex-shrink-0 link-container"
                style={{
                  width: "calc(100vw / 1.3)",
                  height: "calc(100vh - 70vh)",
                }}
              >
                <div className="w-full h-auto mb-4">
                  <Image
                    src={game.image}
                    alt={game.alt}
                    layout="responsive"
                    width={900}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="text-center link-content">
                  <h3 className="font-bold text-lg">{game.alt}</h3>
                  <p className="text-sm mt-2">{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* コメント表示エリア */}
        <div className="absolute pt-20 px-8 flex justify-center items-center w-full">
          <div className="h-28 p-2 w-full bg-white bg-opacity-85 rounded-3xl flex items-center justify-center overflow-hidden">
            <div className={NunitoFont.className}>{comment}</div>
          </div>
        </div>

        {/* 人物画像 */}
        <div
          className="z-30 flex justify-center items-center"
          style={{
            marginTop: "calc(100vh - 73vh)",
            marginRight: "calc(100vw - 30vw)",
          }}
        >
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <Image
              alt="human"
              src={humanImage}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intoroduction;
