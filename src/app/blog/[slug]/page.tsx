import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/salon-data";
import { getImage } from "@/lib/salon-images";
import { BookButton } from "@/components/site/book-button";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, Clock, User, CalendarHeart, ChevronRight, Sparkles, Tag,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [getImage(post.imageKey, 0)],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const sameCategory = blogPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );
  const related =
    sameCategory.length >= 3
      ? sameCategory.slice(0, 3)
      : [
          ...sameCategory,
          ...blogPosts.filter(
            (p) => p.slug !== post.slug && !sameCategory.includes(p)
          ),
        ].slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ============== BREADCRUMB ============== */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border/60 bg-background"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <li>
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <li aria-hidden className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
          </li>
          <li aria-hidden className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="line-clamp-1 text-foreground">{post.title}</li>
        </ol>
      </nav>

      {/* ============== ARTICLE ============== */}
      <article className="bg-background py-6 md:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Badge className="bg-secondary text-secondary-foreground">{post.category}</Badge>
            <h1 className="mt-4 font-serif font-semibold leading-tight tracking-tight text-foreground text-xl md:text-2xl lg:text-3xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarHeart className="h-4 w-4 text-primary" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> {post.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={getImage(post.imageKey, post.imageIndex)}
                alt={post.title}
                className="h-full w-full object-cover"
                priority
                fetchPriority="high"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </Reveal>

          <Reveal delay={160} className="mt-8">
            <p className="text-lg font-medium text-foreground leading-snug md:leading-relaxed">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-6 space-y-5 text-pretty text-foreground/80 leading-snug md:leading-relaxed">
            {post.content.map((para, i) => (
              <Reveal key={i} delay={200 + i * 60}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-2 border-t border-border/60 pt-6">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Tag className="h-4 w-4 text-primary" /> Tags
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-border/70">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link href="/blog">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to all articles
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* ============== AUTHOR CTA ============== */}
      <section className="bg-background pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="border-border/70 bg-secondary/30 p-4 md:p-5 lg:p-6">
              <CardContent className="flex flex-col items-start gap-4 p-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-background text-primary">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Want personalised advice from {post.author}?
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Book a free 10-minute consultation and we&apos;ll craft a plan just for you.
                    </p>
                  </div>
                </div>
                <BookButton
                  className="rounded-full bg-primary px-6 hover:bg-primary/90"
                >
                  <CalendarHeart className="mr-1.5 h-4 w-4" /> Book now
                </BookButton>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ============== RELATED ============== */}
      <section className="border-t border-border/60 bg-secondary/30 py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif font-semibold text-foreground text-lg md:text-xl lg:text-2xl">
              More to read
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 80}>
                <Link href={`/blog/${rel.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={getImage(rel.imageKey, rel.imageIndex)}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <Badge className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
                        {rel.category}
                      </Badge>
                    </div>
                    <CardContent className="flex flex-col gap-2 pt-4">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                        {rel.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground leading-snug md:leading-relaxed">
                        {rel.excerpt}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
