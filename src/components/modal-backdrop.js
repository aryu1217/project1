// components/modal-backdrop.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ModalBackdrop() {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 bg-black/60 z-40"
    />
  );
}
