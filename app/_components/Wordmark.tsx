import Link from "next/link";

type WordmarkProps = {
  href?: string;
  className?: string;
};

/** Inline SVG: Neural + stylised kW (kW uses cluster / default accent). */
export function Wordmark({ href = "/", className = "" }: WordmarkProps) {
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 132 28"
      className={`h-7 w-auto sm:h-8 ${className}`}
      aria-label="NeuralKW"
      role="img"
    >
      <title>NeuralKW</title>
      <text
        x="0"
        y="22"
        fontSize="20"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        fill="#171717"
      >
        Neural
      </text>
      <text
        x="78"
        y="12"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="var(--color-accent, #2563eb)"
      >
        k
      </text>
      <text
        x="86"
        y="16"
        fontSize="10"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        fill="var(--color-accent, #2563eb)"
      >
        W
      </text>
    </svg>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {svg}
      </Link>
    );
  }
  return <span className="inline-flex shrink-0 items-center">{svg}</span>;
}
