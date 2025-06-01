export default async function ContentPage(props) {
  const { contentId } = await props.params;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ TMDB fetch error:", res.status, errorText);
      return (
        <div className="text-white p-10">콘텐츠를 불러오지 못했습니다.</div>
      );
    }
  }

  const data = await res.json();

  return (
    <div className="text-white p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p className="text-lg mb-2">방영일: {data.first_air_date}</p>
      <p className="text-gray-300 leading-relaxed">{data.overview}</p>
    </div>
  );
}
