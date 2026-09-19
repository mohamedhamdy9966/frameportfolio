import styled, { keyframes } from "styled-components";

const moveStripe = keyframes`
  0%   { background-position: 0 0; }
  100% { background-position: 60px 0; }
`;

/* ─── Main wrapper ──────────────────────────────────────── */
export const FooterWrapper = styled.footer`
  width: 100%;
  background: rgba(6, 6, 6, 0.97);
  border-top: 1px solid rgba(255, 193, 7, 0.12);
  margin-top: 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: repeating-linear-gradient(
      90deg,
      #FFC107 0px, #FFC107 20px,
      #0A0A0A 20px, #0A0A0A 40px
    );
    background-size: 60px 100%;
    animation: ${moveStripe} 1.8s linear infinite;
  }
`;

export const FooterInner = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 56px 48px 72px;

  @media ${(p) => p.theme.breakpoints.md} {
    padding: 40px 32px 64px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 32px 16px 56px;
  }
`;

/* ─── Top row ───────────────────────────────────────────── */
export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 40px;

  @media ${(p) => p.theme.breakpoints.md} {
    flex-direction: column;
    gap: 24px;
  }
`;

export const BrandColumn = styled.div`
  max-width: 320px;
`;

export const Slogan = styled.p`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.5rem;
  line-height: 1.7;
  margin-top: 12px;
  letter-spacing: 0.01em;

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.3rem;
  }
`;

export const SloganMini = styled.p`
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-top: 10px;
  letter-spacing: 0.03em;
`;

/* Live-status strip between the link columns and the bottom row */
export const ContactLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px 0;
  margin-bottom: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 1.25rem;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.45);

  .label {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 1.05rem;
    color: #FFC107;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FFC107;
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.8);
  }

  .sep {
    color: rgba(255, 255, 255, 0.15);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    gap: 8px;
    font-size: 1.15rem;

    .sep { display: none; }
  }
`;

export const BrandName = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  background: linear-gradient(90deg, #FFC107, #FF8C00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 2.2rem;
  }
`;

/* ─── Link columns ──────────────────────────────────────── */
export const LinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  list-style: none;

  @media ${(p) => p.theme.breakpoints.lg} {
    gap: 36px;
  }
  @media ${(p) => p.theme.breakpoints.md} {
    gap: 28px;
  }
  /* Two even columns read better than a ragged wrap once the five link
     columns no longer fit on one row. */
  @media ${(p) => p.theme.breakpoints.sm} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 20px;
    width: 100%;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
  /* Allows long addresses and emails to wrap instead of forcing the
     column wider than its grid track. */
  min-width: 0;
  overflow-wrap: anywhere;

  @media ${(p) => p.theme.breakpoints.sm} {
    min-width: 0;
  }
`;

export const LinkTitle = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 16px;
`;

export const LinkItem = styled.a`
  font-size: 1.6rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 14px;
  transition: color 0.25s ease, transform 0.2s ease;
  display: inline-block;

  &:hover {
    color: #FFC107;
    transform: translateX(4px);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.4rem;
  }
`;

/* ─── Bottom row ────────────────────────────────────────── */
export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  /* Centred rather than stretch-aligned, so the social grid keeps its
     fixed max-width instead of being forced to the container edges. */
  @media ${(p) => p.theme.breakpoints.md} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 14px;
  }
`;

export const Copyright = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.03em;
`;

export const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;

  /*
    Ten icons at 30px plus gaps is roughly 400px of chrome. On a phone that
    previously wrapped into a ragged staircase inside a centred column, and
    on a tablet it squeezed the copyright onto two cramped lines.
    Below the tablet breakpoint the rail becomes an even 5-across grid so it
    reads as one block instead of a wrapped list.
  */
  @media ${(p) => p.theme.breakpoints.md} {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    justify-items: center;
    gap: 6px;
    width: 100%;
    max-width: 320px;
  }
`;

export const LegalRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.28);

  span:first-child { margin-right: auto; }

  @media ${(p) => p.theme.breakpoints.sm} {
    justify-content: center;
    text-align: center;
    font-size: 1.1rem;
    gap: 12px;

    span:first-child { margin-right: 0; }
  }
`;

export const LegalLink = styled.a`
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.25s ease;

  &:hover { color: #FFC107; }
`;

/* legacy alias used in Footer.js */
export const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1040px;

  @media ${(p) => p.theme.breakpoints.sm} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: auto;
`;
