import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(255, 193, 7, 0.14); }
  50%       { border-color: rgba(255, 193, 7, 0.4); }
`;

/* ─── Layout: form + contact rail ──────────────────────── */
export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 3.2rem;
  align-items: start;

  @media ${(p) => p.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }
`;

export const FormCard = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 32px;
  border-radius: 20px;
  background: rgba(14, 14, 14, 0.94);
  border: 1px solid rgba(255, 193, 7, 0.14);
  animation: ${borderPulse} 5s ease-in-out infinite;

  @media ${(p) => p.theme.breakpoints.sm} {
    padding: 20px 16px;
    border-radius: 14px;
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const Label = styled.label`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);

  .required {
    color: #ffc107;
    margin-left: 4px;
  }
`;

const fieldBase = `
  width: 100%;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 400;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 13px 14px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &::placeholder { color: rgba(255, 255, 255, 0.28); }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 193, 7, 0.6);
    box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.12);
  }
`;

export const Input = styled.input`
  ${fieldBase}
  border-color: ${({ $invalid }) =>
    $invalid ? "rgba(229, 57, 53, 0.75)" : "rgba(255,255,255,0.12)"};
`;

export const Select = styled.select`
  ${fieldBase}
  cursor: pointer;
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(255, 193, 7, 0.9) 50%),
    linear-gradient(135deg, rgba(255, 193, 7, 0.9) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 21px,
    calc(100% - 13px) 21px;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;

  option {
    background: #111;
    color: #ffffff;
  }
`;

export const TextArea = styled.textarea`
  ${fieldBase}
  min-height: 132px;
  resize: vertical;
  line-height: 1.6;
  border-color: ${({ $invalid }) =>
    $invalid ? "rgba(229, 57, 53, 0.75)" : "rgba(255,255,255,0.12)"};
`;

export const ErrorText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff7a72;
  letter-spacing: 0.01em;
`;

/* ─── Budget chips (a nicer control than a select) ─────── */
export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button`
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#0A0A0A" : "rgba(255,255,255,0.7)")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, #FFC107, #FF8C00)"
      : "rgba(255,255,255,0.04)"};
  border: 1px solid
    ${({ $active }) => ($active ? "#FFC107" : "rgba(255,255,255,0.12)")};
  transition: all 0.22s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "#0A0A0A" : "#FFC107")};
    border-color: rgba(255, 193, 7, 0.55);
  }
`;

/* ─── Submit row ───────────────────────── */
export const SubmitRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 210px;
  height: 58px;
  padding: 0 32px;
  font-family: inherit;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #0a0a0a;
  background: linear-gradient(270deg, #ffc107 0%, #ff8c00 100%);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(255, 193, 7, 0.35);
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease,
    opacity 0.3s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 34px rgba(255, 193, 7, 0.7);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  @media ${(p) => p.theme.breakpoints.sm} {
    width: 100%;
    height: 50px;
    font-size: 1.5rem;
  }
`;

export const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(10, 10, 10, 0.25);
  border-top-color: #0a0a0a;
  animation: ${spin} 0.7s linear infinite;
`;

export const FormNote = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
  max-width: 380px;

  a {
    color: #ffc107;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

/* ─── Status messages ─────────────────── */
export const StatusBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 1.4rem;
  line-height: 1.6;
  border: 1px solid
    ${({ $tone }) =>
      $tone === "error" ? "rgba(229,57,53,0.5)" : "rgba(255,193,7,0.45)"};
  background: ${({ $tone }) =>
    $tone === "error" ? "rgba(229,57,53,0.08)" : "rgba(255,193,7,0.08)"};

  strong {
    color: #ffffff;
  }
  span {
    color: rgba(255, 255, 255, 0.65);
  }

  a {
    color: #ffc107;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

/* ─── Contact rail ─────────────────────── */
export const ContactRail = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: sticky;
  top: 108px;

  @media ${(p) => p.theme.breakpoints.md} {
    position: static;
  }
`;

export const RailCard = styled.div`
  padding: 24px;
  border-radius: 16px;
  background: rgba(14, 14, 14, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 193, 7, 0.35);
  }
`;

export const RailTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 14px;
`;

export const RailRow = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 0;
  transition:
    color 0.25s ease,
    transform 0.2s ease;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    flex-shrink: 0;
    color: #ffc107;
    background: rgba(255, 193, 7, 0.08);
    border: 1px solid rgba(255, 193, 7, 0.2);
  }

  &:hover {
    color: #ffc107;
    transform: translateX(3px);
  }
`;

export const RailFact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 1.35rem;
  padding: 7px 0;
  color: rgba(255, 255, 255, 0.55);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #ffc107;
    font-weight: 700;
    text-align: right;
  }
`;

export const WhatsappButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 52px;
  border-radius: 999px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #0a0a0a;
  background: linear-gradient(90deg, #ffc107, #ff8c00);
  box-shadow: 0 4px 22px rgba(255, 193, 7, 0.35);
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 30px rgba(255, 193, 7, 0.65);
    transform: translateY(-2px);
  }
`;
