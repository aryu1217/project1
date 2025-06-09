"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MyDatePicker() {
  const [selected, setSelected] = useState();

  return (
    <div className="bg-[#1F1F1F] text-white p-4 rounded-lg w-[340px]">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        classNames={{
          nav_button: "text-yellow-400 hover:text-yellow-300",
          day_selected:
            "bg-yellow-400 text-black font-bold hover:bg-yellow-300",
        }}
      />

      <p className="mt-2 text-sm text-gray-300">
        {selected
          ? `선택한 날짜: ${selected.toLocaleDateString()}`
          : "날짜를 선택하세요."}
      </p>
    </div>
  );
}
