interface GenreSelectBoxProps {
  onSelectChange: (value: "ラインナップ" | "発売中" | "今後発売") => void;
}

const GenreSelectBox = ({ onSelectChange }: GenreSelectBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "ラインナップ" | "発売中" | "今後発売"; // 修正
    onSelectChange(value);
  };

  return (
    <div className="">
      <select onChange={handleChange} className="text-xl font-bold">
        <option value="ラインナップ">ラインナップ</option>
        <option value="発売中">発売中</option>
        <option value="今後発売">今後発売</option>
      </select>
    </div>
  );
};

export default GenreSelectBox;
