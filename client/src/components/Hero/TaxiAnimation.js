"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes, css } from "styled-components";
import {
  AnimationWrapper,
  RoadContainer,
  RoadStrip,
  TaxiWrapper,
  HeadlightCone,
  FloatingBadge,
  SpeedLine,
} from "./HeroStyles";

/* ── Wheel spin keyframe ───────────────────────────────── */
const wheelSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/* ── Puff keyframe ─────────────────────────────────────── */
const puffFloat = keyframes`
  0%   { transform: translate(0, 0) scale(1);   opacity: 0.55; }
  100% { transform: translate(-60px, -30px) scale(2.5); opacity: 0; }
`;

/* 
  CRITICAL for SVG <g> elements: must add transform-box: fill-box
  so transform-origin: center works relative to the element's own bounding box,
  not the SVG viewport origin.
*/
const SpinningWheel = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${wheelSpin} 0.55s linear infinite;
`;

/* ── Exhaust puff bubble ───────────────────────────────── */
const Puff = styled(motion.div)`
  position: absolute;
  left: 14px;
  bottom: 62px;
  width: ${(p) => p.$size || 10}px;
  height: ${(p) => p.$size || 10}px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200,200,200,0.45) 0%, transparent 80%);
  pointer-events: none;
  z-index: 4;
`;

/* ─── Data ──────────────────────────────────────────────── */
const milestoneData = [
  { text: "ROI +300%",      icon: "📈" },
  { text: "Organic Leads",  icon: "👤" },
  { text: "Sales Boost",    icon: "💰" },
  { text: "SEO Rank #1",    icon: "🥇" },
  { text: "Traffic ×2",     icon: "⚡" },
  { text: "Conversion +45%",icon: "🎯" },
];

const PUFF_SIZES = [8, 11, 14, 9, 13];

/* ─── Component ─────────────────────────────────────────── */
const TaxiAnimation = () => {
  const [badges, setBadges] = useState([]);
  const [puffs,  setPuffs]  = useState([]);

  /* spawn badges every 1.6 s */
  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      const m = milestoneData[idx % milestoneData.length];
      setBadges((prev) => [
        ...prev.slice(-5),
        {
          id:      Date.now() + Math.random(),
          text:    m.text,
          icon:    m.icon,
          yTarget: -100 - Math.random() * 80,
          xTarget: -80  - Math.random() * 50,
          scale:   0.95 + Math.random() * 0.2,
        },
      ]);
      idx++;
    }, 1600);
    return () => clearInterval(id);
  }, []);

  /* spawn exhaust puffs every 400 ms */
  useEffect(() => {
    const id = setInterval(() => {
      const size = PUFF_SIZES[Math.floor(Math.random() * PUFF_SIZES.length)];
      setPuffs((prev) => [
        ...prev.slice(-6),
        { id: Date.now() + Math.random(), size },
      ]);
    }, 400);
    return () => clearInterval(id);
  }, []);

  /* ── JSX ── */
  return (
    <AnimationWrapper>
      {/* Speed streaks */}
      <SpeedLine delay="0s"   top="18%" duration="1.4s" />
      <SpeedLine delay="0.5s" top="32%" duration="1.1s" />
      <SpeedLine delay="0.9s" top="23%" duration="1.9s" />

      {/* Exhaust puffs */}
      <AnimatePresence>
        {puffs.map((p) => (
          <Puff
            key={p.id}
            $size={p.size}
            initial={{ opacity: 0.55, scale: 1,   x: 0,   y: 0 }}
            animate={{ opacity: 0,    scale: 2.5, x: -55, y: -28 }}
            exit={{}}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Success badges */}
      <AnimatePresence>
        {badges.map((b) => (
          <FloatingBadge
            key={b.id}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
            animate={{
              opacity:  [0, 1, 1, 0],
              scale:    [0.4, b.scale, b.scale, 0.3],
              x:        b.xTarget,
              y:        b.yTarget,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, ease: "easeOut" }}
          >
            <span className="badge-icon">{b.icon}</span>
            <span className="badge-text">{b.text}</span>
          </FloatingBadge>
        ))}
      </AnimatePresence>

      {/* ── Taxi ── */}
      <TaxiWrapper>
        <HeadlightCone />

        <svg viewBox="0 0 240 120" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="taxiBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#FFD54F" />
              <stop offset="55%"  stopColor="#FFC107" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#E8E8E8" />
              <stop offset="100%" stopColor="#9E9E9E" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#1b2a31" />
              <stop offset="50%"  stopColor="#1e3040" />
              <stop offset="100%" stopColor="#0f171a" />
            </linearGradient>
            <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#CFD8DC" />
              <stop offset="100%" stopColor="#78909C" />
            </linearGradient>
            <filter id="lightGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="126" cy="107" rx="88" ry="6" fill="url(#shadowGrad)" />

          {/* ── Body ── */}
          <path
            d="M 30 85
               L 30 68
               Q 30 60 42 60
               L 60 60
               C 70 38 82 32 110 32
               L 165 32
               C 185 32 196 38 206 60
               L 218 60
               Q 226 60 226 68
               L 226 85
               Z"
            fill="url(#taxiBody)"
          />

          {/* Body highlight stripe */}
          <path
            d="M 50 55 C 60 40 78 35 108 35 L 162 35 C 180 35 192 40 200 55"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />

          {/* Undercarriage bar */}
          <rect x="26" y="83" width="204" height="4" fill="#111" rx="2" />

          {/* Bumpers */}
          <rect x="20" y="79" width="11" height="7" fill="url(#silverGrad)" rx="2" />
          <rect x="225" y="79" width="11" height="7" fill="url(#silverGrad)" rx="2" />

          {/* Windows */}
          <path d="M 66 57 L 68 40 L 104 40 L 104 57 Z" fill="url(#glassGrad)" />
          <path d="M 113 57 L 113 40 L 160 40 C 171 40 179 45 183 57 Z" fill="url(#glassGrad)" />

          {/* Window glare */}
          <path d="M 70 42 L 80 42 L 78 50 L 68 50 Z" fill="rgba(255,255,255,0.07)" />
          <path d="M 116 42 L 130 42 L 128 52 L 114 52 Z" fill="rgba(255,255,255,0.07)" />

          {/* Window pillar */}
          <line x1="108" y1="37" x2="108" y2="57" stroke="url(#silverGrad)" strokeWidth="3.5" />

          {/* Checkered stripe */}
          <g transform="translate(36,68)">
            {[...Array(15)].map((_, i) => (
              <React.Fragment key={i}>
                <rect x={i*12} y="0" width="12" height="4" fill={i%2===0 ? "#0A0A0A" : "#FFF"} />
                <rect x={i*12} y="4" width="12" height="4" fill={i%2===0 ? "#FFF" : "#0A0A0A"} />
              </React.Fragment>
            ))}
          </g>

          {/* Door handles */}
          <rect x="118" y="63" width="9" height="2" fill="#1A1A1A" rx="1" />
          <rect x="156" y="63" width="9" height="2" fill="#1A1A1A" rx="1" />

          {/* Headlight cluster */}
          <rect x="220" y="68" width="7" height="9" fill="#FFF9C4" rx="1" filter="url(#lightGlow)" />
          <rect x="222" y="70" width="4" height="5" fill="#FFF" />

          {/* Taillight */}
          <rect x="26" y="68" width="5" height="9" fill="#E53935" rx="1" />

          {/* Roof sign */}
          <path
            d="M 116 32 L 123 21 Q 125 19 129 19 L 141 19 Q 145 19 147 21 L 154 32 Z"
            fill="#FFC107"
            stroke="#111"
            strokeWidth="1.5"
          />
          <rect x="127" y="21" width="16" height="8" fill="#FFC107" />
          <text
            x="135" y="28"
            fontFamily="'Space Grotesk', monospace"
            fontSize="6.5"
            fontWeight="900"
            fill="#000"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            TAXI
          </text>

          {/* ── REAR WHEEL ── */}
          <g transform="translate(68,92)">
            <SpinningWheel>
              <circle r="19" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="2" />
              <circle r="17" fill="none" stroke="#303030" strokeWidth="4" strokeDasharray="4 3" />
              <circle r="12" fill="url(#hubGrad)" />
              <circle r="5"  fill="#0A0A0A" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={Math.cos(rad) * 5}  y1={Math.sin(rad) * 5}
                    x2={Math.cos(rad) * 11} y2={Math.sin(rad) * 11}
                    stroke="#555"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* hubcap center dot */}
              <circle r="2" fill="#E0E0E0" />
            </SpinningWheel>
          </g>

          {/* ── FRONT WHEEL ── */}
          <g transform="translate(182,92)">
            <SpinningWheel>
              <circle r="19" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="2" />
              <circle r="17" fill="none" stroke="#303030" strokeWidth="4" strokeDasharray="4 3" />
              <circle r="12" fill="url(#hubGrad)" />
              <circle r="5"  fill="#0A0A0A" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={Math.cos(rad) * 5}  y1={Math.sin(rad) * 5}
                    x2={Math.cos(rad) * 11} y2={Math.sin(rad) * 11}
                    stroke="#555"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
              <circle r="2" fill="#E0E0E0" />
            </SpinningWheel>
          </g>
        </svg>
      </TaxiWrapper>

      {/* Road */}
      <RoadContainer>
        <RoadStrip />
      </RoadContainer>
    </AnimationWrapper>
  );
};

export default TaxiAnimation;
