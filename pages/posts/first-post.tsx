import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';

export default function FirstPost(): JSX.Element {
  return (
    <>
      <Head>
        <title>Next.js Blog | Post</title>
      </Head>
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() =>
          console.log('script loaded correctly, window.FB has been populated')
        }
      />
      <h1>First Post</h1>;
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
