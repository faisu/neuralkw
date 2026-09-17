import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  brandedTitle,
  createMetadata,
  siteConfig,
  webPageJsonLd,
} from "@/lib/seo";

const description =
  "neuralkw terms of service. Terms governing use of our website and waitlist for the property visualization platform.";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          name: brandedTitle("Terms of Service"),
          description,
          path: "/terms",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <Section className="pt-28">
        <article className="max-w-3xl">
          <h1 className="text-4xl font-normal tracking-[-0.04em] text-text-primary">Terms of Service</h1>
          <p className="mt-4 text-text-muted">Last updated: September 16, 2026</p>

          <div className="mt-8 space-y-6 text-text-muted">
            <section>
              <h2 className="text-xl font-medium text-text-primary">Agreement</h2>
              <p className="mt-2">
                By accessing or using neuralkw, you agree to these Terms of Service. If you are
                using the site on behalf of an organization, you represent that you have authority
                to bind that organization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Service description</h2>
              <p className="mt-2">
                neuralkw is preparing a platform that transforms 2D property layouts into 3D models
                and marketing assets such as videos, websites, and pamphlets. The website currently
                provides product information and a waitlist for early access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Your responsibilities</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide accurate waitlist and contact information</li>
                <li>Use the website only for lawful purposes</li>
                <li>Do not attempt to disrupt or misuse the waitlist or related systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Waitlist and early access</h2>
              <p className="mt-2">
                Joining the waitlist does not guarantee a launch date, feature set, or commercial
                terms. We may contact you with product updates and early access invitations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Limitation of liability</h2>
              <p className="mt-2">
                The website and waitlist are provided &quot;as is&quot; to the maximum extent
                permitted by law. neuralkw is not liable for indirect, incidental, or consequential
                damages arising from use of the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Contact</h2>
              <p className="mt-2">
                Questions about these terms? Contact{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="underline decoration-black/20 underline-offset-4 hover:decoration-black">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </Section>
    </main>
  );
}
