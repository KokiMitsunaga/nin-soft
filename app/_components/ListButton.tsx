import Link from "next/link";
import React from "react";

const ListButton = () => {
  return (
    <div>
      <Link href="/list" className="absolute bottom-4 right-4 z-40">
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          一覧画面へ
        </button>
      </Link>
    </div>
  );
};

export default ListButton;
