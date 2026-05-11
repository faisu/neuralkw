import { ClusterLanding } from "@/app/_components/ClusterLanding";
import { clusterMetadata } from "@/app/_lib/metadata";

export const metadata = clusterMetadata("bijli-bill");

export default function BijliBillPage() {
  return <ClusterLanding clusterId="bijli-bill" />;
}
