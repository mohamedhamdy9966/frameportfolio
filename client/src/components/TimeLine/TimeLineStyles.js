import styled, { keyframes } from 'styled-components';

const glowLine = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`;

/* ─── Scrollable carousel ───────────────────────────────── */
export const CarouselContainer = styled.ul`
  max-width: 1040px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
  scrollbar-width: none;
  position: relative;

  /* Fade out on right edge */
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
  mask-image: linear-gradient(to right, black 85%, transparent 100%);

  &:first-of-type { margin-left: 0; }
  &::-webkit-scrollbar { display: none; }

  @media ${(p) => p.theme.breakpoints.sm} {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    touch-action: pan-x;
    justify-content: initial;
    margin-bottom: 12px;
    -webkit-mask-image: none;
    mask-image: none;
  }
`;

export const CarouselMobileScrollNode = styled.div`
  @media ${(p) => p.theme.breakpoints.sm} {
    display: flex;
    min-width: ${({ final }) => (final ? '120%;' : 'min-content')};
  }
`;

/* ─── Individual year card ──────────────────────────────── */
export const CarouselItem = styled.div`
  position: relative;
  border-radius: 8px;
  max-width: 200px;
  padding: 12px 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${(p) => (p.active === p.index ? 1 : 0.45)};

  &:hover { opacity: 0.85; }

  @media ${(p) => p.theme.breakpoints.md} {
    max-width: 130px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    margin-left: 28px;
    min-width: 130px;
    scroll-snap-align: start;
    padding: 4px;
    opacity: ${(p) => (p.active === p.index ? 1 : 0.4)};
  }
`;

/* ─── Year heading ──────────────────────────────────────── */
export const CarouselItemTitle = styled.h4`
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1.2;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  color: #FFC107;
  margin-bottom: 10px;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 2rem;
    margin-bottom: 6px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.6rem;
  }
`;

/* ─── Connector line ────────────────────────────────────── */
export const CarouselItemImg = styled.svg`
  margin-left: 16px;
  flex: 1;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));
  animation: ${glowLine} 3s ease-in-out infinite;

  @media ${(p) => p.theme.breakpoints.sm} {
    -webkit-mask-image: none;
    margin-left: 12px;
    overflow: visible;
  }
`;

/* ─── Event text ────────────────────────────────────────── */
export const CarouselItemText = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.65);
  padding-right: 12px;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 1.2rem;
    line-height: 1.6;
    padding-right: 24px;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.1rem;
    padding-right: 0;
  }
`;

/* ─── Navigation dots ───────────────────────────────────── */
export const CarouselButtons = styled.div`
  display: none;
  visibility: hidden;
  gap: 6px;
  margin-bottom: 40px;

  @media ${(p) => p.theme.breakpoints.sm} {
    display: flex;
    visibility: visible;
  }
`;

export const CarouselButton = styled.button`
  box-sizing: border-box;
  background: none;
  padding: 6px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: ${(p) => (p.active === p.index ? 1 : 0.3)};
  transform: ${(p) => (p.active === p.index ? 'scale(1.7)' : 'scale(1)')};

  &:focus { outline: none; }
`;

export const CarouselButtonDot = styled.div`
  background: ${(p) => (p.active === p.index ? '#FFC107' : 'rgba(255,255,255,0.6)')};
  border-radius: 10px;
  margin: auto;
  width: 4px;
  height: 4px;
  box-shadow: ${(p) => (p.active === p.index ? '0 0 8px rgba(255,193,7,0.8)' : 'none')};
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;
