import Image from "next/image";

interface GenreButtonProps {
  label: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

const GenreButton: React.FC<GenreButtonProps> = ({
  label,
  image,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isSelected} // 選択されている場合はボタンを非活性にする
      className={`text-lg 2xl:text-xl font-bold p-2 rounded-md flex flex-col items-center transition-transform duration-300 transform
                  ${
                    isSelected
                      ? "bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300 hover:scale-105"
                  }`}
      style={{ height: "15vh" }}
    >
      <div className="w-full relative mb-2" style={{ height: "12vh" }}>
        <Image
          src={image}
          alt={`${label} image`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>
      <span>{label}ステージ</span>
    </button>
  );
};

export default GenreButton;
