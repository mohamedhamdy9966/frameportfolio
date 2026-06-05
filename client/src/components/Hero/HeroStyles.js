import styled, { keyframes } from 'styled-components';

/* ─── Keyframes ─────────────────────────────────────────── */
const moveStripe = keyframes`
  0%   { background-position: 0 0; }
  100% { background-position: 60px 0; }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
`;

const rotateOrbit = keyframes`
  from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
`;

/* ─── Hero wrapper ──────────────────────────────────────── */
export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 48px;
  z-index: 1;

  /* Deep radial hero glow */
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,193,7,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  @media ${(p) => p.theme.breakpoints.md} {
    padding: 80px 32px 40px;
    min-height: auto;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 60px 16px 40px;
    min-height: auto;
  }
`;

/* ─── Left content ──────────────────────────────────────── */
export const LeftSection = styled.div`
  width: 60%;
  position: relative;
  z-index: 2;

  @media ${(p) => p.theme.breakpoints.md} {
    width: 100%;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    width: 100%;
  }
`;

/* ─── Badge above headline ──────────────────────────────── */
export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #FFC107;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FFC107;
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
`;

/* ─── Right visual ──────────────────────────────────────── */
export const RightSection = styled.div`
  width: 40%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media ${(p) => p.theme.breakpoints.md} {
    display: none;
  }
`;

export const OrbitRing = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  border: 1px dashed rgba(255, 193, 7, 0.2);
  border-radius: 50%;
  animation: ${floatY} 6s ease-in-out infinite;
`;

export const OrbitDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FFC107;
  box-shadow: 0 0 16px rgba(255,193,7,0.8);
  animation: ${rotateOrbit} ${(p) => p.speed || '8s'} linear infinite
    ${(p) => p.reverse ? 'reverse' : ''};
  margin: -6px 0 0 -6px;
`;

export const CenterLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,193,7,0.15) 0%, transparent 70%);
  border: 2px solid rgba(255,193,7,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulseGlow} 3s ease-in-out infinite;
`;

export const StatRow = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;

  @media ${(p) => p.theme.breakpoints.sm} {
    gap: 16px;
    flex-wrap: wrap;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;

  .stat-num {
    font-size: 2.8rem;
    font-weight: 800;
    color: #FFC107;
    line-height: 1;
  }
  .stat-label {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.5);
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

/* ─── Animated taxi stripe ──────────────────────────────── */
export const TaxiStripe = styled.div`
  width: 100%;
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #FFC107 0px,
    #FFC107 20px,
    #0A0A0A 20px,
    #0A0A0A 40px
  );
  background-size: 60px 100%;
  animation: ${moveStripe} ${(p) => p.speed || '1.5s'} linear infinite;
  box-shadow: 0 0 16px rgba(255, 193, 7, 0.5);
  border-radius: 4px;
  margin-top: 40px;
`;

/* ─── Scroll indicator ──────────────────────────────────── */
export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;

  span {
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  .mouse {
    width: 22px;
    height: 36px;
    border: 2px solid rgba(255,193,7,0.5);
    border-radius: 999px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 8px;
      background: #FFC107;
      border-radius: 999px;
      animation: scroll-dot 2s ease-in-out infinite;
    }
  }

  @keyframes scroll-dot {
    0%   { top: 5px; opacity: 1; }
    80%  { top: 18px; opacity: 0; }
    100% { top: 5px; opacity: 0; }
  }
`;

/* ─── Taxi Animation Styled Components ──────────────────── */

// Keyframes
const wheelRotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const chassisBounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-2.5px) rotate(0.4deg); }
`;

const roadScroll = keyframes`
  from { background-position-x: 0px; }
  to   { background-position-x: -80px; }
`;

const linePass = keyframes`
  0% { transform: translateX(250px) scaleX(0.1); opacity: 0; }
  10% { opacity: 0.3; }
  80% { opacity: 0.3; }
  100% { transform: translateX(-250px) scaleX(1.5); opacity: 0; }
`;

export const AnimationWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  background: radial-gradient(circle at 75% 25%, rgba(255,193,7,0.08) 0%, transparent 70%);
  border: 1px solid rgba(255, 193, 7, 0.1);
  box-shadow: 0 16px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,193,7,0.02);
  
  @media ${(p) => p.theme.breakpoints.md} {
    display: none;
  }
`;

export const SpeedLine = styled.div`
  position: absolute;
  top: ${(p) => p.top || '20%'};
  left: 0;
  width: 100px;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(255,193,7,0.15), transparent);
  animation: ${linePass} ${(p) => p.duration || '1.5s'} linear infinite;
  animation-delay: ${(p) => p.delay || '0s'};
  pointer-events: none;
`;

export const TaxiWrapper = styled.div`
  width: 220px;
  height: 110px;
  position: relative;
  z-index: 3;
  margin-bottom: -15px; /* sits on top of road */
  
  /* chassis bounce animation */
  animation: ${chassisBounce} 0.6s ease-in-out infinite;
`;

export const HeadlightCone = styled.div`
  position: absolute;
  top: 61px;
  left: 204px;
  width: 160px;
  height: 60px;
  background: linear-gradient(105deg, rgba(255,235,59,0.25) 0%, rgba(255,235,59,0.05) 50%, transparent 90%);
  clip-path: polygon(0 5px, 100% 0, 100% 100%, 0 15px);
  filter: blur(3px);
  pointer-events: none;
  z-index: 1;
`;

export const RoadContainer = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, #0f0f0f 0%, #050505 100%);
  border-top: 1.5px solid rgba(255, 193, 7, 0.15);
  position: relative;
  z-index: 2;
  overflow: hidden;
  box-shadow: inset 0 6px 12px rgba(0,0,0,0.9);
`;

export const RoadStrip = styled.div`
  width: 200%;
  height: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 30px,
    #FFC107 30px,
    #FFC107 60px
  );
  background-size: 60px 100%;
  animation: ${roadScroll} 0.6s linear infinite;
  opacity: 0.65;
`;

export const FloatingBadge = styled.div`
  position: absolute;
  left: 135px;
  bottom: 55px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: linear-gradient(135deg, #FFC107 0%, #FF8C00 100%);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  box-shadow: 0 6px 18px rgba(255, 140, 0, 0.35), inset 0 1px 2px rgba(255,255,255,0.25);
  white-space: nowrap;
  pointer-events: none;
  
  .badge-icon {
    font-size: 1.2rem;
  }
  .badge-text {
    font-size: 0.95rem;
    font-weight: 800;
    color: #0A0A0A;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;