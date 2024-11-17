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
        Frame Agency
      </SectionTitle>
      <SectionText>All You need for Your Business</SectionText>
      <Button onClick={() => (window.location = "https://facebook.com")}>
        Learn More
      </Button>
    </LeftSection>
  </Section>
);

export default Hero;
