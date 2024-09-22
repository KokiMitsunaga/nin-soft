import React from "react";
import GenreButton from "./GenreButton";
import ListButton from "./ListButton";

interface SidebarProps {
  selectedGenre: "ラインナップ" | "発売中" | "今後発売";
  onSelectChange: (value: "ラインナップ" | "発売中" | "今後発売") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedGenre, onSelectChange }) => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <GenreButton
        label="ラインナップ"
        image="/underground.jpg"
        isSelected={selectedGenre === "ラインナップ"}
        onClick={() => onSelectChange("ラインナップ")}
      />
      <GenreButton
        label="発売中"
        image="/undersea.jpg"
        isSelected={selectedGenre === "発売中"}
        onClick={() => onSelectChange("発売中")}
      />
      <GenreButton
        label="今後発売"
        image="/magma.jpg"
        isSelected={selectedGenre === "今後発売"}
        onClick={() => onSelectChange("今後発売")}
      />
      <ListButton />
    </div>
  );
};

export default Sidebar;
