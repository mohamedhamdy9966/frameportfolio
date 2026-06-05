"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  HeroSection,
  LeftSection,
  RightSection,
  HeroBadge,
  StatRow,
  StatItem,
  TaxiStripe,
  ScrollIndicator,
} from "./HeroStyles";
import dynamic from "next/dynamic";
import { SectionText } from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";

// Dynamic import with ssr:false eliminates the Math.sin/cos floating-point
// hydration mismatch between server and client rendering.
const TaxiAnimation = dynamic(() => import("./TaxiAnimation"), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { num: "200+", label: "Campaigns" },
  { num: "150+", label: "Happy Clients" },
  { num: "300%", label: "Avg. ROI" },
];

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const textRef    = useRef(null);
  const buttonRef  = useRef(null);
  const statsRef   = useRef(null);
  const stripeRef  = useRef(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.5 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 60, rotationX: -12 },
      { opacity: 1, y: 0,  rotationX: 0,  duration: 0.9 },
      "-=0.2"
    )
    .fromTo(textRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0,  duration: 0.6 },
      "-=0.4"
    )
    .fromTo(buttonRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1,    duration: 0.5, ease: "elastic.out(1, 0.6)" },
      "-=0.3"
    )
    .fromTo(statsRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0,  duration: 0.4, stagger: 0.15 },
      "-=0.2"
    )
    .fromTo(stripeRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  /* ── Framer variants ── */
  const titleWords = ["Accelerate", "Your Brand's", "Growth."];
  const wordVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 + 0.6, duration: 0.6, ease: "easeOut" } }),
  };

  return (
    <HeroSection>
      {/* ── Left content ── */}
      <LeftSection>
        {/* Badge */}
        <motion.div ref={badgeRef} initial={{ opacity: 0 }}>
          <HeroBadge>
            <span className="dot" />
            Taxi Marketing Agency
          </HeroBadge>
        </motion.div>

        {/* Headline */}
        <h1
          ref={titleRef}
          style={{
            fontWeight: 900,
            fontSize: "clamp(3.6rem, 6vw, 7.2rem)",
            lineHeight: 1.05,
            marginBottom: "2.4rem",
            background: "linear-gradient(135deg, #ffffff 40%, #FFC107 70%, #FF8C00 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Accelerate <br />
          <span style={{ color: "#FFC107", WebkitTextFillColor: "#FFC107" }}>
            Your Brand&apos;s
          </span>{" "}
          <br />
          Growth.
        </h1>

        {/* Sub-text */}
        <SectionText ref={textRef} style={{ paddingBottom: "2rem" }}>
          Data-driven campaigns that turn attention into revenue.
          We build marketing systems that scale — fast.
        </SectionText>

        {/* CTA buttons */}
        <div
          ref={buttonRef}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See Our Work
            </Button>
          </motion.div>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 28px",
              height: "64px",
              borderRadius: "999px",
              border: "1px solid rgba(255,193,7,0.35)",
              color: "#FFC107",
              fontWeight: 700,
              fontSize: "1.8rem",
              letterSpacing: "0.03em",
              transition: "border-color 0.3s",
            }}
          >
            Our Story →
          </motion.a>
        </div>

        {/* Stats row */}
        <StatRow ref={statsRef}>
          {stats.map(({ num, label }) => (
            <StatItem key={label}>
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </StatItem>
          ))}
        </StatRow>

        {/* Animated stripe */}
        <div ref={stripeRef}>
          <TaxiStripe speed={isHovered ? "0.4s" : "1.6s"} />
        </div>
      </LeftSection>

      {/* ── Right visual (desktop only) ── */}
      <RightSection>
        <TaxiAnimation />
      </RightSection>

      {/* ── Scroll cue ── */}
      <ScrollIndicator>
        <div className="mouse" />
        <span>Scroll</span>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
