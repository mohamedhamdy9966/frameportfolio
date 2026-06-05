"use client";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize};

  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${(p) => p.theme.fonts.main};
    font-size: 1.6rem;
    background: ${(p) => p.theme.colors.background1};
    color: ${(p) => p.theme.colors.primary1};
    cursor: default;
    overflow-x: hidden;
    position: relative;

    /* Subtle grid overlay */
    &::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,193,7,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,193,7,0.035) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    }

    /* Radial ambient glow */
    &::after {
      content: '';
      position: fixed;
      top: -20%;
      left: -10%;
      width: 70vw;
      height: 70vh;
      background: radial-gradient(ellipse at center, rgba(255,193,7,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
  }

  h1, h2, h3, h4, h5, h6, button {
    font-family: ${(p) => p.theme.fonts.title};
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${(p) => p.theme.colors.background2}; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FFC107 0%, #FF8C00 100%);
    border-radius: 999px;
  }

  /* Reveal animation utility */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Selection colour */
  ::selection {
    background: rgba(255,193,7,0.35);
    color: #fff;
  }
`;

export default GlobalStyles;
