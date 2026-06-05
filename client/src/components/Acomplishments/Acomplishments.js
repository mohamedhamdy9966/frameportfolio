'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";

const data = [
  { number: 200, text: "Successful Campaigns" },
  { number: 150, text: "Happy Clients" },
  { number: 50000, text: "Leads Generated", suffix: "+" },
  { number: 300, text: "ROI Achieved (%)", suffix: "%" },
];

const Acomplishments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counts, setCounts] = useState(data.map(() => 0));

  useEffect(() => {
    if (isInView) {
      data.forEach((item, index) => {
        gsap.to({ val: 0 }, {
          val: item.number,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(this.targets()[0].val);
              return newCounts;
            });
          }
        });
      });
    }
  }, [isInView]);

  return (
    <Section ref={ref}>
      <SectionDivider />
      <SectionTitle>Our Impact</SectionTitle>
      <Boxes>
        {data.map((card, index) => (
          <Box key={index}>
            <BoxNum>
              {counts[index]}
              {card.suffix || ''}
            </BoxNum>
            <BoxText>{card.text}</BoxText>
          </Box>
        ))}
      </Boxes>
    </Section>
  );
};

export default Acomplishments;