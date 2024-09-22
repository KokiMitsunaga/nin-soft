import React from "react";
import gamesData from "../data/gamesData.json";
import GameListSection from "./_components/GameListSection";
import Header from "./_components/Header";

const Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <GameListSection
        title="ラインナップ"
        gameData={gamesData.ラインナップ.gameInfo}
      />
      <GameListSection title="発売中" gameData={gamesData.発売中.gameInfo} />
      <GameListSection
        title="今後発売"
        gameData={gamesData.今後発売.gameInfo}
      />
    </div>
  );
};

export default Page;
