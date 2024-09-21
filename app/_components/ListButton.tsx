import Link from "next/link";
import React from "react";

const ListButton = () => {
  return (
    <div>
      <Link href="/list">
        <button className="text-xl font-bold bg-gray-200 p-2 rounded-md hover:bg-gray-300 w-full mt-10">
          一覧画面へ
        </button>
      </Link>
    </div>
  );
};

export default ListButton;
