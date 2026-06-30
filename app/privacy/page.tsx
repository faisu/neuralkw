import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "neuralkw privacy policy. Learn how we process bills, agreements, and analytics data for enterprise reconciliation.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <Section className="pt-28">
        <article className="prose prose-invert max-w-3xl">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-text-muted">Last updated: June 30, 2026</p>

          <div className="mt-8 space-y-6 text-text-muted">
            <section>
              <h2 className="text-xl font-semibold text-white">Overview</h2>
              <p className="mt-2">
                neuralkw (&quot;we&quot;, &quot;us&quot;) provides an AI-orchestrated bill
                reconciliation platform for enterprise customers. This policy describes how we
                collect, use, and protect information when you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Data we process</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Account information (name, email, organization)</li>
                <li>Vendor bills and invoices uploaded to the platform</li>
                <li>Agreement and contract data used for reconciliation context</li>
                <li>Reconciliation results, exception logs, and analytics derived from processing</li>
                <li>Usage data and audit logs for security and service improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">AI processing</h2>
              <p className="mt-2">
                Bills and agreement data are processed by AI agents to perform reconciliation,
                detect exceptions, and generate analytics. Processing occurs within our
                infrastructure or approved subprocessors under contractual safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Data retention</h2>
              <p className="mt-2">
                We retain data for the duration of your account and as required by law or
                contractual obligations. You may request deletion of your data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Subprocessors</h2>
              <p className="mt-2">
                We use third-party infrastructure providers for hosting, authentication, and AI
                inference. A current list of subprocessors is available upon request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p className="mt-2">
                For privacy inquiries, contact{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent-cyan hover:underline">
                  {siteConfig.contactEmail}
                </a>.
              </p>
            </section>
          </div>
        </article>
      </Section>
    </main>
  );
}
