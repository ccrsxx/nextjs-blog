import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { getAnimeGirl } from '@lib/anime';
import { Layout } from './layout';

type AnimeGirlProps = {
  id: string;
  url: string;
  nsfw?: boolean;
};

export function AnimePicture({ id, url, nsfw }: AnimeGirlProps): JSX.Element {
  const [image, setImage] = useState(url);
  const [category, setCategory] = useState(id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = url;
      img.onload = () => setIsLoading(false);
    };
    loadImage();
  }, [image]);

  useEffect(() => {
    setIsLoading(true);
  }, [image, category]);

  const { isFallback } = useRouter();
  const imageStyle = isFallback || isLoading ? 'animate-pulse' : '';

  const changeImage = async (): Promise<void> => {
    if (!url) return;
    const newImage = await getAnimeGirl(nsfw ? 'nsfw' : 'sfw', category);
    setImage(newImage!);
  };

  const changeCategory = async ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    if (value === category) return;
    setCategory(value);
    const newImage = await getAnimeGirl(nsfw ? 'nsfw' : 'sfw', value);
    setImage(newImage!);
  };

  const goToAnotherType = (): void => {
    Router.push(`/anime/${nsfw ? 'sfw' : 'nsfw'}/${id}`);
  };

  return (
    <Layout
      title={`Anime Girl (${category})`}
      description='Get anime girl picture'
      url={url ? `/${nsfw ? 'nfsw' : 'sfw'}/${id}` : undefined}
    >
      <div className='flex flex-col gap-6 items-center'>
        <h1 className='text-2xl text-primary'>
          Anime girl in {isFallback ? '...' : category}{' '}
          <span className={nsfw ? 'text-red-400' : 'text-green-400'}>
            ({nsfw ? 'NSFW' : 'SFW'})
          </span>
        </h1>
        <NextImage
          className={`${imageStyle} rounded bg-white`}
          src={image}
          alt=''
          width={250}
          height={250}
        />
        <div
          className='inner:p-2 inner:rounded inner:transition flex-wrap
                     inner:text-white hover:inner:brightness-125 inner:text-center
                     flex gap-4 inner:max-w-[120px] inner:w-full w-full justify-center'
        >
          <select
            className='bg-gray-700 appearance-none focus-visible:outline-none cursor-pointer'
            name='waifu'
            id='waifu'
            value={category}
            onChange={changeCategory}
          >
            <option value='waifu'>waifu</option>
            <option value='neko'>neko</option>
          </select>
          <button className='bg-blue-400' type='button' onClick={changeImage}>
            Another one
          </button>
          <button
            className={nsfw ? 'bg-green-400' : 'bg-red-400'}
            type='button'
            onClick={goToAnotherType}
          >
            Go to {nsfw ? 'SFW' : 'NSFW'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
