'use client';
import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = () => (
  <Section>
    <LeftSection>
      <SectionTitle main center>
        Welcome to <br />
        Taxi Marketing Agency
      </SectionTitle>
      <SectionText>Accelerating your brand's journey with data-driven marketing strategies.</SectionText>
      <Button
        onClick={() => {
          const el = document.getElementById('about') || document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Get a Free Audit
      </Button>
    </LeftSection>
  </Section>
);

export default Hero;
