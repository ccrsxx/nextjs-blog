import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@components/layout';
import { Date } from '@components/date';
import { siteTitle } from '@components/layout';
import { getSortedPostsData, PostsData } from '@lib/posts';

type HomeProps = {
  allPostsData: PostsData;
};

export default function Home({ allPostsData }: HomeProps): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='text-xl flex flex-col gap-4 text-primary'>
        <h2>
          Hello, I’m <strong>ccrsxx</strong>. I’m a software engineer and an
          anime fans. You can contact me on{' '}
          <a href='https://twitter.com/ccrsxx' target='_blank' rel='noreferrer'>
            Twitter
          </a>
          .
        </h2>
        <p>
          This is a website I made for learning Next.js from the{' '}
          <a href='https://nextjs.org/learn'>Next.js tutorial</a>.
        </p>
      </section>
      <section className='flex flex-col gap-6'>
        <h2 className='font-bold text-2xl'>Blog</h2>
        <ul className='text-xl ml-0 flex flex-col gap-4'>
          {allPostsData.map(({ id, date, title }) => (
            <li className='flex flex-col gap-2' key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

type StaticReturn = {
  props: {
    allPostsData: PostsData;
  };
};

export async function getStaticProps(): Promise<StaticReturn> {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}
