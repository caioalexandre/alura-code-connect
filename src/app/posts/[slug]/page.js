import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";

async function getPostBySlug (slug) {
  const url = `http://localhost:3042/posts?slug=${slug}`;

  const response = await fetch(url);

  if (!response.ok) {
    logger.error('Woops, something went wrong! slug/page.js@getPostBySlug');
  }

  logger.info('Post request was successful!');

  const data = await response.json();

  if (data.length === 0) {
    return {};
  }

  let post = data[0];

  const processedContent = await remark()
    .use(html)
    .process(post.markdown);

  const contentHtml = processedContent.toString();

  post.markdown = contentHtml;

  return post;
};

const PagePost = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return (
    <>
      <h1 style={{ color: 'white' }}>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.markdown }} style={{ padding: '16px', background: 'white' }} />
    </>
  );
};

export default PagePost;
