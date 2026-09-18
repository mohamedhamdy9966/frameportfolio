"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { testimonials } from "../../constants/constants";
import {
  SliderShell,
  ArrowButton,
  QuoteCard,
  QuoteText,
  QuoteFooter,
  Author,
  Avatar,
  AuthorMeta,
  Dots,
  Dot,
  AutoplayToggle,
} from "./TestimonialsStyles";

const AUTOPLAY_MS = 7000;

const initials = (name) =>
  name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1);
      setIndex(
        ((next % testimonials.length) + testimonials.length) %
          testimonials.length,
      );
    },
    [index],
  );

  const goBy = useCallback((delta) => {
    setDirection(delta);
    setIndex(
      (prev) => (prev + delta + testimonials.length) % testimonials.length,
    );
  }, []);

  /* ── Autoplay, paused while the tab is hidden or the user hovers ── */
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!playing || hovered) return undefined;
    const id = setInterval(() => goBy(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, hovered, goBy]);

  /* ── Keyboard support when the slider has focus ── */
  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") goBy(-1);
    if (event.key === "ArrowRight") goBy(1);
  };

  const active = testimonials[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <Section id="testimonials" ref={sectionRef}>
      <SectionDivider />
      <SectionTitle main>Client Results</SectionTitle>
      <SectionText>
        Founders and marketing leads on what changed after we took over the
        platform and the pipeline behind it.
      </SectionText>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SliderShell
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <ArrowButton
            type="button"
            onClick={() => goBy(-1)}
            aria-label="Previous testimonial"
          >
            <MdOutlineChevronLeft size="2.6rem" />
          </ArrowButton>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flex: 1 }}
            >
              <QuoteCard>
                <QuoteText>{active.quote}</QuoteText>

                <QuoteFooter>
                  <Author>
                    <Avatar aria-hidden="true">{initials(active.name)}</Avatar>
                    <AuthorMeta>
                      <span className="name">{active.name}</span>
                      <span className="role">{active.role}</span>
                    </AuthorMeta>
                  </Author>

                  <Dots>
                    {testimonials.map((item, i) => (
                      <Dot
                        key={item.id}
                        type="button"
                        $active={i === index}
                        aria-label={`Go to testimonial ${i + 1}`}
                        aria-current={i === index}
                        onClick={() => go(i)}
                      />
                    ))}
                  </Dots>
                </QuoteFooter>
              </QuoteCard>
            </motion.div>
          </AnimatePresence>

          <ArrowButton
            type="button"
            onClick={() => goBy(1)}
            aria-label="Next testimonial"
          >
            <MdOutlineChevronRight size="2.6rem" />
          </ArrowButton>
        </SliderShell>
      </motion.div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-3.6rem",
        }}
      >
        <AutoplayToggle
          type="button"
          onClick={() => setPlaying((prev) => !prev)}
          aria-pressed={playing}
        >
          {playing ? "Pause rotation" : "Play rotation"}
        </AutoplayToggle>
      </div>
    </Section>
  );
};

export default Testimonials;
