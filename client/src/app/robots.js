const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxidigital.solutions";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Never let crawlers index the form endpoint.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
