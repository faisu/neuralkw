import { ClusterLanding } from "@/app/_components/ClusterLanding";
import { clusterMetadata } from "@/app/_lib/metadata";

export const metadata = clusterMetadata("light-bill");

export default function LightBillPage() {
  return <ClusterLanding clusterId="light-bill" />;
}
