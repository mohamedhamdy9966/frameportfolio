'use client';
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import {
  MdOutlineCampaign,
  MdOutlineAnalytics,
  MdOutlinePalette,
  MdOutlineEmail,
  MdOutlineSearch,
  MdOutlineAutoAwesome,
} from "react-icons/md";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
  IconWrapper,
  CardRule,
} from "./TechnologiesStyles";

const services = [
  {
    Icon: MdOutlineCampaign,
    title: "Digital Strategy",
    text: "Full-funnel campaigns built on data — from audience research to conversion.",
    delay: 0,
  },
  {
    Icon: MdOutlineAnalytics,
    title: "Performance Ads",
    text: "Paid social & SEM that lowers CAC and maximises pipeline ROI.",
    delay: 0.1,
  },
  {
    Icon: MdOutlineSearch,
    title: "SEO & Content",
    text: "Organic growth engines — keyword strategy, content systems, backlinks.",
    delay: 0.2,
  },
  {
    Icon: MdOutlinePalette,
    title: "Brand Identity",
    text: "Visual identity & messaging that makes your brand impossible to ignore.",
    delay: 0.3,
  },
  {
    Icon: MdOutlineEmail,
    title: "Email & CRM",
    text: "Lifecycle automation that nurtures leads and drives repeat revenue.",
    delay: 0.4,
  },
  {
    Icon: MdOutlineAutoAwesome,
    title: "CRO & Analytics",
    text: "A/B testing and analytics dashboards to continuously improve results.",
    delay: 0.5,
  },
];

const Technologies = () => {
  const ref      = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /* ── GSAP title ── */
  useEffect(() => {
    if (!isInView) return;
    gsap.fromTo(titleRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [isInView]);

  const cardVariants = {
    hidden:  { opacity: 0, y: 50 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <Section id="tech" ref={ref}>
      <SectionDivider />
      <div ref={titleRef}>
        <SectionTitle>Our Services</SectionTitle>
        <SectionText>
          Everything your brand needs to accelerate — under one roof.
        </SectionText>
      </div>

      <List>
        {services.map(({ Icon, title, text, delay }) => (
          <motion.div
            key={title}
            custom={delay}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <ListItem>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <IconWrapper>
                  <Icon size="2.8rem" />
                </IconWrapper>
              </motion.div>
              <ListContainer>
                <ListTitle>{title}</ListTitle>
                <CardRule />
                <ListParagraph>{text}</ListParagraph>
              </ListContainer>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Section>
  );
};

export default Technologies;
