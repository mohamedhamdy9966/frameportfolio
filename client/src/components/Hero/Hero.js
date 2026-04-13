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
      <Button onClick={() => (window.location = "https://facebook.com")}>
        Learn More
      </Button>
    </LeftSection>
  </Section>
);

export default Hero;
