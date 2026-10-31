import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How HempWealth Ghana collects, uses, shares and protects personal information submitted through this website, and your rights under Ghana's Data Protection Act, 2012 (Act 843).",
  path: "/privacy",
});

export default function PrivacyPage() {
  const { contact } = company;
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what personal information we collect through this website, why we collect it, and the choices and rights you have."
      path="/privacy"
      label="Privacy Policy"
      updated="2026-10-31"
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by {company.name} (&quot;we&quot;, &quot;us&quot;), a company incorporated in Ghana. For
        any question about this policy or your personal information, email{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> or write to {contact.postal.lines.join(", ")}.
      </p>

      <h2>What we collect</h2>
      <p>We collect personal information only when you choose to send us an enquiry through a form on this website:</p>
      <ul>
        <li>your full name, email address and country;</li>
        <li>optionally, your organisation, job title and telephone number;</li>
        <li>the type of enquiry, any answers to enquiry-specific questions, and your message.</li>
      </ul>
      <p>
        Please do not include sensitive personal information, such as health information, in your message. We do not need
        it to respond.
      </p>
      <p>
        To protect the forms from abuse, our server uses your IP address temporarily to limit repeated submissions. We do
        not store it with your enquiry. Our hosting provider may also keep standard server logs, including IP addresses
        and browser information, for security and operational purposes.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        This website does not set cookies and does not use analytics, advertising or social-media tracking tools. Fonts
        are served from our own website, so your browser does not contact third-party font services when you visit.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>to read and reply to your enquiry and route it to the right person;</li>
        <li>to manage any business relationship or discussions that follow from it;</li>
        <li>to keep the website and its forms secure.</li>
      </ul>
      <p>
        We process your information with your consent, which you give when you submit a form, and, where relevant, in
        order to take steps you request before entering into an agreement. We do not use enquiry details for marketing
        without your separate agreement.
      </p>

      <h2>Who we share it with</h2>
      <p>We do not sell personal information. We share it only with:</p>
      <ul>
        <li>
          our email delivery provider, which transmits your enquiry from the website to our inbox, and our email service
          provider, which stores it;
        </li>
        <li>our website hosting provider, which runs the servers this website uses;</li>
        <li>professional advisers, regulators or authorities where the law requires it.</li>
      </ul>
      <p>
        Some of these providers may process information outside Ghana. Where they do, we rely on providers that apply
        appropriate security and contractual safeguards.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries only for as long as necessary to respond to them and to manage any relationship that follows,
        and to meet legal obligations. We then delete them or anonymise them.
      </p>

      <h2>Your rights</h2>
      <p>Under the Data Protection Act, 2012 (Act 843), you may ask us to:</p>
      <ul>
        <li>confirm whether we hold personal information about you, and give you a copy;</li>
        <li>correct information that is inaccurate or incomplete;</li>
        <li>delete your information, or stop processing it, where the law allows.</li>
      </ul>
      <p>
        To make a request, email <a href={`mailto:${contact.email}`}>{contact.email}</a>. If you are not satisfied with our
        response, you may contact the{" "}
        <a href="https://www.dataprotection.org.gh/" rel="noopener noreferrer">
          Data Protection Commission
        </a>{" "}
        of Ghana.
      </p>

      <h2>Security</h2>
      <p>
        The website is served over an encrypted connection, form submissions are validated on our server, and access to
        enquiries is limited to the people who need it to respond. No method of transmission or storage is completely
        secure, but we take reasonable steps to protect your information.
      </p>

      <h2>Children</h2>
      <p>This website is intended for businesses and professionals. It is not directed at anyone under 18.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy when our practices or the law change. The date at the top of this page shows when it
        was last updated. See also our <Link href="/terms">Terms of Use</Link> and <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
