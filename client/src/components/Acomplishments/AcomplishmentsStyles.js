import styled, { keyframes } from "styled-components";

const countGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255,193,7,0.3); }
  50%       { text-shadow: 0 0 30px rgba(255,193,7,0.8), 0 0 60px rgba(255,193,7,0.3); }
`;

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255,193,7,0.12); }
  50%       { border-color: rgba(255,193,7,0.4); }
`;

export const Boxes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 24px 0 60px;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin: 20px 0 40px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 16px 0 32px;
  }
`;

export const Box = styled.div`
  position: relative;
  background: rgba(14, 14, 14, 0.92);
  border: 1px solid rgba(255, 193, 7, 0.15);
  border-radius: 16px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  animation: ${borderPulse} 4s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* Taxi gold corner dot */
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FFC107;
    box-shadow: 0 0 10px rgba(255,193,7,0.7);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,193,7,0.08);
  }

  @media ${(p) => p.theme.breakpoints.md} {
    padding: 20px 14px;
    border-radius: 12px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 16px 10px;
    border-radius: 10px;
  }
`;

export const BoxNum = styled.h5`
  font-style: normal;
  font-weight: 800;
  font-size: 4.2rem;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #FFC107;
  margin-bottom: 10px;
  animation: ${countGlow} 3s ease-in-out infinite;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 3.2rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 2.6rem;
  }
`;

export const BoxText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.4;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 1.2rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;
