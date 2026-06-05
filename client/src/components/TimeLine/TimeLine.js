"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import {
  CarouselButton,
  CarouselButtonDot,
  CarouselButtons,
  CarouselContainer,
  CarouselItem,
  CarouselItemImg,
  CarouselItemText,
  CarouselItemTitle,
  CarouselMobileScrollNode,
} from "./TimeLineStyles";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { TimeLineData } from "../../constants/constants";

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef  = useRef();
  const sectionRef   = useRef(null);
  const titleRef     = useRef(null);
  const isInView     = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── Carousel helpers ── */
  const scroll = (node, left) =>
    node.scrollTo({ left, behavior: "smooth" });

  const handleClick = (e, i) => {
    e.preventDefault();
    if (carouselRef.current) {
      const scrollLeft = Math.floor(
        carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length)
      );
      scroll(carouselRef.current, scrollLeft);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(
        (carouselRef.current.scrollLeft /
          (carouselRef.current.scrollWidth * 0.7)) *
          TimeLineData.length
      );
      setActiveItem(index);
    }
  };

  useEffect(() => {
    const handleResize = () => scroll(carouselRef.current, 0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── GSAP title ── */
  useEffect(() => {
    if (!isInView) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }
    );
  }, [isInView]);

  /* ── Framer item variants ── */
  const itemVariants = {
    hidden:  { opacity: 0, x: -40, y: 10 },
    visible: (i) => ({
      opacity: 1, x: 0, y: 0,
      transition: { delay: i * 0.12 + 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <Section id="about" ref={sectionRef}>
      <div ref={titleRef}>
        <SectionTitle>About Taxi</SectionTitle>
        <SectionText>
          From a bold idea in 2022 to a performance-driven agency trusted by 150+ clients —
          this is the Taxi story.
        </SectionText>
      </div>

      <CarouselContainer ref={carouselRef} onScroll={handleScroll}>
        {TimeLineData.map((item, index) => (
          <CarouselMobileScrollNode
            key={index}
            final={index === TOTAL_CAROUSEL_COUNT - 1}
          >
            <motion.div
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={itemVariants}
            >
              <CarouselItem
                index={index}
                id={`carousel__item-${index}`}
                active={activeItem}
                onClick={(e) => handleClick(e, index)}
              >
                <CarouselItemTitle>
                  {item.year}
                  <CarouselItemImg
                    width="208"
                    height="6"
                    viewBox="0 0 208 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.5 5.5C3.88071 5.5 5 4.38071 5 3V3.5L208 3.50002V2.50002L5 2.5V3C5 1.61929 3.88071 0.5 2.5 0.5C1.11929 0.5 0 1.61929 0 3C0 4.38071 1.11929 5.5 2.5 5.5Z"
                      fill="url(#taxi_linear)"
                      fillOpacity="0.6"
                    />
                    <defs>
                      <linearGradient
                        id="taxi_linear"
                        x1="0"
                        y1="0.5"
                        x2="208"
                        y2="0.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFC107" />
                        <stop offset="0.8" stopColor="#FF8C00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </CarouselItemImg>
                </CarouselItemTitle>
                <CarouselItemText>{item.text}</CarouselItemText>
              </CarouselItem>
            </motion.div>
          </CarouselMobileScrollNode>
        ))}
      </CarouselContainer>

      <CarouselButtons>
        {TimeLineData.map((item, index) => (
          <CarouselButton
            key={index}
            index={index}
            active={activeItem}
            onClick={(e) => handleClick(e, index)}
            type="button"
          >
            <CarouselButtonDot active={activeItem} index={index} />
          </CarouselButton>
        ))}
      </CarouselButtons>

      <SectionDivider />
    </Section>
  );
};

export default Timeline;
