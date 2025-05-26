import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { redirect } from "next/navigation";

export default async function YourView() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">당신의 뷰</h1>
      <p className="text-lg">여기에 사용자 정의 내용을 표시하세요.</p>
    </div>
  );
}
