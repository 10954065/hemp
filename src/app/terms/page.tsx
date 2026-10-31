import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of the HempWealth Ghana website, its content and its enquiry forms.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="By using this website you agree to these terms. Please read them together with our Privacy Policy and Disclaimer."
      path="/terms"
      label="Terms of Use"
      updated="2026-10-31"
    >
      <h2>About these terms</h2>
      <p>
        This website is operated by {company.name}. These terms apply to everyone who visits it or uses its enquiry
        forms. If you do not agree with them, please do not use the website.
      </p>

      <h2>Purpose of the website</h2>
      <p>
        The website provides general information about {company.name}, its business plans and the industrial hemp sector,
        and lets businesses and institutions contact us. It does not sell products, offer investments or provide
        professional advice. Our <Link href="/disclaimer">Disclaimer</Link> explains this in more detail.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the website in a way that breaks any law or regulation;</li>
        <li>submit false, misleading, abusive or unlawful information through our forms;</li>
        <li>send unsolicited advertising, or use automated means to submit forms or extract content;</li>
        <li>attempt to gain unauthorised access to, interfere with or disrupt the website or its servers.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Unless stated otherwise, the text, design, logo and other original content of this website belong to{" "}
        {company.name}. You may view and print pages for your own reference. Any other reproduction requires our written
        permission. Photographs are used under the licences listed on our <Link href="/credits">image credits</Link> page,
        and those licences govern their reuse.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We link to official and published sources for reference. We are not responsible for the content or availability of
        external websites, and a link does not imply endorsement.
      </p>

      <h2>Accuracy and availability</h2>
      <p>
        We work to keep information accurate and current, but we do not guarantee that it is complete, accurate or up to
        date. We may change, suspend or withdraw the website, or any part of it, without notice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {company.name} is not liable for any loss or damage arising from use of, or
        reliance on, this website or its content. Nothing in these terms excludes liability that cannot be excluded by
        law.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Ghana, and the courts of Ghana have jurisdiction over any dispute.</p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms at any time by publishing a new version on this page. Questions about these terms can be
        sent to <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
