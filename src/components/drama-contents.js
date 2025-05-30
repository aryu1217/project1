import ContentsList from "./contents-list";

export default async function DramaContents({ selected }) {
  const res = await fetch(
    selected === "kor"
      ? "http://localhost:3000/api/dramas/korean"
      : "http://localhost:3000/api/dramas/global",
    { cache: "no-store" }
  );

  const data = await res.json();

  return <ContentsList contents={data.results} />;
}
