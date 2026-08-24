"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Taxi06 from "../../styles/assets/Taxi-06.png";
import Taxi05 from "../../styles/assets/Taxi-05.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaWhatsapp, FaTelegram, FaSnapchat, FaPinterest, FaTiktok, FaYoutube  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  CtaLink,
  SocialIcons,
  CheckeredStrip,
} from "./HeaderStyles";

const navLinks = [
  { label: "Projects",  href: "#projects" },
  { label: "Services",  href: "#tech" },
  { label: "About",     href: "#about" },
];

const socialLinks = [
  { Icon: AiFillFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: AiFillLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: AiFillInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaTiktok , href: "https://tiktok.com", label: "TikTok" },
  { Icon: FaYoutube , href: "https://youtube.com", label: "YouTube" },
  { Icon: FaXTwitter , href: "https://twitter.com", label: "Twitter" },
  { Icon: FaWhatsapp, href: "https://wa.me/01111255279", label: "WhatsApp" },
  { Icon: FaTelegram, href: "https://t.me/taxi", label: "Telegram" },
  {
    Icon: FaSnapchat,
    href: "https://snapchat.com/add/taxi",
    label: "Snapchat",
  },
  {
    Icon: FaPinterest,
    href: "https://pinterest.com/taxi",
    label: "Pinterest",
  },
];

const Header = () => {
  const headerRef  = useRef(null);
  const logoRef    = useRef(null);
  const navRef     = useRef(null);
  const socialRef  = useRef(null);
  const stripRef   = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  /* ── GSAP entrance timeline ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(stripRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6 }
    )
    .fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.7 },
      "-=0.2"
    )
    .fromTo(logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0,   opacity: 1, duration: 0.5 },
      "-=0.4"
    )
    .fromTo(navRef.current?.children || [],
      { y: -20, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.4, stagger: 0.1 },
      "-=0.3"
    )
    .fromTo(socialRef.current?.children || [],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08 },
      "-=0.3"
    );
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    hover:   { color: "#FFC107", y: -2, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div ref={stripRef}>
        <CheckeredStrip />
      </div>
      <Container ref={headerRef} style={{
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
      }}>
        {/* ── Logo ── */}
        <Div1>
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <motion.div
              ref={logoRef}
              style={{ display: "flex", alignItems: "center", color: "white", gap: "4px" }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, -5, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image src={Taxi06} alt="Taxi logo icon" width={52} height={52} priority />
              </motion.div>
              <Image src={Taxi05} alt="Taxi wordmark" width={56} height={26} />
            </motion.div>
          </Link>
        </Div1>

        {/* ── Nav links ── */}
        <Div2 ref={navRef}>
          {navLinks.map(({ label, href }) => (
            <motion.li
              key={label}
              variants={linkVariants}
              whileHover="hover"
              style={{ listStyle: "none" }}
            >
              <NavLink href={href}>{label}</NavLink>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ listStyle: "none" }}
          >
            <CtaLink href="#projects">Get a Quote</CtaLink>
          </motion.li>
        </Div2>

        {/* ── Social icons ── */}
        <Div3 ref={socialRef}>
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              <SocialIcons href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size="2.4rem" />
              </SocialIcons>
            </motion.div>
          ))}
        </Div3>
      </Container>
    </>
  );
};

export default Header;
