import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css"
import Link from "next/link";

async function getPosts(page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=4`);

  if (!response.ok) {
    logger.error('Woops, something went wrong! page.js@getPosts');

    return [];
  }

  logger.info('Posts request was successful!');

  return response.json();
};

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  
  const { data: posts, prev, next } = await getPosts(currentPage);

  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost key={post.id} post={post} />)}

      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>{'<'} Previous Page</Link>}
        {next && <Link href={`/?page=${next}`}>Next Page {'>'}</Link>}
      </div>
    </main>
  );
}
