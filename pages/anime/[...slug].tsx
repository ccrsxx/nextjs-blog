import NotFound from '../404';
import { AnimePicture } from '@components/anime-picture';
import { getAnimeGirl } from '@lib/anime';

type AnimeProps = {
  id: string;
  url: string;
  nsfw: boolean;
  notFound: boolean;
};

export default function AnimeGirl({
  id,
  url,
  nsfw,
  notFound
}: AnimeProps): JSX.Element {
  return notFound ? (
    <NotFound message={`${id} not found`} />
  ) : (
    <AnimePicture id={id} url={url} nsfw={nsfw} />
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
    nsfw: boolean;
  };
  revalidate: number;
};

export async function getStaticProps({
  params: { slug: id }
}: StaticProps): Promise<StaticReturn> {
  const [type, category] = id;
  const url = await getAnimeGirl(type, category);

  return {
    props: {
      id: category,
      url,
      notFound: url ? false : true,
      nsfw: type === 'nsfw' ? true : false
    },
    revalidate: 10
  };
}
