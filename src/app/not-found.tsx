import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        404
      </p>
      <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
        The link may be out of date. Browse our services or head back to the
        homepage.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="rounded-full bg-primary px-6">
          <Link href="/services">Browse services</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
