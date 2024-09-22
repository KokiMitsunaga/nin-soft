import React from "react";
import GameItem from "./GameItem";

// ゲームデータの型定義
interface GameInfo {
  id: number;
  image: string;
  alt: string;
  description: string;
  url: string;
}

interface GameListSectionProps {
  title: string;
  gameData: GameInfo[];
}

const GameListSection: React.FC<GameListSectionProps> = ({
  title,
  gameData,
}) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold mb-6 flex items-center">
      <span className="w-1 h-8 bg-red-500 mr-2"></span>
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {gameData.map((game) => (
        <GameItem
          key={game.id}
          image={game.image}
          alt={game.alt}
          description={game.description}
          url={game.url}
        />
      ))}
    </div>
  </div>
);

export default GameListSection;
