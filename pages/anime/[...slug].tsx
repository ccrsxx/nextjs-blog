import NotFound from '../404';
import { AnimePicture } from '@components/anime-picture';
import { getAnimeGirl } from '@lib/anime';

type AnimeProps = {
  id: string;
  url: string;
  notFound: boolean;
};

export default function AnimeGirl({
  id,
  url,
  notFound
}: AnimeProps): JSX.Element {
  return notFound ? (
    <NotFound message={`${id} not found`} />
  ) : (
    <AnimePicture id={id} url={url} />
  );
}

type StaticPaths = {
  paths: { params: { slug: string[] } }[];
  fallback: boolean;
};

export async function getStaticPaths(): Promise<StaticPaths> {
  const paths = ['sfw', 'nsfw'].map((type) => ({
    params: { slug: [type, 'waifu'] }
  }));

  return {
    paths,
    fallback: true
  };
}

type StaticProps = {
  params: {
    slug: ['sfw' | 'nsfw', string];
  };
};

type StaticReturn = {
  props: {
    id: string;
    url: string | null;
    notFound: boolean;
  };
  revalidate: number;
};

export async function getStaticProps({
  params: {
    slug: [type, category]
  }
}: StaticProps): Promise<StaticReturn> {
  const id = `/${type}/${category}`;

  const url = await getAnimeGirl(type, category);

  return { props: { id, url, notFound: url ? false : true }, revalidate: 10 };
}
