"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import {
  MdOutlineWeb,
  MdOutlinePhoneIphone,
  MdOutlineCloudQueue,
  MdOutlineShoppingCart,
  MdOutlineHub,
  MdOutlineSecurity,
  MdArrowOutward,
} from "react-icons/md";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  softwareProjects,
  softwareServices,
  softwareProcess,
} from "../../constants/constants";
import {
  BuildStats,
  BuildStat,
  ServiceGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceText,
  DeliverableList,
  Deliverable,
  ProductStack,
  ProductCard,
  ProductHead,
  ProductName,
  ProductType,
  ProductTagline,
  ProductDescription,
  FeatureGrid,
  FeatureItem,
  TechList,
  Tech,
  ProductActions,
  ProductLink,
  ProductAside,
  DeviceFrame,
  DeviceBody,
  SkeletonBar,
  SkeletonGrid,
  SkeletonTile,
  MetricRow,
  Metric,
  PlatformRow,
  ProcessTrack,
  ProcessStep,
  StepMarker,
  StepTitle,
  StepText,
  SubHeading,
} from "./SoftwareStyles";

/* Icon registry — keyed by the `icon` string in constants so the
   data file stays free of React imports. */
const iconMap = {
  web: MdOutlineWeb,
  mobile: MdOutlinePhoneIphone,
  saas: MdOutlineCloudQueue,
  commerce: MdOutlineShoppingCart,
  api: MdOutlineHub,
  cloud: MdOutlineSecurity,
};

/* Headline numbers for the software division. */
const buildStats = [
  { value: "3+", label: "Platforms shipped" },
  { value: "2", label: "Mobile app stores" },
  { value: "5", label: "Delivery stages" },
  { value: "2 weeks", label: "Release cadence" },
];

const Software = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── GSAP heading reveal, same idiom as the other sections ── */
  useEffect(() => {
    if (!isInView) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      headRef.current?.children || [],
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
    );
  }, [isInView]);

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 44, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section id="software" ref={sectionRef}>
      <div ref={headRef}>
        <SectionDivider />
        <SectionTitle main>Software Development</SectionTitle>
        <SectionText>
          We do not just market products — we build them. Web platforms, mobile
          apps and custom systems, engineered by an in-house team and shipped to
          real users.
        </SectionText>
      </div>

      {/* ── Headline build stats ── */}
      <BuildStats>
        {buildStats.map(({ value, label }) => (
          <BuildStat key={label}>
            <span className="value">{value}</span>
            <span className="label">{label}</span>
          </BuildStat>
        ))}
      </BuildStats>

      {/* ── Engineering services ── */}
      <SubHeading>
        <h3>What We Engineer</h3>
        <span>Six practices, one delivery team</span>
      </SubHeading>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <ServiceGrid>
          {softwareServices.map(({ id, title, icon, text, deliverables }) => {
            const Icon = iconMap[icon] || MdOutlineWeb;
            return (
              <motion.div
                key={id}
                variants={cardVariants}
                style={{ display: "flex" }}
              >
                <ServiceCard>
                  <ServiceIcon aria-hidden="true">
                    <Icon />
                  </ServiceIcon>
                  <ServiceTitle>{title}</ServiceTitle>
                  <ServiceText>{text}</ServiceText>
                  <DeliverableList>
                    {deliverables.map((item) => (
                      <Deliverable key={item}>{item}</Deliverable>
                    ))}
                  </DeliverableList>
                </ServiceCard>
              </motion.div>
            );
          })}
        </ServiceGrid>
      </motion.div>

      {/* ── Shipped products / platform case studies ── */}
      <SubHeading>
        <h3>Platforms We Shipped</h3>
        <span>Healthcare, e-learning and commerce — all live</span>
      </SubHeading>

      <ProductStack>
        {softwareProjects.map((project, index) => {
          const {
            id,
            name,
            type,
            url,
            accent,
            tagline,
            description,
            features,
            stack,
            platforms,
            metrics,
          } = project;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 56 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard $accent={accent}>
                <div>
                  <ProductHead>
                    <ProductName>{name}</ProductName>
                    <ProductType $accent={accent}>{type}</ProductType>
                  </ProductHead>

                  <ProductTagline>{tagline}</ProductTagline>
                  <ProductDescription>{description}</ProductDescription>

                  <FeatureGrid>
                    {features.map((feature) => (
                      <FeatureItem key={feature}>
                        <span className="tick">✓</span>
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeatureGrid>

                  <TechList aria-label={`${name} technology stack`}>
                    {stack.map((tech) => (
                      <Tech key={tech}>{tech}</Tech>
                    ))}
                  </TechList>

                  <ProductActions>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ProductLink
                        className="primary"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Live Site <MdArrowOutward size="1.6rem" />
                      </ProductLink>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ProductLink className="ghost" href="#contact">
                        Discuss a Similar Build
                      </ProductLink>
                    </motion.div>
                  </ProductActions>
                </div>

                <ProductAside>
                  {/* A miniature abstract UI, tinted with the product colour */}
                  <DeviceFrame $accent={accent} aria-hidden="true">
                    <DeviceBody>
                      <SkeletonBar $w="45%" $accent={accent} />
                      <SkeletonBar $w="72%" />
                      <SkeletonBar $w="60%" />
                      <SkeletonGrid>
                        <SkeletonTile $accent={accent} />
                        <SkeletonTile $accent={accent} />
                        <SkeletonTile $accent={accent} />
                        <SkeletonTile $accent={accent} />
                      </SkeletonGrid>
                    </DeviceBody>
                  </DeviceFrame>

                  <MetricRow>
                    {metrics.map(({ value, label }) => (
                      <Metric key={label} $accent={accent}>
                        <span className="value">{value}</span>
                        <span className="label">{label}</span>
                      </Metric>
                    ))}
                  </MetricRow>

                  <PlatformRow aria-label={`${name} platforms`}>
                    {platforms.map((platform) => (
                      <li key={platform}>{platform}</li>
                    ))}
                  </PlatformRow>
                </ProductAside>
              </ProductCard>
            </motion.div>
          );
        })}
      </ProductStack>

      {/* ── Delivery process ── */}
      <SubHeading>
        <h3>How We Deliver</h3>
        <span>Five stages from first call to production</span>
      </SubHeading>

      <ProcessTrack>
        {softwareProcess.map(({ step, title, text }, index) => (
          <motion.div
            key={step}
            style={{ display: "flex" }}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProcessStep>
              <StepMarker>{step}</StepMarker>
              <StepTitle>{title}</StepTitle>
              <StepText>{text}</StepText>
            </ProcessStep>
          </motion.div>
        ))}
      </ProcessTrack>
    </Section>
  );
};

export default Software;
