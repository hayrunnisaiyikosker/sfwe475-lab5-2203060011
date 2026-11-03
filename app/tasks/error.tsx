"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>We could not load your tasks.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}