import Head from 'next/head';
import { Layout } from '../components';
import { getSortedPostsData, PostsData } from '../lib';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}

type HomeProps = {
  allPostsData: PostsData;
};

export default function Home({ allPostsData }: HomeProps): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>Next.js Blog | Home</title>
      </Head>
      <section className='text-2xl flex flex-col gap-4 text-center text-primary'>
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
      <section>
        <h2 className='font-bold text-2xl'>Blog</h2>
        <ul className='text-xl'>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
