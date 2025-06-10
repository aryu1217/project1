"use client";

import { useEffect, useState } from "react";

export default function WatchDateSelector({ date, setDate }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // ✅ 모든 선택 항목이 있을 때만 날짜 조합
  useEffect(() => {
    if (year && month && day) {
      const formatted = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      setDate(formatted);
    }
  }, [year, month, day, setDate]);

  return (
    <div className="flex items-center gap-2 text-white text-sm">
      <label>시청일자:</label>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="bg-[#2a2a2a] border border-gray-600 p-1 rounded"
      >
        <option value="">년</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="bg-[#2a2a2a] border border-gray-600 p-1 rounded"
      >
        <option value="">월</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="bg-[#2a2a2a] border border-gray-600 p-1 rounded"
      >
        <option value="">일</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
