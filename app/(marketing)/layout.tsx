import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="page-rail mx-auto w-full max-w-[1360px] flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
