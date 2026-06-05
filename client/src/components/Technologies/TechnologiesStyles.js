import styled, { keyframes } from 'styled-components';

const borderGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,193,7,0); border-color: rgba(255,193,7,0.12); }
  50%       { box-shadow: 0 0 24px rgba(255,193,7,0.2); border-color: rgba(255,193,7,0.4); }
`;

const iconFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-8px) rotate(5deg); }
`;

/* ─── Grid ──────────────────────────────────────────────── */
export const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  margin: 3rem 0 4rem;

  @media ${(p) => p.theme.breakpoints.md} {
    gap: 1.6rem;
    margin: 2rem 0 3rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    margin: 1.6rem 0 2rem;
  }
`;

/* ─── Card ──────────────────────────────────────────────── */
export const ListItem = styled.li`
  position: relative;
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 193, 7, 0.12);
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${borderGlow} 5s ease-in-out infinite;
  overflow: hidden;

  /* Subtle corner accent */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle at top right, rgba(255,193,7,0.08), transparent 70%);
    border-radius: 0 20px 0 0;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 24px 60px rgba(0,0,0,0.5),
      0 0 30px rgba(255,193,7,0.1);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    flex-direction: row;
    align-items: flex-start;
    border-radius: 14px;
    padding: 20px;
  }
`;

/* ─── Icon wrapper ──────────────────────────────────────── */
export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(255, 193, 7, 0.08);
  border: 1px solid rgba(255, 193, 7, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFC107;
  animation: ${iconFloat} 4s ease-in-out infinite;
  flex-shrink: 0;
  transition: background 0.3s ease;

  ${ListItem}:hover & {
    background: rgba(255, 193, 7, 0.15);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 16px;
  }
`;

/* ─── Text container ────────────────────────────────────── */
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListTitle = styled.h4`
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 10px;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 1.8rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.6rem;
    margin-bottom: 6px;
  }
`;

export const ListParagraph = styled.p`
  font-size: 1.5rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;

  @media ${(p) => p.theme.breakpoints.md} {
    font-size: 1.4rem;
  }
  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.3rem;
  }
`;

/* ─── Gradient rule under title ─────────────────────────── */
export const CardRule = styled.div`
  width: 32px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #FFC107, #FF8C00);
  box-shadow: 0 0 8px rgba(255,193,7,0.4);
  margin-bottom: 12px;
`;
