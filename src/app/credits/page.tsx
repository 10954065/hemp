import { LegalPage } from "@/components/sections/LegalPage";
import { images } from "@/content/images";
import type { SiteImage } from "@/content/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Image credits",
  description: "Sources, authors and licences for the photographs used on the HempWealth Ghana website.",
  path: "/credits",
});

export default function CreditsPage() {
  const entries: SiteImage[] = Object.values(images);
  return (
    <LegalPage
      eyebrow="Reference"
      title="Image credits"
      intro="Photographs on this website are openly licensed works from Wikimedia Commons. They illustrate industrial hemp and its uses and do not depict HempWealth Ghana's own sites, facilities or people."
      path="/credits"
      label="Image credits"
      updated="2026-10-31"
    >
      <p>
        We thank the photographers below. Where a licence requires it, adapted versions are shared under the same licence.
        Adaptation is limited to resizing, cropping and recompression.
      </p>
      <ul>
        {entries.map((image) => (
          <li key={image.src}>
            <strong>{image.subject}</strong>. Photo by {image.credit.author}.{" "}
            {image.credit.licenseUrl ? (
              <a href={image.credit.licenseUrl} rel="noopener noreferrer">
                {image.credit.license}
              </a>
            ) : (
              image.credit.license
            )}
            .{" "}
            <a href={image.credit.sourceUrl} rel="noopener noreferrer">
              Source
            </a>
            {image.credit.note ? ` ${image.credit.note}` : ""}
          </li>
        ))}
      </ul>
      <h2>Logo</h2>
      <p>
        The HempWealth Ghana emblem is the company&apos;s own mark. The version on this website is a vector redrawing of
        the company&apos;s existing logo.
      </p>
    </LegalPage>
  );
}
