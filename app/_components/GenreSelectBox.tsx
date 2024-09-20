import React, { useState } from "react";

interface GenreSelectBoxProps {
  onSelectChange: (value: string) => void;
}

const GenreSelectBox = ({ onSelectChange }: GenreSelectBoxProps) => {
  const [selectedOption, setSelectedOption] = useState("ラインナップ");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSelectChange(value);
  };

  return (
    <div className="absolute top-10 left-6 z-40">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="text-xl font-bold"
      >
        <option value="ラインナップ">ラインナップ</option>
        <option value="発売中">発売中</option>
        <option value="今後発売">今後発売</option>
      </select>
    </div>
  );
};

export default GenreSelectBox;
