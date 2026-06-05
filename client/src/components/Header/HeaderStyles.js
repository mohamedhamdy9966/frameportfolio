import styled, { keyframes } from "styled-components";
import { IoIosArrowDropdown } from "react-icons/io";

const moveStripe = keyframes`
  0%   { background-position: 0 0; }
  100% { background-position: 60px 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 2px 16px rgba(255,193,7,0.3); }
  50%       { box-shadow: 0 2px 32px rgba(255,193,7,0.7); }
`;

/* ─── Wrapper ─────────────────────────────────────────── */
export const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  padding: 1.2rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(8, 8, 8, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 193, 7, 0.12);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(8, 8, 8, 0.95);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 56px);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    padding: 0.8rem 1rem;
  }
`;

/* ─── Sections ────────────────────────────────────────── */
export const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-area: 1 / 1 / 2 / 3;
  }
`;

export const Div2 = styled.div`
  grid-area: 1 / 2 / 2 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-area: 2 / 1 / 3 / 6;
    justify-content: space-around;
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-area: 1 / 4 / 2 / 6;
    justify-content: flex-end;
  }
`;

/* ─── Navigation Links ────────────────────────────────── */
export const NavLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  white-space: nowrap;

  &:hover {
    color: #FFC107;
    background: rgba(255, 193, 7, 0.08);
    border-color: rgba(255, 193, 7, 0.25);
    cursor: pointer;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  }
`;

/* ─── CTA Pill ─────────────────────────────────────────── */
export const CtaLink = styled.a`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: linear-gradient(90deg, #FFC107, #FF8C00);
  padding: 0.7rem 1.6rem;
  border-radius: 999px;
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.4);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 0 30px rgba(255, 193, 7, 0.75);
    transform: translateY(-1px);
    cursor: pointer;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }
`;

/* ─── Social Icons ─────────────────────────────────────── */
export const SocialIcons = styled.a`
  transition: color 0.3s ease, transform 0.3s ease;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #FFC107;
    transform: scale(1.25) rotate(10deg);
    cursor: pointer;
  }
`;

/* ─── Dropdown ─────────────────────────────────────────── */
export const ContactDropDown = styled.button`
  border: none;
  display: flex;
  position: relative;
  background: none;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s ease;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;

  &:focus  { outline: none; }
  &:hover  { color: #FFC107; }
`;

export const NavProductsIcon = styled(IoIosArrowDropdown)`
  margin-left: 6px;
  align-self: center;
  transition: transform 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? "1" : ".65")};
  transform: ${({ isOpen }) => (isOpen ? "scaleY(-1)" : "scaleY(1)")};
`;

/* ─── Animated Taxi Strip ──────────────────────────────── */
export const CheckeredStrip = styled.div`
  width: 100%;
  height: 5px;
  background: repeating-linear-gradient(
    90deg,
    #FFC107 0px,
    #FFC107 20px,
    #FF8C00 20px,
    #FF8C00 22px,
    #0A0A0A 22px,
    #0A0A0A 42px
  );
  background-size: 60px 100%;
  animation: ${moveStripe} 1.2s linear infinite;
  animation: ${glow} 2s ease-in-out infinite, ${moveStripe} 1.4s linear infinite;
`;
