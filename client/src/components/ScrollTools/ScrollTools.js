"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { ProgressTrack, ProgressFill, TopButton } from "./ScrollToolsStyles";

/**
 * Reading-progress bar + back-to-top button.
 *
 * The scroll listener is throttled through requestAnimationFrame so a fast
 * scroll cannot queue dozens of state updates per frame.
 */
const ScrollTools = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrolled = window.scrollY || doc.scrollTop;
      setProgress(max > 0 ? Math.min(scrolled / max, 1) : 0);
      setVisible(scrolled > doc.clientHeight * 0.6);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <ProgressTrack
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <ProgressFill $progress={progress} />
      </ProgressTrack>

      <TopButton
        type="button"
        onClick={scrollToTop}
        $visible={visible}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
      >
        <MdOutlineKeyboardArrowUp size="2.8rem" />
      </TopButton>
    </>
  );
};

export default ScrollTools;
