"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#141517]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          로그인
        </h2>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
        >
          Google로 로그인
        </button>
      </div>
    </div>
  );
}
