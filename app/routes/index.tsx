import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <section className="page">
      <header>
        <h2>Home</h2>
      </header>

      <p className="p-20">
        This is the home page. You can find the posts in the{" "}
        <Link to="posts">Posts</Link> page.
      </p>
    </section>
  );
}
