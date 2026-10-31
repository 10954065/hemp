type SourceLink = {
  title: string;
  publisher: string;
  url: string;
  date?: string;
};

type Props = {
  sources: SourceLink[];
  heading?: string;
  id?: string;
};

/** Numbered reference list for sourced content. External links open in the same tab. */
export function SourceList({ sources, heading = "Sources", id = "sources" }: Props) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-8">
      <h2 id={id} className="font-sans text-eyebrow font-semibold uppercase text-gold-ink">
        {heading}
      </h2>
      <ol className="mt-5 space-y-3 text-[0.9rem] text-muted">
        {sources.map((source, index) => (
          <li key={source.url} className="grid grid-cols-[1.75rem_1fr]">
            <span aria-hidden="true" className="tabular-nums text-gold-ink">
              {index + 1}.
            </span>
            <span>
              <a
                href={source.url}
                rel="noopener noreferrer"
                className="text-moss underline decoration-moss/30 underline-offset-4 hover:decoration-moss"
              >
                {source.title}
              </a>
              <span className="block text-[0.82rem]">
                {source.publisher}
                {source.date ? `, ${source.date}` : ""}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
