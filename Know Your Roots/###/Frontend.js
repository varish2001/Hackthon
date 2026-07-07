async function getMonumentStory(monument, language) {
  const res = await fetch("http://localhost:5000/api/sarvam/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      monument,         // e.g. "Taj Mahal"
      language,         // "English" | "Hindi" | "Tamil" (or en-IN/hi-IN/ta-IN)
    }),
  });

  const data = await res.json();
  return data;
}
