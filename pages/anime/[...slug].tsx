import Image from 'next/image';
import { useState } from 'react';
import { getAnimeGirl } from '../../lib';

type AnimeGirlProps = {
  id: string;
  url: string;
};

export default function AnimeGirl({ id, url }: AnimeGirlProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => isLoading && setIsLoading(false);

  const imageStyle = isLoading ? 'animate-pulse bg-white' : '';

  return (
    <div className='flex flex-col items-center min-h-screen justify-center gap-8'>
      <h1 className='text-2xl text-primary'>Anime girl at {id}</h1>
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

export async function getStaticPaths() {
  const paths = ['sfw', 'nsfw'].map((type) => ({
    params: { slug: [type, 'waifu'] }
  }));

  return {
    paths,
    fallback: false
  };
}

type StaticProps = {
  params: {
    slug: ['sfw' | 'nsfw', string];
  };
};

export async function getStaticProps({
  params: {
    slug: [type, category]
  }
}: StaticProps) {
  const id = `/${type}/${category}`;
  const url = await getAnimeGirl(type, category);

  return {
    props: {
      id,
      url
    }
  };
}
