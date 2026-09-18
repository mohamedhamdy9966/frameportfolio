"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  MdOutlineKeyboardArrowDown,
  MdOutlineClose,
  MdOutlineWeb,
  MdOutlinePhoneIphone,
  MdOutlineCloudQueue,
  MdOutlineShoppingCart,
  MdOutlineHub,
  MdOutlineSecurity,
  MdOutlineCampaign,
  MdOutlineSearch,
} from "react-icons/md";
import { RiMenu4Line } from "react-icons/ri";
import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  NavLinkActive,
  CtaLink,
  SocialIcons,
  CheckeredStrip,
  ServicesTrigger,
  ServicesMenu,
  ServicesItem,
  MenuToggle,
  MobileSheet,
  MobileSheetHead,
  MobileGroupLabel,
  MobileLink,
  MobileCta,
  MobileSocials,
} from "./HeaderStyles";
import { softwareServices } from "../../constants/constants";

/* Every nav entry maps to a section id that actually exists on the
   homepage, so no link can point at a missing anchor. */
const navLinks = [
  { label: "Work",     href: "#projects", id: "projects" },
  { label: "About",    href: "#about",    id: "about" },
  { label: "Pricing",  href: "#approach", id: "approach" },
  { label: "Contact",  href: "#contact",  id: "contact" },
];

/* Icon registry keyed by the `icon` string used in constants. */
const serviceIcons = {
  web: MdOutlineWeb,
  mobile: MdOutlinePhoneIphone,
  saas: MdOutlineCloudQueue,
  commerce: MdOutlineShoppingCart,
  api: MdOutlineHub,
  cloud: MdOutlineSecurity,
};

const socialLinks = [
  { Icon: AiFillFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: AiFillLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: AiFillInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaTiktok , href: "https://tiktok.com", label: "TikTok" },
  { Icon: FaYoutube , href: "https://youtube.com", label: "YouTube" },
  { Icon: FaXTwitter , href: "https://twitter.com", label: "Twitter" },
  // wa.me links require the international format: no leading zero.
  { Icon: FaWhatsapp, href: "https://wa.me/201111255279", label: "WhatsApp" },
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
  const headerRef   = useRef(null);
  const logoRef     = useRef(null);
  const navRef      = useRef(null);
  const socialRef   = useRef(null);
  const stripRef    = useRef(null);
  const servicesRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section highlighting ──
     Observes every real section so the nav reflects where the
     visitor actually is on the page. */
  useEffect(() => {
    const ids = ["software", "projects", "tech", "about", "approach", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ── Dismiss dropdowns on outside click / Escape ── */
  useEffect(() => {
    const onPointerDown = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* ── Lock body scroll while the mobile sheet is open ── */
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previous || "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  /* ── Smooth in-page scrolling that clears the sticky header ── */
  const scrollToSection = useCallback((event, href) => {
    if (!href || !href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    setServicesOpen(false);
    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", href);
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
          {/* Services dropdown */}
          <motion.li
            ref={servicesRef}
            variants={linkVariants}
            style={{ listStyle: "none", position: "relative" }}
          >
            <ServicesTrigger
              type="button"
              $open={servicesOpen}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              Services
              <MdOutlineKeyboardArrowDown size="1.8rem" />
            </ServicesTrigger>

            <AnimatePresence>
              {servicesOpen && (
                <ServicesMenu
                  as={motion.div}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {softwareServices.map(({ id, title, icon, text }) => {
                    const Icon = serviceIcons[icon] || MdOutlineWeb;
                    return (
                      <ServicesItem
                        key={id}
                        href="#software"
                        onClick={(event) => scrollToSection(event, "#software")}
                      >
                        <span className="icon">
                          <Icon />
                        </span>
                        <span className="body">
                          <span className="title">{title}</span>
                          <span className="desc">{text}</span>
                        </span>
                      </ServicesItem>
                    );
                  })}
                  <ServicesItem
                    href="#tech"
                    onClick={(event) => scrollToSection(event, "#tech")}
                  >
                    <span className="icon">
                      <MdOutlineCampaign />
                    </span>
                    <span className="body">
                      <span className="title">Growth Marketing</span>
                      <span className="desc">
                        Paid media, SEO and CRO that feed the product.
                      </span>
                    </span>
                  </ServicesItem>
                  <ServicesItem
                    href="#projects"
                    onClick={(event) => scrollToSection(event, "#projects")}
                  >
                    <span className="icon">
                      <MdOutlineSearch />
                    </span>
                    <span className="body">
                      <span className="title">Case Studies</span>
                      <span className="desc">
                        Platform work we have shipped and scaled.
                      </span>
                    </span>
                  </ServicesItem>
                </ServicesMenu>
              )}
            </AnimatePresence>
          </motion.li>

          {navLinks.map(({ label, href, id }) => (
            <motion.li
              key={label}
              variants={linkVariants}
              whileHover="hover"
              style={{ listStyle: "none" }}
            >
              {activeSection === id ? (
                <NavLinkActive
                  href={href}
                  aria-current="true"
                  onClick={(event) => scrollToSection(event, href)}
                >
                  {label}
                </NavLinkActive>
              ) : (
                <NavLink href={href} onClick={(event) => scrollToSection(event, href)}>
                  {label}
                </NavLink>
              )}
            </motion.li>
          ))}

          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ listStyle: "none" }}
          >
            <CtaLink href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
              Get a Quote
            </CtaLink>
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
                <Icon size="2.2rem" />
              </SocialIcons>
            </motion.div>
          ))}

          <MenuToggle
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <RiMenu4Line size="2.2rem" />
          </MenuToggle>
        </Div3>
      </Container>

      {/* ── Mobile menu sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <MobileSheet
            as={motion.div}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <MobileSheetHead>
              <Image src={Taxi05} alt="Taxi" width={84} height={38} />
              <button
                type="button"
                className="close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <MdOutlineClose size="2.2rem" />
              </button>
            </MobileSheetHead>

            <MobileGroupLabel>Navigate</MobileGroupLabel>
            {navLinks.map(({ label, href }) => (
              <MobileLink
                key={label}
                href={href}
                onClick={(event) => scrollToSection(event, href)}
              >
                {label}
                <span>→</span>
              </MobileLink>
            ))}

            <MobileGroupLabel>Services</MobileGroupLabel>
            {softwareServices.map(({ id, title }) => (
              <MobileLink
                key={id}
                href="#software"
                onClick={(event) => scrollToSection(event, "#software")}
              >
                {title}
                <span>→</span>
              </MobileLink>
            ))}
            <MobileLink href="#tech" onClick={(event) => scrollToSection(event, "#tech")}>
              Growth Marketing
              <span>→</span>
            </MobileLink>

            <MobileCta href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
              Get a Quote
            </MobileCta>

            <MobileSocials>
              {socialLinks.map(({ Icon, href, label }) => (
                <SocialIcons
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size="2.4rem" />
                </SocialIcons>
              ))}
            </MobileSocials>
          </MobileSheet>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
