import { Form, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function CommentForm() {
  const actionData = useActionData<{ error: string }>();
  const { state } = useTransition();
  const isLoading = state !== "idle";
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isLoading === false) ref.current?.reset();
  }, [isLoading]);

  return (
    <Form method="post" ref={ref}>
      <fieldset disabled={isLoading}>
        <legend>Add a comment</legend>
        <label>
          Name:
          <br />
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </label>
        <label>
          Comment: <br />
          <input
            type="text"
            id="value"
            name="value"
            required
            placeholder="Your comment here..."
          />
        </label>

        <button type="submit">Add comment</button>
        {actionData?.error && <p className="error">{actionData.error}</p>}
      </fieldset>
    </Form>
  );
}
