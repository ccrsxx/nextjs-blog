export async function getAnimeGirl(type: 'sfw' | 'nsfw', category: string) {
  const res = await fetch(`https://api.waifu.pics/${type}/${category}`);
  const data = await res.json();

  return data;
}
