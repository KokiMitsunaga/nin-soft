"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";
import ListButton from "./ListButton";
import GenreSelectBox from "./GenreSelectBox";

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
  const [selectedGenre, setSelectedGenre] = useState("ラインナップ");

  // 動的に変更される状態
  const [bgImage, setBgImage] = useState("/underground.jpg");
  const [gameInfo, setGameInfo] = useState<GameInfo[]>([
    {
      id: 1,
      image: "/game.jpg",
      alt: "ゲーム1",
      description: "ゲーム1の説明",
      url: "/game1",
    },
    {
      id: 2,
      image: "/game.jpg",
      alt: "ゲーム2",
      description: "ゲーム2の説明",
      url: "/game2",
    },
    {
      id: 3,
      image: "/game.jpg",
      alt: "ゲーム3",
      description: "ゲーム3の説明",
      url: "/game3",
    },
    {
      id: 34,
      image: "/game.jpg",
      alt: "ゲーム4",
      description: "ゲーム4の説明",
      url: "/game4",
    },
    {
      id: 5,
      image: "/game.jpg",
      alt: "ゲーム5",
      description: "ゲーム5の説明",
      url: "/game5",
    },
    {
      id: 6,
      image: "/game.jpg",
      alt: "ゲーム6",
      description: "ゲーム6の説明",
      url: "/game6",
    },
  ]); // 型を指定
  const [commentList, setCommentList] = useState<string[]>([
    "ラインナップのコメント1",
    "ラインナップのコメント2",
    "ラインナップのコメント3",
    "ラインナップのコメント4",
    "ラインナップのコメント5",
    "ラインナップのコメント6",
  ]); // 型を指定
  const [humanImage, setHumanImage] = useState("/human.png");

  const handleSelectChange = (value: string) => {
    setSelectedGenre(value);
    console.log("選択されたジャンル:", value);

    // ジャンルに応じて状態を更新
    switch (value) {
      case "ラインナップ":
        setBgImage("/underground.jpg");
        setGameInfo([
          {
            id: 1,
            image: "/game.jpg",
            alt: "ゲーム1",
            description: "ゲーム1の説明",
            url: "/game1",
          },
          {
            id: 2,
            image: "/game.jpg",
            alt: "ゲーム2",
            description: "ゲーム2の説明",
            url: "/game2",
          },
          {
            id: 3,
            image: "/game.jpg",
            alt: "ゲーム3",
            description: "ゲーム3の説明",
            url: "/game3",
          },
          {
            id: 34,
            image: "/game.jpg",
            alt: "ゲーム4",
            description: "ゲーム4の説明",
            url: "/game4",
          },
          {
            id: 5,
            image: "/game.jpg",
            alt: "ゲーム5",
            description: "ゲーム5の説明",
            url: "/game5",
          },
          {
            id: 6,
            image: "/game.jpg",
            alt: "ゲーム6",
            description: "ゲーム6の説明",
            url: "/game6",
          },
        ]);
        setCommentList([
          "ラインナップのコメント1",
          "ラインナップのコメント2",
          "ラインナップのコメント3",
          "ラインナップのコメント4",
          "ラインナップのコメント5",
          "ラインナップのコメント6",
        ]);
        setHumanImage("/human.png");
        break;

      case "発売中":
        setBgImage("/undersea.jpg");
        setGameInfo([
          {
            id: 1,
            image: "/game.jpg",
            alt: "ゲーム1",
            description: "ゲーム1の説明",
            url: "/game1",
          },
          {
            id: 2,
            image: "/game.jpg",
            alt: "ゲーム2",
            description: "ゲーム2の説明",
            url: "/game2",
          },
          {
            id: 3,
            image: "/game.jpg",
            alt: "ゲーム3",
            description: "ゲーム3の説明",
            url: "/game3",
          },
          {
            id: 34,
            image: "/game.jpg",
            alt: "ゲーム4",
            description: "ゲーム4の説明",
            url: "/game4",
          },
          {
            id: 5,
            image: "/game.jpg",
            alt: "ゲーム5",
            description: "ゲーム5の説明",
            url: "/game5",
          },
          {
            id: 6,
            image: "/game.jpg",
            alt: "ゲーム6",
            description: "ゲーム6の説明",
            url: "/game6",
          },
        ]);
        setCommentList([
          "ラインナップのコメント1",
          "ラインナップのコメント2",
          "ラインナップのコメント3",
          "ラインナップのコメント4",
          "ラインナップのコメント5",
          "ラインナップのコメント6",
        ]);
        setHumanImage("/swimHuman.png");
        break;

      case "今後発売":
        setBgImage("/magma.jpg");
        setGameInfo([
          {
            id: 1,
            image: "/game.jpg",
            alt: "ゲーム1",
            description: "ゲーム1の説明",
            url: "/game1",
          },
          {
            id: 2,
            image: "/game.jpg",
            alt: "ゲーム2",
            description: "ゲーム2の説明",
            url: "/game2",
          },
          {
            id: 3,
            image: "/game.jpg",
            alt: "ゲーム3",
            description: "ゲーム3の説明",
            url: "/game3",
          },
          {
            id: 34,
            image: "/game.jpg",
            alt: "ゲーム4",
            description: "ゲーム4の説明",
            url: "/game4",
          },
          {
            id: 5,
            image: "/game.jpg",
            alt: "ゲーム5",
            description: "ゲーム5の説明",
            url: "/game5",
          },
          {
            id: 6,
            image: "/game.jpg",
            alt: "ゲーム6",
            description: "ゲーム6の説明",
            url: "/game6",
          },
        ]);
        setCommentList([
          "ラインナップのコメント1",
          "ラインナップのコメント2",
          "ラインナップのコメント3",
          "ラインナップのコメント4",
          "ラインナップのコメント5",
          "ラインナップのコメント6",
        ]);
        setHumanImage("/flyHuman.png");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollContainer = scrollContainerRef.current;
      const intoroductioin = intoroductionRef.current;

      if (scrollContainer && intoroductioin) {
        const rect = intoroductioin.getBoundingClientRect();
        const isIntoroductionInView =
          rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isIntoroductionInView) {
          // 横スクロール操作
          scrollContainer.scrollLeft += event.deltaY;

          // スクロール方向に応じて背景位置を進める・戻す
          const scrollFactor = 0.2; // 背景が進むスピード
          setBackgroundPosition(
            (prevPosition) => prevPosition - event.deltaY * scrollFactor
          );

          const contentWidth = scrollContainer.clientWidth / 1.3;
          const scrollLeft = scrollContainer.scrollLeft;

          const visibleIndex = Math.min(
            Math.floor(scrollLeft / contentWidth),
            gameInfo.length - 1
          );

          if (scrollLeft % contentWidth > contentWidth * 0.05) {
            setComment(commentList[visibleIndex]);
          }

          // スクロールがコンテンツの終わりに到達した場合
          if (
            scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
          ) {
            setScrollCompleted(true);
          } else if (scrollLeft === 0) {
            setScrollCompleted(false);
          }

          // スクロールがコンテンツの最初または最後で止まる処理
          if (
            (scrollLeft === 0 && event.deltaY < 0 && !scrollCompleted) ||
            (scrollLeft + scrollContainer.clientWidth ===
              scrollContainer.scrollWidth &&
              event.deltaY > 0 &&
              scrollCompleted)
          ) {
            return;
          }

          // コンテンツが最初や最後に達したときに背景の動きを止める
          if (
            scrollLeft === 0 ||
            scrollLeft + scrollContainer.clientWidth ===
              scrollContainer.scrollWidth
          ) {
            return;
          }

          // コンテンツが途中の場合は背景の動きを継続
          if (scrollLeft > 0 && event.deltaY < 0) {
            event.preventDefault();
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
