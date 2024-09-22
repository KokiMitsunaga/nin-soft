import Link from "next/link";
import React from "react";
import Image from "next/image";

const ListButton = () => {
  return (
    <div className="flex justify-center w-full">
      <Link href="/list" className="w-full">
        <button
          className="text-xl font-bold bg-gray-200 p-2 rounded-md hover:bg-gray-300 flex flex-col items-center w-full"
          style={{ height: "15vh" }}
        >
          <div className="w-full h-32 relative mb-2" style={{ height: "12vh" }}>
            <Image
              src="/list.jpg"
              alt="List Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
            />
          </div>

          <span>一覧画面へ</span>
        </button>
      </Link>
    </div>
  );
};

export default ListButton;
