import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("Session not found, redirecting to login...");
  } else {
    console.log("Session found:", session);
  }

  return (
    <>
      <p className="mt-6 text-white">HOME</p>
    </>
  );
}
