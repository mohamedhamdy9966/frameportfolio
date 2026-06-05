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
  gap: 56px;
  list-style: none;

  @media ${(p) => p.theme.breakpoints.md} {
    gap: 32px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    gap: 24px;
    flex-wrap: wrap;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
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

  @media ${(p) => p.theme.breakpoints.sm} {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
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
  gap: 8px;
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
