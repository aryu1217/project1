import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  console.log("Home session:", session);

  if (!session.user.nickname) {
    return redirect("/register");
  }

  return (
    <>
      <p className="mt-6 text-white">HOME</p>
    </>
  );
}
