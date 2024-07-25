import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css"

async function getPosts(page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`);

  if (!response.ok) {
    logger.error('Woops, something went wrong! page.js@getPosts');

    return [];
  }

  logger.info('Posts request was successful!');

  return response.json();
};

export default async function Home() {
  const { data: posts } = await getPosts(1);

  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost key={post.id} post={post} />)}
    </main>
  );
}
