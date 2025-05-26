import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://ryu200112:ryu_145189@cluster0.cui6j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}
