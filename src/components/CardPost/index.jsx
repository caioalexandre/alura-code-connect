import Image from "next/image";
import { Avatar } from "../Avatar";

export const CardPost = ({ post }) => {
  return (
    <article>
      <header>
        <figure>
          <Image
            src={post.cover}
            width={438}
            height={133}
            alt="Card Post Cover"
          />
        </figure>
      </header>

      <section>
        <h3>{post.title}</h3>

        <p>{post.body}</p>
      </section>

      <footer>
        <Avatar
          name={post.author.username}
          imageSrc={post.author.avatar}
        />
      </footer>
    </article>
  );
};
