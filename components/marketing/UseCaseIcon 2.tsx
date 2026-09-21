type IconName = "building" | "draft" | "interior" | "key" | "megaphone" | "helmet";

export function UseCaseIcon({ name }: { name: IconName }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true as const,
    className: "text-text-primary",
  };

  if (name === "building") {
    return (
      <svg {...common}>
        <path d="M7 28V10l9-6 9 6v18" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13 28v-8h6v8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 14h2.5M17.5 14H20M12 18h2.5M17.5 18H20" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (name === "draft") {
    return (
      <svg {...common}>
        <path d="M6 24 16 6l10 18H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M16 14v10M11 24l5-6 5 6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }

  if (name === "interior") {
    return (
      <svg {...common}>
        <path d="M7 20h18v3H7zM9 20v-5h14v5M11 15V11h10v4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 23v3M24 23v3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (name === "key") {
    return (
      <svg {...common}>
        <circle cx="12" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 14.8 26 24.5M22 21v4.5M25.5 20.8v4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "megaphone") {
    return (
      <svg {...common}>
        <path d="M8 13v7h3.5L22 24V9L11.5 13H8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 16H6.5a2.5 2.5 0 0 0 0 5H8" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M8 18h16v8H8z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 18v-4a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 18h18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 26v-4h4v4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
