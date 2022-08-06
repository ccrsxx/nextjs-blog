import Head from 'next/head';
import { Header } from './header';
import { BackHome } from './back-home';

type LayoutProps = {
  home?: boolean;
  children: React.ReactNode;
};

export const siteTitle = 'Next.js Blog';

export function Layout({ home, children }: LayoutProps) {
  return (
    <div className='max-w-xl px-4 my-12 mx-auto flex flex-col gap-8'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Header home={home} />
      <main className={`${home ? 'gap-8' : 'gap-4'} flex flex-col`}>
        {children}
      </main>
      {!home && <BackHome />}
    </div>
  );
}
