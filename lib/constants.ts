export const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/analytics", label: "Analytics" },
] as const;

export const footerLinks = {
  product: [
    { href: "/product", label: "How it works" },
    { href: "/analytics", label: "Analytics" },
    { href: "/signup", label: "Sign up" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export const billVolumeOptions = [
  { value: "under-500", label: "Under 500 bills/month" },
  { value: "500-5000", label: "500 – 5,000 bills/month" },
  { value: "over-5000", label: "Over 5,000 bills/month" },
] as const;
