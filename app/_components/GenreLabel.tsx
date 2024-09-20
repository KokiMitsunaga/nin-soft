import React from "react";

interface GenreLabelProps {
  label: string;
  textColor: string;
}

const GenreLabel = ({ label, textColor }: GenreLabelProps) => {
  return (
    <div>
      <div
        className={`absolute top-10 left-6 text-${textColor} text-xl font-bold z-40`}
      >
        {label}
      </div>
    </div>
  );
};

export default GenreLabel;
