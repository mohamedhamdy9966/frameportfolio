'use client';
import React from "react";
import { motion } from "framer-motion";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { SocialIcons } from "../Header/HeaderStyles";
import {
  FooterWrapper,
  FooterInner,
  FooterTop,
  FooterBottom,
  BrandColumn,
  BrandName,
  Slogan,
  LinkList,
  LinkColumn,
  LinkTitle,
  LinkItem,
  Copyright,
  SocialContainer,
} from "./FooterStyles";

const socials = [
  { Icon: AiFillFacebook,  href: "https://facebook.com",  label: "Facebook"  },
  { Icon: AiFillLinkedin,  href: "https://linkedin.com",  label: "LinkedIn"  },
  { Icon: AiFillInstagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => (
  <FooterWrapper>
    <FooterInner>
      <FooterTop>
        {/* Brand column */}
        <BrandColumn>
          <BrandName>TAXI</BrandName>
          <Slogan>
            Accelerating brands through data-driven marketing.
            Fast results. Measurable growth.
          </Slogan>
        </BrandColumn>

        {/* Link columns */}
        <LinkList>
          <LinkColumn>
            <LinkTitle>Contact</LinkTitle>
            <LinkItem href="tel:01207226094">01207226094</LinkItem>
            <LinkItem href="mailto:info@taxi.com">info@taxi.com</LinkItem>
          </LinkColumn>
          <LinkColumn>
            <LinkTitle>Services</LinkTitle>
            <LinkItem href="#tech">Digital Strategy</LinkItem>
            <LinkItem href="#tech">Paid Ads</LinkItem>
            <LinkItem href="#tech">SEO & Content</LinkItem>
          </LinkColumn>
          <LinkColumn>
            <LinkTitle>Company</LinkTitle>
            <LinkItem href="#about">About</LinkItem>
            <LinkItem href="#projects">Projects</LinkItem>
            <LinkItem href="#projects">Case Studies</LinkItem>
          </LinkColumn>
        </LinkList>
      </FooterTop>

      {/* Bottom row */}
      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} Taxi Digital Solutions Agency. All rights reserved.
        </Copyright>

        <SocialContainer>
          {socials.map(({ Icon, href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 14 }}
            >
              <SocialIcons href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size="2.6rem" />
              </SocialIcons>
            </motion.div>
          ))}
        </SocialContainer>
      </FooterBottom>
    </FooterInner>
  </FooterWrapper>
);

export default Footer;
