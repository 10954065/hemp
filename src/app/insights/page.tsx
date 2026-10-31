import { ArticleCard } from "@/components/sections/ArticleCard";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { articles } from "@/content/articles";
import type { ArticleCategory } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Sourced articles on Ghana's cannabis licensing framework, the 0.3% THC threshold for industrial hemp, and how each part of the hemp plant is used in industry.",
  path: "/insights",
});

const categoryDescriptions: Record<ArticleCategory, string> = {
  Regulation: "Ghana's legal framework and what it means in practice.",
  Industry: "Standards, definitions and market context.",
  Applications: "How hemp is used, and what each use requires.",
};

export default function InsightsPage() {
  const [featured, ...rest] = articles;
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  return (
    <>
      <PageHero
        variant="plain"
        eyebrow="Insights"
        title="Research and regulatory notes"
        intro={
          <p>
            Practical, sourced explainers on industrial hemp, Ghana&apos;s regulatory framework and the industries the
            crop serves. Every article lists its sources and the date it was last reviewed.
          </p>
        }
        breadcrumbs={[{ label: "Insights", href: "/insights" }]}
      />

      <section aria-labelledby="topics-title" className="border-b border-line bg-white">
        <Container className="py-10">
          <h2 id="topics-title" className="text-eyebrow font-semibold uppercase text-gold-ink">
            Topics
          </h2>
          <dl className="mt-5 grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <div key={category}>
                <dt className="font-display text-lg text-forest">{category}</dt>
                <dd className="mt-1 text-[0.95rem] text-muted">{categoryDescriptions[category]}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-label="Articles" className="bg-ivory py-16 lg:py-24">
        <Container>
          {featured ? (
            <>
              <ArticleCard article={featured} headingLevel="h2" featured />
              {rest.length > 0 && (
                <div className="mt-20 grid gap-14 border-t border-line pt-16 md:grid-cols-2">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} headingLevel="h2" />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-md border border-dashed border-forest/30 p-10 text-center">
              <h2 className="text-h3 text-forest">New articles are in preparation</h2>
              <p className="mt-3 text-muted">Please check back soon, or contact us with a question you would like answered.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
