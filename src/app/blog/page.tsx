import type { Metadata } from "next";
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Hair, skin and beauty advice from the stylists at Lumière Beauty Lounge, San Francisco.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
