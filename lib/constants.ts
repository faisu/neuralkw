export const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/analytics", label: "Analytics" },
] as const;

export const footerLinks = {
  product: [
    { href: "/product", label: "How it works" },
    { href: "/analytics", label: "Analytics" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
