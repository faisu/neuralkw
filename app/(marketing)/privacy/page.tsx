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
  "neuralkw privacy policy. Learn how we collect and use waitlist and contact information for our property visualization platform.";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          name: brandedTitle("Privacy Policy"),
          description,
          path: "/privacy",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <Section className="pt-28">
        <article className="max-w-3xl">
          <h1 className="text-4xl font-normal tracking-[-0.04em] text-text-primary">Privacy Policy</h1>
          <p className="mt-4 text-text-muted">Last updated: September 16, 2026</p>

          <div className="mt-8 space-y-6 text-text-muted">
            <section>
              <h2 className="text-xl font-medium text-text-primary">Overview</h2>
              <p className="mt-2">
                neuralkw (&quot;we&quot;, &quot;us&quot;) is building a platform that turns 2D
                property layouts into 3D models and marketing assets. This policy describes how we
                collect, use, and protect information when you visit our website or join the
                waitlist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Data we process</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Waitlist details you submit (name, work email, and optional company name)</li>
                <li>Messages you send us via email</li>
                <li>Basic usage data needed to operate and improve the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">How we use information</h2>
              <p className="mt-2">
                We use waitlist information to confirm your registration, share launch updates and
                early access, and understand demand for the platform. We do not sell your personal
                information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Data retention</h2>
              <p className="mt-2">
                We retain waitlist data until you ask us to remove it, or until it is no longer
                needed for launch communications. You may request deletion of your data by
                contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Subprocessors</h2>
              <p className="mt-2">
                We use third-party infrastructure providers for hosting and data storage. A current
                list of subprocessors is available upon request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-text-primary">Contact</h2>
              <p className="mt-2">
                For privacy inquiries, contact{" "}
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
