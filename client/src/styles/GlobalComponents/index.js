'use client';
import styled, { keyframes } from 'styled-components';

/* ─── Keyframes ──────────────────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
`;

/* ─── Layout ─────────────────────────────────────────── */
export const Section = styled.section`
  display: ${(p) => (p.grid ? 'grid' : 'flex')};
  flex-direction: ${(p) => (p.row ? 'row' : 'column')};
  padding: ${(p) => (p.nopadding ? '0' : '40px 48px 0')};
  margin: 0 auto;
  max-width: 1040px;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
  z-index: 1;

  @media ${(p) => p.theme.breakpoints.md} {
    padding: 24px 48px 0;
    flex-direction: column;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    padding: ${(p) => (p.nopadding ? '0' : '16px 16px 0')};
    width: calc(100vw - 32px);
    flex-direction: column;
  }
`;

/* ─── Typography ─────────────────────────────────────── */
export const SectionTitle = styled.h2`
  font-weight: 800;
  font-size: ${(p) => (p.main ? '68px' : '56px')};
  line-height: ${(p) => (p.main ? '76px' : '60px')};
  width: max-content;
  max-width: 100%;

  /* Taxi gold shimmer gradient */
  background: linear-gradient(
    120deg,
    #ffffff 20%,
    #FFC107 40%,
    #FF8C00 55%,
    #ffffff 75%,
    #FFC107 90%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  animation: ${shimmer} 5s linear infinite;

  margin-bottom: 16px;
  padding: ${(p) => (p.main ? '58px 0 16px' : '0')};

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: ${(p) => (p.main ? '52px' : '44px')};
    line-height: ${(p) => (p.main ? '58px' : '50px')};
    margin-bottom: 12px;
    padding: ${(p) => (p.main ? '40px 0 12px' : '0')};
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: ${(p) => (p.main ? '30px' : '32px')};
    line-height: ${(p) => (p.main ? '36px' : '40px')};
    margin-bottom: 8px;
    padding: ${(p) => (p.main ? '16px 0 8px' : '0')};
    max-width: 100%;
  }
`;

export const SectionText = styled.p`
  max-width: 800px;
  font-size: 22px;
  line-height: 38px;
  font-weight: 300;
  padding-bottom: 3.6rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.01em;

  @media ${(p) => p.theme.breakpoints.md} {
    max-width: 670px;
    font-size: 18px;
    line-height: 30px;
    padding-bottom: 24px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 15px;
    line-height: 24px;
    padding-bottom: 16px;
  }
`;

export const SectionSubText = styled.p`
  max-width: 800px;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.7);

  @media ${(p) => p.theme.breakpoints.md} {
    max-width: 672px;
    font-size: 16px;
    line-height: 26px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`;

/* ─── Divider ─────────────────────────────────────────── */
export const SectionDivider = styled.div`
  width: ${(p) => (p.colorAlt ? '100px' : '80px')};
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #FFC107 0%, #FF8C00 50%, #FFC107 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 3s linear infinite;
  margin: ${(p) => (p.divider ? '4rem 0' : '')};
  box-shadow: 0 0 14px rgba(255, 193, 7, 0.5);

  @media ${(p) => p.theme.breakpoints.md} {
    width: 60px;
    height: 3px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    width: 40px;
    height: 2px;
  }
`;

/* ─── Buttons ─────────────────────────────────────────── */
export const ButtonBack = styled.div`
  width: ${({ alt }) => (alt ? '150px' : '262px')};
  height: ${({ alt }) => (alt ? '52px' : '64px')};
  border-radius: 50px;
  font-size: ${({ alt }) => (alt ? '20px' : '24px')};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ alt, form }) => (alt || form ? '0' : '0 0 80px')};
  color: #0A0A0A;
  background: linear-gradient(270deg, #FFC107 0%, #FF8C00 100%);
  cursor: pointer;
  transition: 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
  box-shadow: 0 4px 24px rgba(255, 193, 7, 0.4);

  &:hover {
    box-shadow: 0 6px 32px rgba(255, 193, 7, 0.7);
    transform: translateY(-2px);
  }

  @media ${(p) => p.theme.breakpoints.md} {
    width: ${({ alt }) => (alt ? '150px' : '184px')};
    height: ${({ alt }) => (alt ? '52px' : '48px')};
    font-size: ${({ alt }) => (alt ? '20px' : '16px')};
    margin-bottom: ${({ alt }) => (alt ? '0' : '64px')};
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    width: 100%;
    height: 40px;
    font-size: 14px;
    margin-bottom: ${({ alt }) => (alt ? '0' : '32px')};
  }
`;

export const ButtonFront = styled.button`
  border: none;
  border-radius: 50px;
  color: #0A0A0A;
  font-weight: 700;
  display: flex;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, #FFC107 0%, #FF8C00 100%);
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
  transition: .4s ease;
  font-size: ${({ alt }) => (alt ? '20px' : '24px')};
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover  { opacity: 0; }
  &:focus  { outline: none; }
  &:active {
    opacity: 1;
    box-shadow: inset 0px 2px 4px rgba(0,0,0,0.3);
  }

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: ${({ alt }) => (alt ? '20px' : '16px')};
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 14px;
  }
`;

export const SecondaryBtn = styled.button`
  color: #FFF;
  background: none;
  border: 1px solid rgba(255, 193, 7, 0.4);
  border-radius: 999px;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 18px;
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 80px;
  cursor: pointer;
  transition: 0.3s ease;
  letter-spacing: 0.02em;

  &:focus  { outline: none; }
  &:hover  {
    color: #0A0A0A;
    background: #FFC107;
    border-color: #FFC107;
    box-shadow: 0 0 24px rgba(255,193,7,0.5);
  }
  &:active { background: #FF8C00; }

  @media ${(p) => p.theme.breakpoints.md} {
    margin-top: 24px;
    margin-bottom: 64px;
    font-size: 18px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    margin-top: 16px;
    margin-bottom: 40px;
    padding: 10px 20px;
    width: 100%;
    font-size: 14px;
  }
`;

/* ─── Links ───────────────────────────────────────────── */
export const LinkContainer = styled.div`
  margin-left: ${({ large }) => (large ? '24px' : '16px')};
  transition: 0.3s ease;
  border-radius: 50px;
  padding: 8px;

  &:hover {
    background-color: rgba(255,193,7,0.1);
    transform: scale(1.2);
    cursor: pointer;
  }

  @media ${(p) => p.theme.breakpoints.md} {
    margin-left: ${({ large }) => (large ? '16px' : '8px')};
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    margin-left: ${({ large }) => (large ? '0' : '8px')};
  }
`;

export const LinkIconImg = styled.div`
  display: flex;
  height: ${({ large }) => (large ? '32px' : '24px')};

  @media ${(p) => p.theme.breakpoints.md} {
    height: ${({ nav }) => (nav ? '16px' : '24px')};
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    height: ${({ large }) => (large ? '32px' : '16px')};
  }
`;
