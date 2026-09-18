import styled, { keyframes } from "styled-components";

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 193, 7, 0.14); }
  50%       { border-color: rgba(255, 193, 7, 0.4); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
`;

const scan = keyframes`
  0%   { transform: translateY(-100%); opacity: 0; }
  40%  { opacity: 0.8; }
  100% { transform: translateY(700%); opacity: 0; }
`;

/* ─── Headline stats ─────────────────────── */
export const BuildStats = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
  margin: 1rem 0 4rem;
  padding: 0;

  @media ${(p) => p.theme.breakpoints.sm} {
    gap: 1.6rem;
    margin-bottom: 2.4rem;
  }
`;

export const BuildStat = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;

  .value {
    font-size: 2.6rem;
    font-weight: 800;
    line-height: 1;
    color: #ffc107;
    letter-spacing: -0.01em;
  }

  .label {
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.45);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    .value {
      font-size: 2rem;
    }
    .label {
      font-size: 0.95rem;
    }
  }
`;

/* ─── Services grid ──────────────────────── */
export const ServiceGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 0 0 6.4rem;
  padding: 0;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
    margin-bottom: 4.8rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-bottom: 3.2rem;
  }
`;

export const ServiceCard = styled.li`
  position: relative;
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 193, 7, 0.14);
  border-radius: 16px;
  padding: 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  animation: ${borderPulse} 5s ease-in-out infinite;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255, 193, 7, 0.45);
    box-shadow:
      0 22px 50px rgba(0, 0, 0, 0.5),
      0 0 28px rgba(255, 193, 7, 0.1);
  }
`;

export const ServiceIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  color: #ffc107;
  background: rgba(255, 193, 7, 0.08);
  border: 1px solid rgba(255, 193, 7, 0.2);
  transition:
    background 0.3s ease,
    color 0.3s ease;

  ${ServiceCard}:hover & {
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    color: #0a0a0a;
  }
`;

export const ServiceTitle = styled.h4`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
`;

export const ServiceText = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
`;

export const DeliverableList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 12px;
`;

export const Deliverable = styled.li`
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.03);
`;

/* ─── Product / case study cards ────────────────────────── */
export const ProductStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 6.4rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    gap: 1.6rem;
    margin-bottom: 4rem;
  }
`;

export const ProductCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 3.2rem;
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(
    160deg,
    rgba(20, 20, 20, 0.95) 0%,
    rgba(12, 12, 12, 0.95) 100%
  );
  border: 1px solid rgba(255, 193, 7, 0.14);
  overflow: hidden;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;

  /* Accent edge in the product's own brand colour */
  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: ${(p) => p.$accent || "#FFC107"};
    opacity: 0.85;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 193, 7, 0.4);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  }

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 24px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 20px 18px;
    border-radius: 14px;
  }
`;

export const ProductHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const ProductName = styled.h4`
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 2rem;
  }
`;

export const ProductType = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(p) => p.$accent || "#FFC107"};
  border: 1px solid
    ${(p) => (p.$accent ? `${p.$accent}66` : "rgba(255,193,7,0.4)")};
  background: ${(p) => (p.$accent ? `${p.$accent}14` : "rgba(255,193,7,0.08)")};
  border-radius: 999px;
  padding: 4px 12px;
`;

export const ProductTagline = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 10px;
`;

export const ProductDescription = styled.p`
  font-size: 1.4rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
  margin-bottom: 18px;
`;

export const FeatureGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 18px;
  margin-bottom: 20px;
  padding: 0;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 1.3rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.7);

  .tick {
    color: #ffc107;
    font-weight: 800;
    flex-shrink: 0;
    line-height: 1.55;
  }
`;

export const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin-bottom: 20px;
`;

export const Tech = styled.li`
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #ffc107;
  background: rgba(255, 193, 7, 0.07);
  border: 1px solid rgba(255, 193, 7, 0.25);
  border-radius: 6px;
  padding: 5px 10px;
`;

export const ProductActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ProductLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 11px 20px;
  border-radius: 999px;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &.primary {
    background: linear-gradient(90deg, #ffc107, #ff8c00);
    color: #0a0a0a;
    box-shadow: 0 0 20px rgba(255, 193, 7, 0.35);
    &:hover {
      box-shadow: 0 0 30px rgba(255, 193, 7, 0.65);
    }
  }

  &.ghost {
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.03);
    &:hover {
      color: #0a0a0a;
      background: #ffc107;
      border-color: #ffc107;
    }
  }
`;

/* ─── Product side rail: fake UI + metrics ─────────────── */
export const ProductAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media ${(p) => p.theme.breakpoints.md} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
  }
`;

export const DeviceFrame = styled.div`
  position: relative;
  flex: 1;
  min-height: 170px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(8, 8, 8, 0.9);
  overflow: hidden;
  animation: ${floatSlow} 7s ease-in-out infinite;

  /* top chrome bar */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 22px;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  /* the scan line sweeping the mock UI */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 22px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${(p) => p.$accent || "#FFC107"},
      transparent
    );
    animation: ${scan} 4.5s ease-in-out infinite;
  }

  @media ${(p) => p.theme.breakpoints.md} {
    min-height: 150px;
    min-width: 200px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    display: none;
  }
`;

export const DeviceBody = styled.div`
  padding: 34px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SkeletonBar = styled.div`
  height: 8px;
  border-radius: 999px;
  width: ${(p) => p.$w || "100%"};
  background: ${(p) =>
    p.$accent
      ? `linear-gradient(90deg, ${p.$accent}55, ${p.$accent}11)`
      : "rgba(255,255,255,0.09)"};
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 4px;
`;

export const SkeletonTile = styled.div`
  height: 34px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 2px solid ${(p) => p.$accent || "rgba(255,193,7,0.5)"};
`;

export const MetricRow = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);

  @media ${(p) => p.theme.breakpoints.md} {
    flex: 1;
    min-width: 180px;
  }
`;

export const Metric = styled.li`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;

  .value {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${(p) => p.$accent || "#FFC107"};
    line-height: 1;
  }
  .label {
    font-size: 1.1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
    text-align: right;
  }
`;

export const PlatformRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin-top: 4px;

  li {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
    border: 1px dashed rgba(255, 255, 255, 0.14);
    border-radius: 6px;
    padding: 4px 9px;
  }
`;

/* ─── Process timeline ─────────────────── */
export const ProcessTrack = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.6rem;
  padding: 0;
  margin: 0 0 6.4rem;
  position: relative;

  /* the connecting rail behind the step markers */
  &::before {
    content: "";
    position: absolute;
    top: 22px;
    left: 4%;
    right: 4%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 193, 7, 0.05),
      rgba(255, 193, 7, 0.4),
      rgba(255, 193, 7, 0.05)
    );
    z-index: 0;
  }

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    &::before {
      display: none;
    }
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-bottom: 4rem;
  }
`;

export const ProcessStep = styled.li`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StepMarker = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffc107;
  background: #0e0e0e;
  border: 1.5px solid rgba(255, 193, 7, 0.45);
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.15);
  transition:
    background 0.3s ease,
    color 0.3s ease;

  ${ProcessStep}:hover & {
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    color: #0a0a0a;
  }
`;

export const StepTitle = styled.h5`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
`;

export const StepText = styled.p`
  font-size: 1.3rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
`;

/* ─── Section heading helper ───────────────────────────── */
export const SubHeading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 2.4rem;

  h3 {
    font-size: 2.6rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #ffffff;
  }

  span {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.04em;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    h3 {
      font-size: 2rem;
    }
    span {
      font-size: 1.15rem;
    }
  }
`;
