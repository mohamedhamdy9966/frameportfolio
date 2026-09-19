"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaWhatsapp, FaTelegram, FaSnapchat, FaPinterest, FaTiktok, FaYoutube  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SocialIcons } from "../Header/HeaderStyles";
import { siteConfig, softwareProjects } from "../../constants/constants";
import {
  FooterWrapper,
  FooterInner,
  FooterTop,
  FooterBottom,
  BrandColumn,
  BrandName,
  Slogan,
  SloganMini,
  LinkList,
  LinkColumn,
  LinkTitle,
  LinkItem,
  Copyright,
  SocialContainer,
  LegalRow,
  LegalLink,
  ContactLine,
} from "./FooterStyles";

const socials = [
  { Icon: AiFillFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: AiFillLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: AiFillInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaTiktok , href: "https://tiktok.com", label: "TikTok" },
  { Icon: FaYoutube , href: "https://youtube.com", label: "YouTube" },
  { Icon: FaXTwitter , href: "https://twitter.com", label: "Twitter" },
  // wa.me requires the international format (no leading zero).
  { Icon: FaWhatsapp, href: siteConfig.whatsapp, label: "WhatsApp" },
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

const Footer = () => (
 <FooterWrapper>
    <FooterInner>
      <FooterTop>
        {/* Brand column */}
        <BrandColumn>
          <BrandName>TAXI</BrandName>
          <Slogan>
            Accelerating brands through data-driven marketing and custom
            software. Fast results. Measurable growth.
          </Slogan>
          <SloganMini>
            {siteConfig.address} · {siteConfig.workingHours}
          </SloganMini>
        </BrandColumn>

        {/* Link columns */}
        <LinkList>
          <LinkColumn>
            <LinkTitle>Contact</LinkTitle>
            <LinkItem href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</LinkItem>
            <LinkItem href={`mailto:${siteConfig.email}`}>{siteConfig.email}</LinkItem>
            <LinkItem
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </LinkItem>
          </LinkColumn>

          <LinkColumn>
            <LinkTitle>Software</LinkTitle>
            <LinkItem href="#software">Web Platforms</LinkItem>
            <LinkItem href="#software">Mobile Apps</LinkItem>
            <LinkItem href="#software">SaaS &amp; Systems</LinkItem>
            <LinkItem href="#software">API &amp; DevOps</LinkItem>
          </LinkColumn>

          <LinkColumn>
            <LinkTitle>Marketing</LinkTitle>
            <LinkItem href="#tech">Digital Strategy</LinkItem>
            <LinkItem href="#tech">Paid Ads</LinkItem>
            <LinkItem href="#tech">SEO &amp; Content</LinkItem>
            <LinkItem href="#tech">CRO &amp; Analytics</LinkItem>
          </LinkColumn>

          <LinkColumn>
            <LinkTitle>Products</LinkTitle>
            {softwareProjects.map(({ id, name, url }) => (
              <LinkItem
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name} ↗
              </LinkItem>
            ))}
          </LinkColumn>

          <LinkColumn>
            <LinkTitle>Company</LinkTitle>
            <LinkItem href="#about">About</LinkItem>
            <LinkItem href="#projects">Projects</LinkItem>
            <LinkItem href="#approach">Pricing</LinkItem>
            <LinkItem href="#faq">FAQ</LinkItem>
            <LinkItem href="#contact">Get a Quote</LinkItem>
          </LinkColumn>
        </LinkList>
      </FooterTop>

      {/* Address / hours strip */}
      <ContactLine>
        <span className="label">Available to new projects</span>
        <span className="dot" aria-hidden="true" />
        <span>First reply within {siteConfig.responseTime.toLowerCase()}</span>
        <span className="sep" aria-hidden="true">|</span>
        <span>Sun – Thu · 9:00 – 18:00 (GMT+2)</span>
      </ContactLine>

      {/* Bottom row */}
      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} Taxi Digital Solutions. All rights
          reserved.
        </Copyright>

        <SocialContainer>
          {socials.map(({ Icon, href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.22, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 14 }}
            >
              <SocialIcons
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size="24px" />
              </SocialIcons>
            </motion.div>
          ))}
        </SocialContainer>
                    </FooterBottom>

                    {/* Legal row */}
                    <LegalRow>
                      <span>Built in Cairo, shipped worldwide.</span>
                      <LegalLink href="#faq">FAQ</LegalLink>
                      <LegalLink href="#contact">Contact</LegalLink>
                      <LegalLink href="#approach">Pricing</LegalLink>
                      <LegalLink
                        href={siteConfig.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </LegalLink>
                    </LegalRow>
                  </FooterInner>
               </FooterWrapper>
              );

export default Footer;
