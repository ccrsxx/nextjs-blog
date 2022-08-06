import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getAnimeGirl } from '../../lib';

type AnimeProps = {
  id: string;
  url: string;
};

function Loading() {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <i className='text-4xl animate-spin'>🔃</i>
    </div>
  );
}

export default function AnimeGirl({ id, url }: AnimeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { isFallback } = useRouter();

  if (isFallback) return <Loading />;

  const handleLoad = () => setIsLoading(false);

  const imageStyle = isLoading ? 'animate-pulse bg-white' : '';

  return (
    <div className='flex flex-col items-center min-h-screen justify-center gap-8'>
      <h1 className='text-2xl text-primary'>Anime girl at /{id}</h1>
      <Image
        className={`${imageStyle} rounded`}
        src={url}
        alt='Random anime girl'
        width={250}
        height={250}
        onLoad={handleLoad}
      />
    </div>
  );
}

type StaticProps = {
  params: {
    id: string;
  };
};

export async function getStaticPaths() {
  const categories = ['waifu', 'neko', 'megumin'];
  const paths = categories.map((category) => ({ params: { id: category } }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const url = await getAnimeGirl('sfw', id);

  return {
    props: {
      id,
      url
    }
  };
}
