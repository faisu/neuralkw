import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SignupForm } from "./SignupForm";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Sign up",
  description:
    "Create your neuralkw account. Self-serve signup for enterprise teams ready to automate AI-powered bill reconciliation against prefilled agreements.",
  path: "/signup",
  keywords: ["neuralkw signup", "bill reconciliation free trial"],
});

export default function SignupPage() {
  return (
    <main>
      <Section className="pt-28">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan">
              Get started
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Create your account
            </h1>
            <p className="mt-3 text-text-muted">
              Start reconciling bills against your agreements in minutes.
            </p>
          </div>
          <SignupForm />
        </div>
      </Section>
    </main>
  );
}
