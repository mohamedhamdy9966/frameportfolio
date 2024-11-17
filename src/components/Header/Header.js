import Link from "next/link";
import React from "react";
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
} from "./HeaderStyles";

const Header = () => (
  <Container>
    <Div1>
      <Link href="/" legacyBehavior>
        <a
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            marginBottom: "20",
          }}
        >
          <DiCssdeck size="3rem" /> <span>Frame</span>
        </a>
      </Link>
    </Div1>
    <Div2>
      <li>
        <Link href="#projects" legacyBehavior>
          Projects
        </Link>
      </li>
      <li>
        <Link href="#tech" legacyBehavior>
          Technologies
        </Link>
      </li>
      <li>
        <Link href="#about" legacyBehavior>
          About
        </Link>
      </li>
    </Div2>
    <Div3>
      <SocialIcons href="https://facebook.com">
        <AiFillFacebook size="3rem" />
      </SocialIcons>
      <SocialIcons href="https://linkedin.com">
        <AiFillLinkedin size="3rem" />
      </SocialIcons>
      <SocialIcons href="https://instagram.com">
        <AiFillInstagram size="3rem" />
      </SocialIcons>
    </Div3>
  </Container>
);

export default Header;
