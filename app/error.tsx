"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="w-dvw h-dvh maxContainer pSm flexCenter gap-y-8 bg-slate-900">
        <h2 className="font-bold text-2xl md:text-6xl text-white shadow-md shadow-slate-100">
          404!
        </h2>
        <p className="font-light">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="bg-slate-200 text-black hover:underline block rounded px-6 py-2 font-semibold"
        >
          Back to safety
        </Link>
      </body>
    </html>
  );
}
