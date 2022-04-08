export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  comments?: Comment[];
}

export interface Comment {
  postId: string;
  id: string;
  name: string;
  value: string;
  timestamp: number;
}

export type LimitedPost = Pick<Post, "id" | "title">;

const dbUrl = "http://localhost:4000/";

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = await (await fetch(dbUrl + "posts")).json();

  if (Array.isArray(posts)) return posts;
  return [];
}

export async function getPost(id: string): Promise<Post | undefined> {
  const post: Post = await (await fetch(dbUrl + "posts/" + id)).json();

  return post;
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  const comments: Comment[] = await (
    await fetch(dbUrl + "comments?postId=" + postId)
  ).json();

  if (Array.isArray(comments)) return comments;
  return [];
}

export async function addPost(
  post: Omit<Post, "id" | "timestamp">
): Promise<Post> {
  return addRequest("posts", post);
}

export async function addComment(
  comment: Omit<Comment, "id" | "timestamp">
): Promise<Comment> {
  return addRequest("comments", comment);
}

async function addRequest(url: string, body: any) {
  return fetch(dbUrl + url, {
    method: "post",
    body: JSON.stringify({ ...body, timestamp: Date.now().valueOf() }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
