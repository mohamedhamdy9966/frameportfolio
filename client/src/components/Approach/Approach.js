"use client";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  MdOutlineAnalytics,
  MdOutlineAutoAwesome,
  MdOutlineCampaign,
  MdOutlineCheck,
  MdOutlineEmail,
  MdOutlinePalette,
  MdOutlineSearch,
} from "react-icons/md";
import { engagementModels, softwareProcess } from "../../constants/constants";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  Caveat,
  DivisionCopy,
  DivisionIntro,
  DivisionMiniStats,
  MiniStat,
  ModelCard,
  ModelTabs,
  ModelText,
  ModelTitle,
  PlanBadge,
  PlanBestFor,
  PlanBilling,
  PlanCard,
  PlanCta,
  PlanFeature,
  PlanFeatures,
  PlanGrid,
  PlanName,
  PlanPrice,
  PlanTagline,
  ProcessCard,
  ProcessGrid,
  ProcessNum,
  ProcessText,
  ProcessTitle,
} from "./ApproachStyles";

/* The service list is mirrored in the Technologies section, but
   rendered here as a compact “model” overview next to the numbers. */
const modelHighlights = [
  {
    Icon: MdOutlineCampaign,
    title: "Marketing stays in scope",
    text: "Ads, SEO and lifecycle email sit in the same roadmap as product work, so launches are never blocked on traffic.",
  },
  {
    Icon: MdOutlineAnalytics,
    title: "Numbers are contractual",
    text: "Every engagement defines the metric it is judged on before the first sprint — impressions are not a deliverable.",
  },
  {
    Icon: MdOutlineSearch,
    title: "Built to be found",
    text: "Technical SEO, schema and page speed are part of the build, not a phase-two bolt-on.",
  },
  {
    Icon: MdOutlinePalette,
    title: "Design that sells",
    text: "Interfaces are designed against conversion goals, with the brand system documented for your team.",
  },
  {
    Icon: MdOutlineEmail,
    title: "Lifecycle ownership",
    text: "We wire CRM, email and notification flows into the product so retention is measurable from week one.",
  },
  {
    Icon: MdOutlineAutoAwesome,
    title: "Continuous improvement",
    text: "Post-launch CRO experiments and analytics reviews are scheduled, not left to die in a backlog.",
  },
];

const Approach = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    gsap.fromTo(
      headRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
    );
  }, [isInView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 42, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section id="approach" ref={sectionRef}>
      <SectionDivider />
      <div ref={headRef}>
        <SectionTitle main>How We Work</SectionTitle>
        <SectionText>
          Three engagement models, one delivery process. Pick the model that
          matches where you are, then we run the same five stages every time.
        </SectionText>
      </div>

      {/* ── Engagement models ── */}
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <PlanGrid>
          {engagementModels.map((model) => (
            <motion.div
              key={model.id}
              variants={cardVariants}
              style={{ display: "flex" }}
            >
              <PlanCard $highlighted={model.highlighted}>
                {model.highlighted && <PlanBadge>Most popular</PlanBadge>}
                <PlanName>{model.name}</PlanName>
                <PlanTagline>{model.tagline}</PlanTagline>
                <PlanPrice>
                  {model.priceFrom}
                  <PlanBilling>{model.billing}</PlanBilling>
                </PlanPrice>
                <PlanBestFor>Best for: {model.bestFor}</PlanBestFor>
                <PlanFeatures>
                  {model.features.map((feature) => (
                    <PlanFeature key={feature}>
                      <MdOutlineCheck size="1.6rem" aria-hidden="true" />
                      {feature}
                    </PlanFeature>
                  ))}
                </PlanFeatures>
                <PlanCta
                  href="#contact"
                  className={model.highlighted ? "solid" : "ghost"}
                >
                  Request a quote
                </PlanCta>
              </PlanCard>
            </motion.div>
          ))}
        </PlanGrid>
      </motion.div>

      <Caveat>
        Indicative pricing in EGP. Final scope and cost are confirmed in writing
        before any work starts.
      </Caveat>

      {/* ── Delivery process ── */}
      <ProcessGrid>
        {softwareProcess.map(({ step, title, text }, index) => (
          <motion.div
            key={step}
            style={{ display: "flex" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <ProcessCard>
              <ProcessNum>{step}</ProcessNum>
              <ProcessTitle>{title}</ProcessTitle>
              <ProcessText>{text}</ProcessText>
            </ProcessCard>
          </motion.div>
        ))}
      </ProcessGrid>

      {/* ── What stays in scope ── */}
      <DivisionIntro>
        <DivisionCopy>
          <h3>One team across product and growth</h3>
          <p>
            Most projects we inherit failed at the hand-off, not at the build.
            Because the same team owns the platform and the demand flowing into
            it, nothing gets lost between a media agency and a dev shop.
          </p>
        </DivisionCopy>
        <DivisionMiniStats>
          <MiniStat>
            <span className="value">100%</span>
            <span className="label">Code &amp; accounts in your name</span>
          </MiniStat>
          <MiniStat>
            <span className="value">&lt; 24h</span>
            <span className="label">Reply to every enquiry</span>
          </MiniStat>
        </DivisionMiniStats>
      </DivisionIntro>

      <ModelTabs>
        {modelHighlights.map(({ Icon, title, text }) => (
          <ModelCard key={title}>
            <Icon size="2rem" aria-hidden="true" />
            <ModelTitle>{title}</ModelTitle>
            <ModelText>{text}</ModelText>
          </ModelCard>
        ))}
      </ModelTabs>
    </Section>
  );
};

export default Approach;
