import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">ゲーム一覧</h1>
      <Link
        href="/"
        className="bg-red-500 text-white px-6 py-3 text-lg rounded hover:bg-red-600 transition-colors"
      >
        ゲーム紹介ステージへ
      </Link>
    </div>
  );
};

export default Header;
