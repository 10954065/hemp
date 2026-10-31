import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "The informational nature of the HempWealth Ghana website: industry information versus company statements, forward-looking statements, and why nothing here is legal, medical or investment advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      intro="Please read this disclaimer before relying on anything on this website."
      path="/disclaimer"
      label="Disclaimer"
      updated="2026-10-31"
    >
      <h2>General information only</h2>
      <p>
        The content of this website is provided for general information. It is not intended to be relied on as the basis
        for any decision, and it should not be treated as a substitute for professional advice.
      </p>

      <h2>Industry information and company statements</h2>
      <p>
        Much of this website describes the industrial hemp sector in general: how the plant is used, how other markets
        regulate it, and how Ghana&apos;s framework works. That information does not mean that {company.name} produces,
        supplies or is authorised to supply any product or market mentioned.
      </p>
      <p>
        Statements about {company.name} itself, including its plans, project scale, location, licensing and capabilities,
        describe the company&apos;s position or intentions at the date of publication. They are confirmed, where
        appropriate, through documents provided during due diligence.
      </p>

      <h2>Forward-looking statements</h2>
      <p>
        Statements about plans, objectives, expansion, harvests or future relationships are forward-looking. They depend
        on licensing decisions, agronomic results, financing, market conditions and other factors outside our control, and
        actual outcomes may differ materially.
      </p>

      <h2>Not legal advice</h2>
      <p>
        Our summaries of Ghanaian law and regulation are simplified and may not reflect the latest amendments, guidance or
        court decisions. Take advice from a qualified Ghanaian legal practitioner before acting, and confirm requirements
        with the relevant authorities.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Nothing on this website is medical advice or a claim that hemp or any compound derived from it treats, cures or
        prevents any condition. {company.name} does not sell medicines or consumer products.
      </p>

      <h2>Not investment advice or an offer</h2>
      <p>
        Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any shares, securities or other
        investment, and nothing here is investment, financial or tax advice. No returns are promised or implied. Any
        investment discussion is subject to due diligence, formal documentation and applicable law. Investing in an
        early-stage business carries a high risk, including loss of capital.
      </p>

      <h2>Images</h2>
      <p>
        Photographs on this website are openly licensed images used to illustrate industrial hemp and its uses. Unless a
        caption says otherwise, they do not show {company.name}&apos;s land, facilities, equipment or people. See{" "}
        <Link href="/credits">image credits</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        If anything on this website is unclear, please <Link href="/contact">contact us</Link> before relying on it.
      </p>
    </LegalPage>
  );
}
