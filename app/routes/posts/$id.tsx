import {
  type LoaderFunction,
  json,
  redirect,
  ActionFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import CommentForm from "~/components/CommentForm";
import CommentList from "~/components/CommentList";
import { formatDateTime } from "~/helpers";
import {
  type Post,
  getPost,
  getPostComments,
  addComment,
} from "~/service/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (!id) return redirect("..");

  const post = await getPost(id);
  const comments = await getPostComments(id);

  if (!post || !post.id) throw new Error("Post not found");

  return json({ ...post, comments });
};

export const action: ActionFunction = async ({ params, request }) => {
  const data = await request.formData();

  const postId = params.id || "";
  const name = data.get("name")?.toString().trim();
  const value = data.get("value")?.toString().trim();

  if (!postId || !name || !value)
    return json<{ error: string }>({ error: "Missing data" });

  await addComment({
    postId,
    name,
    value,
  });

  return redirect("/posts/" + params.id);
};

export default function PostPage() {
  const post = useLoaderData<Post>();
  const { title, author, content, timestamp, comments = [] } = post;

  return (
    <main>
      <h3>{title}</h3>
      <address>
        - <strong>{author}</strong>{" "}
        <time>{formatDateTime(timestamp, "@ ")}</time>
      </address>
      <p>{content}</p>
      <hr />
      <section>
        <h4>Comments</h4>
        <div className="column-2">
          <CommentForm />
          <CommentList comments={comments} />
        </div>
      </section>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h3>Error: {error.message}</h3>
      <p>An error occurred while loading the post.</p>
    </div>
  );
}
