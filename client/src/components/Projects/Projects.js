'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BlogCard,
  CardInfo,
  ExternalLinks,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  TitleContent,
  UtilityList,
  Img,
} from "./ProjectsStyles";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { projects } from "../../constants/constants";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Section nopadding id="projects" ref={ref}>
      <SectionDivider />
      <SectionTitle main>Projects</SectionTitle>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <GridContainer>
          {projects.map(({ id, image, title, description, tags, source, visit }) => (
            <motion.div key={id} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
              <BlogCard>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Img src={image} />
                </motion.div>
                <TitleContent>
                  <HeaderThree title>{title}</HeaderThree>
                  <Hr />
                </TitleContent>
                <CardInfo>{description}</CardInfo>
                <div>
                  <TitleContent>Services</TitleContent>
                  <TagList>
                    {tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </div>
                <UtilityList>
                  <ExternalLinks 
                    href={visit}
                    whileHover={{ scale: 1.1, backgroundColor: "#FFC107", color: "#0A0A0A" }}
                    transition={{ duration: 0.2 }}
                  >
                    Case Study
                  </ExternalLinks>
                  <ExternalLinks 
                    href={source}
                    whileHover={{ scale: 1.1, backgroundColor: "#FFC107", color: "#0A0A0A" }}
                    transition={{ duration: 0.2 }}
                  >
                    Website
                  </ExternalLinks>
                </UtilityList>
              </BlogCard>
            </motion.div>
          ))}
        </GridContainer>
      </motion.div>
    </Section>
  );
};

export default Projects;