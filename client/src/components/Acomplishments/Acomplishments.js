'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { Section, SectionDivider, SectionTitle, SectionText } from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";

const data = [
  { number: 200,   text: "Campaigns Delivered", suffix: "+"  },
  { number: 150,   text: "Happy Clients",        suffix: "+"  },
  { number: 50000, text: "Leads Generated",      suffix: "+"  },
  { number: 300,   text: "Average ROI",          suffix: "%"  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const boxVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Acomplishments = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [counts, setCounts] = useState(data.map(() => 0));
  const hasAnimated = useRef(false);

  /* ── GSAP title reveal ── */
  useEffect(() => {
    if (!isInView) return;
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [isInView]);

  /* ── GSAP count-up ── */
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    data.forEach((item, index) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: item.number,
        duration: 2.2,
        ease: "power2.out",
        delay: index * 0.15 + 0.3,
        onUpdate() {
          setCounts((prev) => {
            const next = [...prev];
            next[index] = Math.floor(obj.val);
            return next;
          });
        },
      });
    });
  }, [isInView]);

  return (
    <Section ref={sectionRef}>
      <SectionDivider />
      <div ref={titleRef}>
        <SectionTitle>Our Impact</SectionTitle>
        <SectionText>
          Numbers that prove Taxi delivers. Every metric, earned.
        </SectionText>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Boxes>
          {data.map((card, index) => (
            <motion.div key={index} variants={boxVariants}>
              <Box>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BoxNum>
                    {counts[index].toLocaleString()}{card.suffix || ''}
                  </BoxNum>
                  <BoxText>{card.text}</BoxText>
                </motion.div>
              </Box>
            </motion.div>
          ))}
        </Boxes>
      </motion.div>
    </Section>
  );
};

export default Acomplishments;