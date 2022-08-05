import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
  home?: boolean;
};

const name = 'Emilia-tan';

export function Header({ home }: HeaderProps) {
  return (
    <header className='flex flex-col gap-4 items-center'>
      {home ? (
        <>
          <Image
            priority
            src='/images/profile.jpg'
            className='rounded-full'
            height={144}
            width={144}
            alt={name}
          />
          <h1 className='font-bold text-4xl'>{name}</h1>
        </>
      ) : (
        <>
          <Link href='/'>
            <a>
              <Image
                priority
                src='/images/profile.jpg'
                className='rounded-full'
                height={108}
                width={108}
                alt={name}
              />
            </a>
          </Link>
          <h2 className='font-bold text-2xl'>
            <Link href='/'>
              <a>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
