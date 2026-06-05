'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0A0A0A;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const CheckerPattern = styled.div`
  width: 80px;
  height: 80px;
  background: repeating-linear-gradient(
    45deg,
    #FFC107,
    #FFC107 20px,
    #0A0A0A 20px,
    #0A0A0A 40px
  );
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Loader = () => (
  <LoaderContainer>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CheckerPattern />
    </motion.div>
  </LoaderContainer>
);