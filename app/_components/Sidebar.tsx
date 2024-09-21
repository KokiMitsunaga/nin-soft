import React from "react";
import GenreSelectBox from "./GenreSelectBox";
import ListButton from "./ListButton";

interface SidebarProps {
  onSelectChange: (value: "ラインナップ" | "発売中" | "今後発売") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectChange }) => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Select box */}
      <GenreSelectBox onSelectChange={onSelectChange} />

      {/* List button */}
      <ListButton />
    </div>
  );
};

export default Sidebar;
