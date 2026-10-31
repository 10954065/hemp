export type FaqItem = {
  question: string;
  answer: string;
};

/** Native disclosure widgets: keyboard and screen-reader accessible with no client JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-display text-[1.2rem] leading-snug text-forest marker:hidden [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="relative size-5 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-5 before:bg-gold-ink after:absolute after:left-1/2 after:top-0 after:h-5 after:w-px after:bg-gold-ink after:transition-transform after:duration-200 group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-3xl pb-6 pr-10 text-ink/85">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
