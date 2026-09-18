import styled, { keyframes } from "styled-components";

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 193, 7, 0.13); }
  50%       { border-color: rgba(255, 193, 7, 0.36); }
`;

export const SliderShell = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 1.6rem;
  margin: 2.4rem 0 6.4rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    margin-bottom: 3.6rem;
    gap: 1rem;
  }
`;

export const ArrowButton = styled.button`
  flex-shrink: 0;
  align-self: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffc107;
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 193, 7, 0.3);
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    color: #0a0a0a;
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    border-color: #ffc107;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    display: none;
  }
`;

export const QuoteCard = styled.blockquote`
  position: relative;
  flex: 1;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 34px 32px;
  border-radius: 18px;
  background: rgba(14, 14, 14, 0.92);
  border: 1px solid rgba(255, 193, 7, 0.13);
  animation: ${borderPulse} 6s ease-in-out infinite;
  overflow: hidden;

  /* Oversized decorative quote mark */
  &::before {
    content: "“";
    position: absolute;
    top: -28px;
    right: 18px;
    font-size: 13rem;
    line-height: 1;
    color: rgba(255, 193, 7, 0.08);
    pointer-events: none;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 22px 18px;
    min-height: 0;
  }
`;

export const QuoteText = styled.p`
  position: relative;
  font-size: 2.1rem;
  line-height: 1.6;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.005em;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 1.8rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.55rem;
  }
`;

export const QuoteFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.span`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  color: #0a0a0a;
  background: linear-gradient(135deg, #ffc107, #ff8c00);
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.3);
`;

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
  }
  .role {
    font-size: 1.2rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.button`
  width: ${({ $active }) => ($active ? "26px" : "8px")};
  height: 8px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, #FFC107, #FF8C00)"
      : "rgba(255,255,255,0.22)"};
  box-shadow: ${({ $active }) =>
    $active ? "0 0 12px rgba(255,193,7,0.6)" : "none"};
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &:hover {
    background: #ffc107;
  }
`;

export const AutoplayToggle = styled.button`
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 6px 14px;
  cursor: pointer;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    color: #ffc107;
    border-color: rgba(255, 193, 7, 0.5);
  }
`;
