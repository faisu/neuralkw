import { ClusterLanding } from "@/app/_components/ClusterLanding";
import { clusterMetadata } from "@/app/_lib/metadata";

export const metadata = clusterMetadata("power-bill");

export default function PowerBillPage() {
  return <ClusterLanding clusterId="power-bill" />;
}
