const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxidigital.solutions";

export default function sitemap() {
  const now = new Date();

  // The site is a single-page experience, so the section anchors are
  // listed as the canonical entry points worth surfacing to search.
  const sections = [
    "",
    "#projects",
    "#software",
    "#tech",
    "#approach",
    "#faq",
    "#contact",
  ];

  return sections.map((section) => ({
    url: `${SITE_URL}/${section}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.7,
  }));
}
