import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArticleCard, ArticleMeta } from "@/components/sections/ArticleCard";
import { SourceList } from "@/components/sections/SourceList";
import { TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { ArticleBlock } from "@/content/articles";
import { articles, getArticle, getRelatedArticles } from "@/content/articles";
import { images } from "@/content/images";
import { company } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Article pages are fully static. For a slug that was not prerendered, this makes the server
 * wait for the complete render before responding, so notFound() returns a real 404 status
 * instead of streaming a 200 fallback shell.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const image = images[article.image];
  return pageMetadata({
    title: article.title,
    description: article.dek,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    image: { url: image.src, width: image.width, height: image.height, alt: image.alt },
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
}

function ShareLinks({ title, url }: { title: string; url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];
  return (
    <div>
      <p className="text-eyebrow font-semibold uppercase text-gold-ink">Share</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-sm border border-line px-4 text-[0.9rem] font-medium text-forest hover:border-forest"
            >
              {link.label}
              <span className="sr-only"> (share this article)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const image = images[article.image];
  const related = getRelatedArticles(article.slug);
  const url = absoluteUrl(`/insights/${article.slug}`);

  return (
    <article>
      <header className="border-b border-line bg-ivory">
        <Container className="pb-12 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs
            items={[
              { label: "Insights", href: "/insights" },
              { label: article.title, href: `/insights/${article.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <ArticleMeta article={article} />
            <h1 className="mt-5 text-h1 text-forest">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-lead text-muted">{article.dek}</p>
          </div>
        </Container>
        <Container className="pb-12">
          <figure>
            <div className="relative aspect-[21/9] overflow-hidden rounded-md bg-parchment">
              <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[0.8rem] text-muted">
              {image.subject}. Photo: {image.credit.author}, {image.credit.license}.
            </figcaption>
          </figure>
        </Container>
      </header>

      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <aside className="order-2 space-y-8 lg:order-1 lg:col-span-3">
          <div className="space-y-2 text-[0.9rem] text-muted lg:sticky lg:top-28">
            <p>
              <span className="font-semibold text-ink">Published</span>
              <br />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </p>
            <p>
              <span className="font-semibold text-ink">Last reviewed</span>
              <br />
              <time dateTime={article.reviewedAt}>{formatDate(article.reviewedAt)}</time>
            </p>
            <p>
              <span className="font-semibold text-ink">Published by</span>
              <br />
              {company.name}
            </p>
            <div className="pt-6">
              <ShareLinks title={article.title} url={url} />
            </div>
          </div>
        </aside>
        <div className="order-1 lg:order-2 lg:col-span-8 lg:col-start-5">
          <div className="prose-hw text-[1.075rem]">
            {article.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
          <div className="mt-14 max-w-prose">
            <SourceList sources={article.sources} id="article-sources" />
            <p className="mt-8 text-[0.85rem] text-muted">
              This article is general information. It is not legal, investment or medical advice.
            </p>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-white py-16 lg:py-20">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-title" className="text-h2 text-forest">
                Related insights
              </h2>
              <TextLink href="/insights">All insights</TextLink>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.dek,
          datePublished: article.publishedAt,
          dateModified: article.reviewedAt,
          image: absoluteUrl(image.src),
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: company.name, url: absoluteUrl("/") },
          publisher: { "@type": "Organization", name: company.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
          citation: article.sources.map((source) => source.url),
        }}
      />
    </article>
  );
}
