'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import {
  BlogCard,
  CardBody,
  ImgWrapper,
  ExternalLinks,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  TitleContent,
  UtilityList,
  CardInfo,
  Img,
} from "./ProjectsStyles";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { projects } from "../../constants/constants";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const gridRef    = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── GSAP title reveal ── */
  useEffect(() => {
    if (!isInView) return;
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [isInView]);

  /* ── Framer variants ── */
  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden:  { opacity: 0, y: 60, scale: 0.94 },
    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Section nopadding id="projects" ref={sectionRef}>
      <div style={{ padding: "40px 48px 0" }} ref={titleRef}>
        <SectionDivider />
        <SectionTitle main>Projects</SectionTitle>
      </div>

      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ padding: "0 48px" }}
      >
        <GridContainer>
          {projects.map(({ id, image, title, description, tags, source, visit }) => (
            <motion.div key={id} variants={cardVariants}>
              <BlogCard>
                {/* Image with zoom on hover */}
                <ImgWrapper>
                  <Img src={image} alt={title} />
                </ImgWrapper>

                <CardBody>
                  <TitleContent>
                    <HeaderThree $title>{title}</HeaderThree>
                    <Hr />
                  </TitleContent>

                  <CardInfo>{description}</CardInfo>

                  <TagList>
                    {tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>

                  <UtilityList>
                    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <ExternalLinks href={visit} target="_blank" rel="noopener noreferrer">
                        Case Study →
                      </ExternalLinks>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <ExternalLinks href={source} target="_blank" rel="noopener noreferrer">
                        Website ↗
                      </ExternalLinks>
                    </motion.li>
                  </UtilityList>
                </CardBody>
              </BlogCard>
            </motion.div>
          ))}
        </GridContainer>
      </motion.div>
    </Section>
  );
};

export default Projects;