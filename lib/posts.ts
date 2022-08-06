import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostData = {
  id: string;
  date: string;
  title: string;
};

export type PostsData = PostData[];

export function getSortedPostsData(): PostsData {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      id,
      ...data
    };
  }) as PostsData;

  return allPostsData.sort().reverse();
}

export type PostPath = {
  params: {
    id: string;
  };
};

export type PostsPath = PostPath[];

export function getAllPostsId(): PostsPath {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') }
  }));
}

export type PostContent = PostData & {
  htmlContent: string;
};

export async function getPostData(id: string): Promise<PostContent> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    id,
    htmlContent,
    ...data
  } as PostContent;
}
