// src/app/api/test-db/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();

    return new Response(
      JSON.stringify({
        success: true,
        collections: collections.map((col) => col.name),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DB 연결 실패:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
      }
    );
  }
}
