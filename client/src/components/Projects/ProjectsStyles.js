import styled, { keyframes } from 'styled-components';

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 193, 7, 0.15); }
  50%       { border-color: rgba(255, 193, 7, 0.45); }
`;

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  padding: 2rem 0 4rem;
  column-gap: 2.4rem;
  row-gap: 2.4rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    padding: 1.6rem 0 2rem;
  }
`;

export const BlogCard = styled.div`
  background: rgba(14, 14, 14, 0.92);
  border: 1px solid rgba(255, 193, 7, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
  animation: ${borderPulse} 4s ease-in-out infinite;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 193, 7, 0.5);
    box-shadow:
      0 0 0 1px rgba(255,193,7,0.1),
      0 20px 60px rgba(0,0,0,0.6),
      0 0 40px rgba(255,193,7,0.08);
    transform: translateY(-6px);
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    width: 100%;
    border-radius: 12px;
  }
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.9) 100%);
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BlogCard}:hover & {
    transform: scale(1.06);
  }
`;

export const CardBody = styled.div`
  padding: 24px;
`;

export const TitleContent = styled.div`
  text-align: left;
  z-index: 20;
  width: 100%;
  margin-bottom: 12px;
`;

export const HeaderThree = styled.h3`
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
  padding: 0.4rem 0;
  font-size: ${(p) => (p.$title ? '2.2rem' : '1.8rem')};
  line-height: 1.3;
`;

export const Hr = styled.hr`
  width: 40px;
  height: 3px;
  margin: 12px 0;
  border: 0;
  background: linear-gradient(90deg, #FFC107, #FF8C00);
  border-radius: 999px;
  box-shadow: 0 0 8px rgba(255,193,7,0.5);
`;

export const CardInfo = styled.p`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  line-height: 1.7;
  margin-bottom: 16px;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin-bottom: 20px;
`;

export const Tag = styled.li`
  color: #FFC107;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 4px 12px;
  border: 1px solid rgba(255,193,7,0.3);
  border-radius: 999px;
  background: rgba(255,193,7,0.06);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,193,7,0.15);
  }
`;

export const UtilityList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 12px;
  margin: 0;
`;

export const ExternalLinks = styled.a`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  letter-spacing: 0.03em;

  &:hover {
    background: #FFC107;
    border-color: #FFC107;
    color: #0A0A0A;
    box-shadow: 0 0 20px rgba(255,193,7,0.45);
  }
`;