import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { redirect } from "next/navigation";

export default async function MyView() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  } else {
    console.log("my-view Page Session found:");
  }

  return (
    <>
      <p className="mt-6 text-white">내 감상 기록</p>
    </>
  );
}
