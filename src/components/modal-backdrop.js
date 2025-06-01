// modal-backdrop.js
"use client";

import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 bg-black/70 z-40"
    />
  );
}
