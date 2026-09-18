import styled, { keyframes } from "styled-components";

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 193, 7, 0.13); }
  50%       { border-color: rgba(255, 193, 7, 0.38); }
`;

/* ─── Pricing plans ─────────────────────── */
export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin: 2.4rem 0 1.6rem;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
`;

export const PlanCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 30px 26px;
  border-radius: 18px;
  background: ${({ $highlighted }) =>
    $highlighted
      ? "linear-gradient(165deg, rgba(255,193,7,0.12) 0%, rgba(14,14,14,0.96) 55%)"
      : "rgba(14, 14, 14, 0.9)"};
  border: 1px solid
    ${({ $highlighted }) =>
      $highlighted ? "rgba(255,193,7,0.55)" : "rgba(255,193,7,0.13)"};
  box-shadow: ${({ $highlighted }) =>
    $highlighted
      ? "0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,193,7,0.12)"
      : "none"};
  animation: ${borderPulse} 6s ease-in-out infinite;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 22px 18px;
    border-radius: 14px;
  }
`;

export const PlanBadge = styled.span`
  position: absolute;
  top: -12px;
  right: 22px;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a0a0a;
  background: linear-gradient(90deg, #ffc107, #ff8c00);
  border-radius: 999px;
  padding: 5px 12px;
  box-shadow: 0 6px 18px rgba(255, 140, 0, 0.35);
`;

export const PlanName = styled.h4`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ffc107;
`;

export const PlanTagline = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.01em;
`;

export const PlanPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 6px 0 4px;

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 2.6rem;
  }
`;

export const PlanBilling = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

export const PlanBestFor = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  margin-bottom: 6px;
`;

export const PlanFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0;
  margin-bottom: 20px;
`;

export const PlanFeature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 1.35rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);

  svg {
    color: #ffc107;
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

export const PlanCta = styled.a`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 999px;
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  transition: all 0.25s ease;

  &.solid {
    color: #0a0a0a;
    background: linear-gradient(90deg, #ffc107, #ff8c00);
    box-shadow: 0 4px 20px rgba(255, 193, 7, 0.35);
    &:hover {
      box-shadow: 0 8px 30px rgba(255, 193, 7, 0.65);
    }
  }

  &.ghost {
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    &:hover {
      color: #0a0a0a;
      background: #ffc107;
      border-color: #ffc107;
    }
  }
`;

export const Caveat = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 5.6rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    margin-bottom: 3.2rem;
  }
`;

/* ─── Delivery process ─────────────────── */
export const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.4rem;
  margin-bottom: 6.4rem;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 3.6rem;
  }
`;

export const ProcessCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 20px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 193, 7, 0.35);
    background: rgba(255, 193, 7, 0.04);
  }
`;

export const ProcessNum = styled.span`
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #ffc107;
`;

export const ProcessTitle = styled.h5`
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
`;

export const ProcessText = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
`;

/* ─── Scope / division intro ───────────── */
export const DivisionIntro = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.2rem;
  padding: 30px 32px;
  border-radius: 18px;
  background: linear-gradient(
    120deg,
    rgba(255, 193, 7, 0.07) 0%,
    rgba(14, 14, 14, 0.9) 60%
  );
  border: 1px solid rgba(255, 193, 7, 0.16);
  margin-bottom: 2.4rem;

  @media ${(p) => p.theme.breakpoints.md} {
    flex-direction: column;
    gap: 2rem;
    padding: 24px;
  }
`;

export const DivisionCopy = styled.div`
  max-width: 620px;

  h3 {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1.25;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.45rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 300;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    h3 {
      font-size: 1.9rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
`;

export const DivisionMiniStats = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-shrink: 0;

  @media ${(p) => p.theme.breakpoints.md} {
    gap: 2rem;
  }
`;

export const MiniStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .value {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1;
    color: #ffc107;
  }
  .label {
    font-size: 1.05rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    max-width: 130px;
  }
`;

/* ─── Scope model cards ────────────────── */
export const ModelTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.6rem;
  margin-bottom: 4rem;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ModelCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-radius: 14px;
  background: rgba(14, 14, 14, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    border-color 0.3s ease,
    transform 0.3s ease;

  svg {
    color: #ffc107;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 193, 7, 0.35);
  }
`;

export const ModelTitle = styled.h5`
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
`;

export const ModelText = styled.p`
  font-size: 1.3rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
`;

/* Legacy aliases kept so an old import never breaks the build. */
export const StepsRail = styled.div``;
export const StepsList = styled.ol``;
export const StepItem = styled.li``;
export const StepNum = styled.span``;
export const StepBody = styled.div``;
export const StepHeading = styled.h5``;
export const StepCopy = styled.p``;
export const StepsNav = styled.div``;
export const StepsNote = styled.p``;
