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
    <AnimePicture id={id} url={url} nsfw={nsfw} key={url} />
  );
}

type ServerSideProps = {
  params: {
    slug: ['sfw' | 'nsfw', string];
  };
};

type ServerSideReturn = {
  props: {
    id: string;
    url: string | null;
    notFound: boolean;
    nsfw: boolean;
  };
};

export async function getServerSideProps({
  params: { slug }
}: ServerSideProps): Promise<ServerSideReturn> {
  const [type, category] = slug;
  const url = await getAnimeGirl(type, category);

  return {
    props: {
      id: category,
      url,
      notFound: url ? false : true,
      nsfw: type === 'nsfw' ? true : false
    }
  };
}
