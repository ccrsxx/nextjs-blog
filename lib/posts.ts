import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
