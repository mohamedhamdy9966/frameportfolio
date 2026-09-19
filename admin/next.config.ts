import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fail the build on a type error rather than shipping it.
  typescript: { ignoreBuildErrors: false },

  // The admin only talks to the API from the server, so there is no need to
  // expose source maps to the browser.
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        // Defence in depth alongside proxy.ts and the per-route checks.
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
