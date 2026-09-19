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
  /*
    The social rail sizes to its content rather than taking an equal fifth
    of the row. Forcing it into an equal fraction previously squeezed ten
    icons into a narrow column where they overflowed the viewport and pushed
    the mobile menu button out of reach.
  */
  grid-template-columns: auto minmax(0, 1fr) auto;
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
  /* A sticky bar must never be the thing that widens the document. */
  max-width: 100vw;

  &:hover {
    background: rgba(8, 8, 8, 0.95);
  }

  @media ${(p) => p.theme.breakpoints.lg} {
    grid-column-gap: 1.2rem;
    padding: 1.2rem 1.6rem;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-rows: auto;
    grid-column-gap: 0.8rem;
    grid-row-gap: 0.6rem;
    padding: 0.8rem 1rem;
  }
`;

/* ─── Sections ────────────────────────────────────────── */
export const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

export const Div2 = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  @media ${(p) => p.theme.breakpoints.lg} {
    gap: 0.4rem;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    /* Nav drops to its own full-width row so it can never compete with the
       logo or the social rail for horizontal space. */
    grid-area: 2 / 1 / 3 / 4;
    justify-content: space-between;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-area: 1 / 3 / 2 / 4;
    justify-content: flex-end;
    gap: 0;
  }
`;

/**
 * Desktop-only slice of the social rail.
 *
 * Ten icons is roughly 340px of chrome. Showing all of them in the bar
 * squeezes the nav on tablets, so the rail progressively reveals them as
 * space allows and the mobile sheet carries the complete list instead.
 */
export const SocialDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  /* Below 1280px only the six core networks stay in the bar. */
  @media ${(p) => p.theme.breakpoints.xl} {
    & > *:nth-child(n + 7) {
      display: none;
    }
  }

  /* Below 1024px trim to four — the nav needs the room more than the rail. */
  @media ${(p) => p.theme.breakpoints.lg} {
    & > *:nth-child(n + 5) {
      display: none;
    }
  }

  /* Phones use the menu sheet, which lists every network. */
  @media ${(p) => p.theme.breakpoints.sm} {
    display: none;
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

  @media ${(p) => p.theme.breakpoints.lg} {
    font-size: 1.3rem;
    padding: 0.5rem 0.9rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.15rem;
    padding: 0.4rem 0.7rem;
    letter-spacing: 0.03em;
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

  @media ${(p) => p.theme.breakpoints.lg} {
    font-size: 1.25rem;
    padding: 0.6rem 1.2rem;
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
  /* Never let a flex parent squash the tap target. */
  flex: 0 0 auto;
  line-height: 0;

  &:hover {
    color: #FFC107;
    transform: scale(1.25) rotate(10deg);
    cursor: pointer;
  }

  /* Pointer devices get the playful scale; touch devices should not
     translate a tap into a 1.25x layout shift mid-gesture. */
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

/* ─── Dropdown ─────────────────────────────────────────── */
export const NavLinkActive = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #FFC107;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 193, 7, 0.35);
  background: rgba(255, 193, 7, 0.1);
  white-space: nowrap;

  @media ${(p) => p.theme.breakpoints.lg} {
    font-size: 1.3rem;
    padding: 0.5rem 0.9rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.15rem;
    padding: 0.4rem 0.7rem;
    letter-spacing: 0.03em;
  }
`;

/* Services dropdown (desktop) */
export const ServicesTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $open }) => ($open ? '#FFC107' : 'rgba(255, 255, 255, 0.7)')};
  background: ${({ $open }) => ($open ? 'rgba(255, 193, 7, 0.08)' : 'transparent')};
  border: 1px solid ${({ $open }) => ($open ? 'rgba(255, 193, 7, 0.25)' : 'transparent')};
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;

  &:hover {
    color: #FFC107;
    background: rgba(255, 193, 7, 0.08);
    border-color: rgba(255, 193, 7, 0.25);
  }

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    display: none;
  }
`;

export const ServicesMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  padding: 10px;
  border-radius: 16px;
  background: rgba(10, 10, 10, 0.98);
  border: 1px solid rgba(255, 193, 7, 0.2);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
  z-index: 1200;
`;

export const ServicesItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover { background: rgba(255, 193, 7, 0.08); }

  .icon {
    color: #FFC107;
    font-size: 2rem;
    line-height: 1;
    display: flex;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .body { display: flex; flex-direction: column; gap: 2px; }

  .title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.01em;
  }

  .desc {
    font-size: 1.1rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.45);
  }
`;

/* Mobile menu */
export const MenuToggle = styled.button`
  display: none;
  cursor: pointer;

  @media ${(p) => p.theme.breakpoints.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    color: #FFC107;
    background: rgba(255, 193, 7, 0.08);
    border: 1px solid rgba(255, 193, 7, 0.25);
  }
`;

export const MobileSheet = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1300;
  background: rgba(6, 6, 6, 0.98);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  padding: 20px 20px 32px;
  overflow-y: auto;
`;

export const MobileSheetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    color: #FFC107;
    background: rgba(255, 193, 7, 0.08);
    border: 1px solid rgba(255, 193, 7, 0.3);
  }
`;

export const MobileGroupLabel = styled.p`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin: 22px 0 10px;
`;

export const MobileLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 4px;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  span { color: #FFC107; }

  &:active { color: #FFC107; }
`;

export const MobileCta = styled.a`
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: 999px;
  font-size: 1.7rem;
  font-weight: 800;
  color: #0A0A0A;
  background: linear-gradient(90deg, #FFC107, #FF8C00);
  box-shadow: 0 6px 26px rgba(255, 193, 7, 0.4);
`;

export const MobileSocials = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

/* Dropdown */
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
