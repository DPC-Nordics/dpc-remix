import { Link } from "@remix-run/react";

import { type LimitedPost } from "~/service/db.server";

export default function PostList({ posts }: { posts: LimitedPost[] }) {
  if (posts.length === 0)
    return (
      <p>
        No posts yet. <Link to="add">Add new.</Link>
      </p>
    );

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
