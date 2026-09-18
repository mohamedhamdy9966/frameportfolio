import styled, { keyframes } from "styled-components";

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 255, 255, 0.08); }
  50%       { border-color: rgba(255, 193, 7, 0.28); }
`;

export const FaqList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 2.4rem 0 6.4rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    margin-bottom: 3.6rem;
  }
`;

export const FaqItem = styled.li`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(14, 14, 14, 0.88);
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
  animation: ${borderPulse} 7s ease-in-out infinite;

  &[data-open="true"] {
    border-color: rgba(255, 193, 7, 0.4);
    background: rgba(255, 193, 7, 0.03);
  }
`;

export const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  font-family: inherit;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover {
    color: #ffc107;
  }

  .toggle {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    color: #ffc107;
    border: 1px solid rgba(255, 193, 7, 0.3);
    background: rgba(255, 193, 7, 0.07);
    transition:
      transform 0.3s ease,
      background 0.3s ease,
      color 0.3s ease;
  }

  &[aria-expanded="true"] .toggle {
    transform: rotate(135deg);
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    color: #0a0a0a;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    font-size: 1.45rem;
    padding: 16px;
    gap: 12px;
  }
`;

export const FaqAnswer = styled.div`
  overflow: hidden;
`;

export const FaqAnswerInner = styled.p`
  padding: 0 24px 22px;
  font-size: 1.45rem;
  line-height: 1.8;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  max-width: 820px;

  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 0 16px 18px;
    font-size: 1.3rem;
  }
`;

export const FaqFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 22px 24px;
  border-radius: 14px;
  border: 1px dashed rgba(255, 193, 7, 0.28);
  background: rgba(255, 193, 7, 0.03);

  p {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.65);
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1.4rem;
    font-weight: 700;
    color: #0a0a0a;
    background: linear-gradient(90deg, #ffc107, #ff8c00);
    border-radius: 999px;
    padding: 10px 20px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 26px rgba(255, 193, 7, 0.6);
    }
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 18px;
    p {
      font-size: 1.35rem;
    }
  }
`;
