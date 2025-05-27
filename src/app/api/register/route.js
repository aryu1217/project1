import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { nickname } = await req.json();
  if (!nickname) {
    return new Response(JSON.stringify({ message: "닉네임이 필요합니다" }), {
      status: 400,
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existing = await users.findOne({ nickname });
    if (existing) {
      return new Response(
        JSON.stringify({ message: "이미 존재하는 닉네임입니다" }),
        {
          status: 409,
        }
      );
    }

    await users.insertOne({
      email: session.user.email,
      nickname,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "등록 완료" }), {
      status: 200,
    });
  } catch (err) {
    console.error("DB Error:", err);
    return new Response(JSON.stringify({ message: "서버 에러" }), {
      status: 500,
    });
  }
}
