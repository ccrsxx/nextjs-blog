import { Layout } from '@components/layout';
import { Date } from '@components/date';
import { getAllPostsId, getPostData } from '@lib/posts';
import type { PostContent, PostsPath, PostPath } from '@lib/posts';

type PostProps = {
  postData: PostContent;
};

export default function Post({
  postData: { date, title, htmlContent }
}: PostProps): JSX.Element {
  const path = `/posts/${title}`;

  return (
    <Layout title={title} description={title} url={path}>
      <article className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <Date dateString={date} />
        <div
          className='flex flex-col gap-4 text-lg'
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </Layout>
  );
}

type PathPropsReturn = {
  paths: PostsPath;
  fallback: boolean;
};

export async function getStaticPaths(): Promise<PathPropsReturn> {
  const paths = getAllPostsId();

  return {
    paths,
    fallback: false
  };
}

type StaticPropsReturn = {
  props: {
    postData: PostContent;
  };
};

export async function getStaticProps({
  params: { id }
}: PostPath): Promise<StaticPropsReturn> {
  const postData = await getPostData(id);

  return {
    props: {
      postData
    }
  };
}
