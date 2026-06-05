"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection, TaxiStripe } from "./HeroStyles";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, rotationX: -15 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.4",
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
        "-=0.3",
      );
  }, []);

  return (
    <Section>
      <LeftSection>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle main center>
            Welcome to <br />
            <span style={{ color: "#FFC107" }}>Taxi</span> Marketing Agency
          </SectionTitle>
        </motion.div>
        <SectionText ref={textRef}>
          Accelerating your brand&apos;s journey with data-driven marketing
          strategies.
        </SectionText>
        <motion.div
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get a Free Audit
          </Button>
        </motion.div>
        <TaxiStripe speed={isHovered ? "0.3s" : "1.5s"} />
      </LeftSection>
    </Section>
  );
};

export default Hero;
