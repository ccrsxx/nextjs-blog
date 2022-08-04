import Head from 'next/head';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='text-primary text-xl'>
          Read{' '}
          <Link href='/posts/first-post'>
            <a>this page</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}
