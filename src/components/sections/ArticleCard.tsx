import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/content/articles";
import { readingMinutes } from "@/content/articles";
import { images } from "@/content/images";
import { formatDate } from "@/lib/format";

type Props = {
  article: Article;
  headingLevel?: "h2" | "h3";
  featured?: boolean;
};

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-gold-ink">
      <span>{article.category}</span>
      <span aria-hidden="true" className="h-3 w-px bg-gold-ink/40" />
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <span aria-hidden="true" className="h-3 w-px bg-gold-ink/40" />
      <span>{readingMinutes(article)} min read</span>
    </p>
  );
}

/** Whole card is one link target (via the heading link's ::after), keeping a single accessible name. */
export function ArticleCard({ article, headingLevel: Heading = "h3", featured = false }: Props) {
  const image = images[article.image];
  return (
    <article className={`group relative flex flex-col ${featured ? "lg:grid lg:grid-cols-2 lg:gap-12" : ""}`}>
      <div className={`relative overflow-hidden rounded-md bg-parchment ${featured ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
        <Image
          src={image.src}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "mt-6 lg:mt-0 lg:justify-center" : "mt-6"}`}>
        <ArticleMeta article={article} />
        <Heading className={`mt-3 text-forest ${featured ? "text-h2" : "text-h3"}`}>
          <Link
            href={`/insights/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 text-muted">{article.dek}</p>
      </div>
    </article>
  );
}
