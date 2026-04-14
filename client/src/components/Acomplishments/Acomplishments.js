'use client';
import React from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";

const data = [
  { number: 200, text: "Successful Campaigns" },
  { number: 150, text: "Happy Clients" },
  { number: 50000, text: "Leads Generated" },
  { number: 300, text: "ROI Achieved (%)" },
];

const Acomplishments = () => (
  <Section>
    <SectionDivider />
    <SectionTitle>Our Impact</SectionTitle>
    <Boxes>
      {data.map((card, index) => (
        <Box key={index}>
          <BoxNum>{card.number}</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Acomplishments;
