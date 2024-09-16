import Image from "next/image";
import ScrollPrompt from "./ScrollPrompt";
import { Nunito_Sans } from "next/font/google";

const NunitoFont = Nunito_Sans({
  weight: "600",
  subsets: ["latin"],
});

const Top = () => {
  return (
    <main>
      <div className="fixed h-screen w-screen -z-50">
        <Image
          src="/bg.svg"
          alt="background"
          className="object-cover"
          quality={100}
          sizes="100vw"
          fill
        />
      </div>

      <div className="px-2 pt-24 flex justify-center">
        <div className="h-28 p-2 w-4/5 bg-white bg-opacity-85 rounded-3xl flex items-center justify-center tracking-wider">
          <div className={NunitoFont.className}>ゲームの世界を見てみよう！</div>
        </div>
      </div>
      <div className="fixed bottom-10 w-full flex justify-center">
        <ScrollPrompt />
      </div>
    </main>
  );
};

export default Top;
