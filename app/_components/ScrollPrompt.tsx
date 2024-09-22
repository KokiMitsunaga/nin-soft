import { HiChevronDoubleDown } from "react-icons/hi";

const ScrollPrompt = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="animate-bounce text-yellow-400">
        <HiChevronDoubleDown size={150} className="yellow-stroke" />
      </div>
    </div>
  );
};

export default ScrollPrompt;
