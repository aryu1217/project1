import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  // ✅ client-side-encryption 관련 의존성 제거
  autoEncryption: undefined,
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
