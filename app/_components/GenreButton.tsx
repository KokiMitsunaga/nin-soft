import React from "react";
import Image from "next/image";

interface GenreButtonProps {
  label: string;
  image: string; // 画像のURLをプロパティとして追加
  onClick: () => void;
}

const GenreButton: React.FC<GenreButtonProps> = ({ label, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xl font-bold bg-gray-200 p-2 rounded-md hover:bg-gray-300 flex flex-col items-center"
    >
      {/* 画像の追加 */}
      <div className="w-full h-32 relative mb-2">
        <Image
          src={image}
          alt={`${label} image`}
          layout="fill"
          objectFit="cover" // 画像をボタン内にフィットさせる
          className="rounded-t-md"
        />
      </div>

      {/* ラベル表示 */}
      <span>{label}ステージ</span>
    </button>
  );
};

export default GenreButton;
