import styled, { keyframes } from "styled-components";

const pulseRing = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,193,7,0.35); }
  50%       { box-shadow: 0 0 0 10px rgba(255,193,7,0); }
`;

/* Thin gold progress bar pinned under the sticky header. */
export const ProgressTrack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1100;
  pointer-events: none;
`;

export const ProgressFill = styled.div`
  height: 100%;
  transform-origin: left center;
  transform: scaleX(${(p) => p.$progress || 0});
  background: linear-gradient(90deg, #ffc107, #ff8c00);
  box-shadow: 0 0 12px rgba(255, 193, 7, 0.7);
  transition: transform 0.12s linear;
`;

/* Floating scroll-to-top button, appears after the first viewport. */
export const TopButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1050;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0a0a0a;
  background: linear-gradient(135deg, #ffc107, #ff8c00);
  border: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.85)"};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: ${pulseRing} 3s ease-in-out infinite;

  &:hover {
    box-shadow: 0 0 26px rgba(255, 193, 7, 0.75);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    right: 14px;
    bottom: 14px;
    width: 42px;
    height: 42px;
  }
`;
