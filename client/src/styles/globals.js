"use client";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${(props) => props.theme.colors.background1};
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
    position: relative;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(45deg, ${(props) => props.theme.colors.checkerLight} 25%, transparent 25%),
        linear-gradient(-45deg, ${(props) => props.theme.colors.checkerLight} 25%, transparent 25%);
      background-size: 40px 40px;
      background-position: 0 0, 0 20px;
      pointer-events: none;
      z-index: 0;
      opacity: 0.3;
    }
  }
  
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  
  a {
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background2};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.accent1};
    border-radius: 4px;
  }
  
  /* Reveal animations */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default GlobalStyles;
