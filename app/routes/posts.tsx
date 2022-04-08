import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";

import PostList from "~/components/PostList";
import { getPosts, type LimitedPost } from "~/service/db.server";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  const data: LimitedPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
  }));

  return json(data);
};

export default function Posts() {
  const posts = useLoaderData<LimitedPost[]>();

  return (
    <section className="page">
      <header>
        <h2>Posts</h2>
        <Link to="add">+ Add new</Link>
      </header>

      <section className="column-2">
        <aside>
          <h3>List of all posts</h3>
          <PostList posts={posts} />
        </aside>

        <Outlet />
      </section>
    </section>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <p>Error: {error.message}</p>;
}
