import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist on this site.",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Our Work", href: "/#projects" },
  { label: "Software Development", href: "/#software" },
  { label: "Pricing", href: "/#approach" },
  { label: "Get a Quote", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        gap: "18px",
      }}
    >
      <p
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#FFC107",
        }}
      >
        Error 404
      </p>

      <h1
        style={{
          fontSize: "clamp(3.2rem, 7vw, 6.4rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          margin: 0,
          background:
            "linear-gradient(135deg, #ffffff 40%, #FFC107 75%, #FF8C00 95%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        This route does not exist.
      </h1>

      <p
        style={{
          maxWidth: "560px",
          fontSize: "1.7rem",
          lineHeight: 1.7,
          fontWeight: 300,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        The link may be out of date. Everything on this site lives on the
        homepage — pick a section below.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginTop: "14px",
        }}
      >
        {links.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "999px",
              fontSize: "1.45rem",
              fontWeight: 700,
              color: label === "Get a Quote" ? "#0A0A0A" : "#FFC107",
              background:
                label === "Get a Quote"
                  ? "linear-gradient(90deg, #FFC107, #FF8C00)"
                  : "transparent",
              border:
                label === "Get a Quote"
                  ? "1px solid transparent"
                  : "1px solid rgba(255,193,7,0.35)",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
