import React from "react";
import Link from "next/link";
import Image from "next/image"; // 追加

// ゲームアイテムの型定義
interface GameItemProps {
  image: string;
  alt: string;
  description: string;
  url: string;
}

const GameItem: React.FC<GameItemProps> = ({
  image,
  alt,
  description,
  url,
}) => (
  <Link
    href={url}
    className="block bg-white p-4 rounded shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105 hover:opacity-85 hover:text-red-500"
  >
    <Image
      src={image}
      alt={alt}
      width={400}
      height={192}
      className="w-full h-48 object-cover rounded"
    />{" "}
    {/* 修正済み */}
    <h3 className="text-xl font-semibold mt-4">{alt}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </Link>
);

export default GameItem;
