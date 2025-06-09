import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  const getIcon = (index) => {
    const value = hover || rating;

    if (value >= index + 1) return <FaStar />;
    if (value >= index + 0.5) return <FaStarHalfAlt />;
    return <FaRegStar />;
  };

  const handleClick = (index, isHalf) => {
    const newRating = isHalf ? index + 0.5 : index + 1;
    setRating(newRating);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="relative group"
          onMouseLeave={() => setHover(0)}
        >
          {/* 왼쪽 절반 (0.5점) */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHover(i + 0.5)}
            onClick={() => handleClick(i, true)}
          />
          {/* 오른쪽 절반 (1점) */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHover(i + 1)}
            onClick={() => handleClick(i, false)}
          />
          {/* 아이콘 */}
          <div className="text-yellow-400 text-4xl">{getIcon(i)}</div>
        </div>
      ))}
    </div>
  );
}
