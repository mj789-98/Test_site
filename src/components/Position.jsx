import React from "react";

const produceSpans = (text, animation) => {
  return text.split("").map((letter, index) => (
    <span
      key={index}
      className={`inline-block transform-style-3d origin-bottom ${animation}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
};

const Position = () => {
  return (
    <div className="relative cursor-default font-medium text-white text-[16px] xs:text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[66px] leading-[32px] 2xl:leading-[40px] w-full flex justify-center items-center">
      <div className="relative flex justify-center items-center w-full h-[40px]">
        <div
          className="text first absolute flex justify-center items-center w-full whitespace-nowrap"
          aria-label="Software Developer"
        >
          {produceSpans("Software Developer", "animate-textRotate1")}
        </div>
        <div
          className="text second absolute flex justify-center items-center w-full whitespace-nowrap"
          aria-label="Unity Developer"
        >
          {produceSpans("Unity Developer", "animate-textRotate2")}
        </div>
      </div>
    </div>
  );
};

export default Position;
