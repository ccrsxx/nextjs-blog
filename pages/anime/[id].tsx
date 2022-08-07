import NotFound from '../404';
import { AnimePicture } from '../../components/anime-picture';
import { getAnimeGirl } from '../../lib';

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

type StaticProps = {
  params: {
    id: string;
  };
};

type StaticPaths = {
  paths: { params: { id: string } }[];
  fallback: boolean;
};

export async function getStaticPaths(): Promise<StaticPaths> {
  const paths = [{ params: { id: 'waifu' } }];

  return {
    paths,
    fallback: true
  };
}

type StaticReturn = {
  props: {
    id: string;
    url: string | null;
    notFound: boolean;
  };
  revalidate: number;
};

export async function getStaticProps({
  params: { id }
}: StaticProps): Promise<StaticReturn> {
  const url = await getAnimeGirl('sfw', id);
  return { props: { id, url, notFound: url ? false : true }, revalidate: 10 };
}
