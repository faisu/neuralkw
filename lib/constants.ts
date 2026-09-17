export const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#workflow", label: "How it works" },
  { href: "/#use-cases", label: "Use cases" },
  { href: "/#film", label: "Films" },
  { href: "/#waitlist", label: "Waitlist" },
] as const;

export const footerLinks = {
  product: [
    { href: "/#product", label: "Product" },
    { href: "/#workflow", label: "How it works" },
    { href: "/#use-cases", label: "Use cases" },
    { href: "/#film", label: "Films" },
    { href: "/#waitlist", label: "Join waitlist" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
