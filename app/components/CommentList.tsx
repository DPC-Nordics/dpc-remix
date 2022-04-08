import { useTransition } from "@remix-run/react";

import { formatDateTime } from "~/helpers";
import { type Comment } from "~/service/db.server";

export default function CommentList({ comments }: { comments: Comment[] }) {
  const { submission } = useTransition();
  const submitData = submission
    ? (Object.fromEntries(submission.formData) as unknown as Comment)
    : undefined;

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
      {submitData ? <CommentItem disabled {...submitData} id={""} /> : null}
    </ul>
  );
}

function CommentItem({
  value,
  name,
  disabled,
  timestamp,
}: Comment & { disabled?: boolean }) {
  return (
    <li>
      <blockquote style={{ color: disabled ? "grey" : "inherit" }}>
        {value}
        <small>
          <address>
            - {name} <time>{formatDateTime(timestamp, "@ ")}</time>
          </address>
        </small>
      </blockquote>
    </li>
  );
}
