import type { Metadata } from "next";
import { BillExplainer } from "@/app/_components/BillExplainer";
import { CLUSTERS } from "@/app/_data/clusters";

export const metadata: Metadata = {
  title: "Bill decoder",
  description: "Direct link to the NeuralKW bill decoder.",
  robots: { index: false, follow: false },
};

export default function BillExplainerToolPage() {
  const cluster = CLUSTERS["electricity-bills"];
  return (
    <main className="cluster-electricity mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900">Bill decoder</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Paste a consumer number or upload a bill. This page is not indexed in
        search.
      </p>
      <div className="mt-8">
        <BillExplainer cluster={cluster} />
      </div>
    </main>
  );
}
