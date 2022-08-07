import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

type AnimeGirlProps = {
  id: string;
  url: string;
};

export function AnimePicture({ id, url }: AnimeGirlProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const { isFallback } = useRouter();

  const handleLoad = () => setIsLoading(false);

  const imageStyle = isFallback || isLoading ? 'animate-pulse bg-white' : '';

  return (
    <div className='flex flex-col items-center min-h-screen justify-center gap-8'>
      <h1 className='text-2xl text-primary'>
        Anime girl at {isFallback ? '...' : id}
      </h1>
      <Image
        className={`${imageStyle} rounded`}
        src={url}
        alt=''
        width={250}
        height={250}
        onLoad={handleLoad}
      />
    </div>
  );
}
