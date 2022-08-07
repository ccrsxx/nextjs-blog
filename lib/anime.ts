export async function getAnimeGirl(
  type: 'sfw' | 'nsfw',
  category: string
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.waifu.pics/${type}/${category}`);
    const { url } = await res.json();
    return url ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
