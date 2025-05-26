"use client";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#141517]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white">로그인</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // 이메일 로그인 로직은 나중에 추가할 예정
            console.log("이메일 로그인 시도");
          }}
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm text-gray-400 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          >
            로그인
          </button>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          >
            회원가입
          </button>
        </form>

        <div className="my-6 border-t border-gray-600" />

        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
        >
          Google로 로그인
        </button>
      </div>
    </div>
  );
}
