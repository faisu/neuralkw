import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Parent repo has its own lockfile; pin Turbopack to this app root.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
