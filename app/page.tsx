import { ClusterLanding } from "@/app/_components/ClusterLanding";
import { clusterMetadata } from "@/app/_lib/metadata";

export const metadata = clusterMetadata("electricity-bills");

export default function Home() {
  return <ClusterLanding clusterId="electricity-bills" />;
}
