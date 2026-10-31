type Props = {
  data: Record<string, unknown>;
};

/**
 * Renders structured data. The input is always built from our own content modules,
 * never from user input; "<" is escaped so a string can never close the script tag.
 */
export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
