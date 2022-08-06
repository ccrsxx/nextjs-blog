export async function getAnimeGirl(type: 'sfw' | 'nsfw', category: string) {
  const res = await fetch(`https://api.waifu.pics/${type}/${category}`);
  const { url } = await res.json();

  return url;
}
