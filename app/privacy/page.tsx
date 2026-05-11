import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How NeuralKW handles bill uploads and personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900">Privacy policy</h1>
      <p className="mt-4 text-sm text-zinc-600">
        Neural Kilowatt (&quot;NeuralKW&quot;) processes electricity bills only to
        provide the decoder and related communications you request.
      </p>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-sm text-zinc-700">
        <li>Uploaded files are used for extraction and then deleted on a rolling schedule (up to 90 days unless a shorter period is posted here).</li>
        <li>We do not sell your personal data. Lead information is used to send reports and optional follow-up about electricity services.</li>
        <li>Data is stored in India with practices aligned to the Digital Personal Data Protection Act, 2023.</li>
        <li>
          For questions, contact the team through the same channel you used to
          submit a lead.
        </li>
      </ul>
      <p className="mt-10 text-sm">
        <Link href="/" className="font-medium text-[var(--color-accent-electricity)] underline">
          Back to home
        </Link>
      </p>
    </main>
  );
}
