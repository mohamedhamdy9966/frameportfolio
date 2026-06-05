import styled, { keyframes } from 'styled-components';

const moveStripe = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
`;

export const LeftSection = styled.div`
  width: 100%;
  position: relative;
  
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

export const TaxiStripe = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    #FFC107,
    #FFC107 20px,
    #0A0A0A 20px,
    #0A0A0A 40px
  );
  animation: ${moveStripe} ${props => props.speed || '1.5s'} linear infinite;
  box-shadow: 0 0 12px rgba(255, 193, 7, 0.4);
  border-radius: 4px;
  transition: animation-duration 0.4s ease;
`;