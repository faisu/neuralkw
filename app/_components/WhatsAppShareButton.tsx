"use client";

type Props = {
  clusterPath: string;
};

export function WhatsAppShareButton({ clusterPath }: Props) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://neuralkw.com";
  const link = `${origin}${clusterPath}#bill-explainer`;
  const text = encodeURIComponent(
    `NeuralKW bill summary — decode charges here: ${link}`,
  );

  return (
    <a
      href={`https://wa.me/?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full bg-green-600 px-5 text-sm font-semibold text-white"
    >
      Share on WhatsApp
    </a>
  );
}
