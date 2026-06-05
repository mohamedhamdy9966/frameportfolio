"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";
import {
  Container,
  Div1,
  Div2,
  Div3,
  SocialIcons,
  NavLink,
} from "./HeaderStyles";

const Header = () => {
  const linkVariants = {
    hover: { scale: 1.1, color: "#FFC107", transition: { duration: 0.2 } },
  };

  return (
    <Container>
      <Div1>
        <Link href="/" legacyBehavior>
          <motion.a
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: "20",
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <DiCssdeck size="3rem" style={{ color: "#FFC107" }} />
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Taxi</span>
          </motion.a>
        </Link>
      </Div1>
      <Div2>
        <motion.li variants={linkVariants} whileHover="hover">
          <NavLink href="#projects">Projects</NavLink>
        </motion.li>
        <motion.li variants={linkVariants} whileHover="hover">
          <NavLink href="#tech">Technologies</NavLink>
        </motion.li>
        <motion.li variants={linkVariants} whileHover="hover">
          <NavLink href="#about">About</NavLink>
        </motion.li>
      </Div2>
      <Div3>
        <SocialIcons href="https://facebook.com">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <AiFillFacebook size="3rem" />
          </motion.div>
        </SocialIcons>
        <SocialIcons href="https://linkedin.com">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <AiFillLinkedin size="3rem" />
          </motion.div>
        </SocialIcons>
        <SocialIcons href="https://instagram.com">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <AiFillInstagram size="3rem" />
          </motion.div>
        </SocialIcons>
      </Div3>
    </Container>
  );
};

export default Header;
