"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineArrowForward } from "react-icons/md";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { faqs, siteConfig } from "../../constants/constants";
import {
  FaqList,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
  FaqAnswerInner,
  FaqFooter,
} from "./FaqStyles";

const Faq = () => {
  // Accordion: one panel open at a time, first one open by default so the
  // section never looks like a bare list of questions.
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? -1 : index));

  return (
    <Section id="faq">
      <SectionDivider />
      <SectionTitle>Common Questions</SectionTitle>
      <SectionText>
        The things clients ask before signing. If yours is not here, ask us
        directly — we answer within {siteConfig.responseTime.toLowerCase()}.
      </SectionText>

      <FaqList>
        {faqs.map(({ q, a }, index) => {
          const isOpen = openIndex === index;

          return (
            <FaqItem key={q} data-open={isOpen}>
              <FaqQuestion
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                onClick={() => toggle(index)}
              >
                {q}
                <span className="toggle" aria-hidden="true">
                  +
                </span>
              </FaqQuestion>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <FaqAnswer
                    key="panel"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    as={motion.div}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FaqAnswerInner>{a}</FaqAnswerInner>
                  </FaqAnswer>
                )}
              </AnimatePresence>
            </FaqItem>
          );
        })}
      </FaqList>

      <FaqFooter>
        <p>
          Still weighing it up? Send a two-line brief and we will reply with
          scope and price.
        </p>
        <a href="#contact">
          Get a quote <MdOutlineArrowForward size="1.8rem" />
        </a>
      </FaqFooter>
    </Section>
  );
};

export default Faq;
