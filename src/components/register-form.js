"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { status } = useSession();
  const [errorMsg, setErrorMsg] = useState("");

  const session = useSession();

  useEffect(() => {
    console.log("세션 상태:", status);
    console.log("세션 내용:", session);
  }, [session, status]);

  if (status === "loading") return null;

  return (
    <div className="flex items-center justify-center h-screen bg-[#141517]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          닉네임 설정
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const checkNickname = e.target.nickname.value.trim();

            if (checkNickname.length < 2 || checkNickname.length > 12) {
              setErrorMsg("닉네임은 2자 이상 12자 이하로 입력해주세요.");
              return;
            }

            if (/\s/.test(checkNickname)) {
              setErrorMsg("닉네임에 공백을 포함할 수 없습니다.");
              return;
            }

            if (!/^[가-힣a-zA-Z1-9]+$/.test(checkNickname)) {
              setErrorMsg("닉네임은 한글, 영어, 숫자만 사용할 수 있습니다.");
              return;
            }

            const res = await fetch("/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nickname: checkNickname,
              }),
            });

            const data = await res.json();

            if (res.ok) {
              setTimeout(() => {
                window.location.href = "/home";
              }, 500); // 0.5초 정도 기다렸다가 이동
            }
            {
              setErrorMsg(data.message || data.error || "등록 실패");
            }
          }}
        >
          <div className="mb-6">
            <label
              className="block text-sm text-gray-400 mb-2"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname" // ← 중요! e.target.nickname.value 위해 필요
              placeholder="닉네임을 입력하세요"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {errorMsg && (
            <div className="mb-4 text-red-500 text-sm">{errorMsg}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
