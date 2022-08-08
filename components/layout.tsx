import Head from 'next/head';
import { Header } from './header';
import { BackHome } from './back-home';

type LayoutProps = {
  title?: string;
  description?: string;
  url?: string;
  home?: boolean;
  children: React.ReactNode;
};

export function Layout({
  title,
  description,
  url,
  home,
  children
}: LayoutProps) {
  const siteTitle = title ?? '**Next**.js Blog';
  const siteDescription =
    description ?? 'Learn how to build a personal website using Next.js';
  const siteUrl = `https://nextjs-blog.vercel.app${url ?? ''}`;

  return (
    <div className='max-w-xl px-4 py-12 mx-auto flex flex-col gap-8 min-h-screen'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='twitter:site' content='@ccrsxx' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='og:title' content={siteTitle} />
        <meta name='og:url' content={siteUrl} />
        <meta name='description' content={siteDescription} />
        <meta name='og:description' content={siteDescription} />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${siteTitle}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg`}
        />
      </Head>
      <Header home={home} />
      <main className={`${home ? 'gap-8' : 'gap-4'} flex flex-col flex-1`}>
        {children}
      </main>
      {!home && <BackHome />}
    </div>
  );
}
