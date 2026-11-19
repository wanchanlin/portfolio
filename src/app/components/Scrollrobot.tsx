"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const FRAME_COUNT = 11;
const ROBOT_TRAVEL_PX = 128;

const frameSrc = (frame: number) =>
  `/images/robot_rotation/robot_${String(frame).padStart(2, "0")}.png`;

export function ScrollRobot({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    let animationFrame = 0;

    // Keep the next frames ready so scrolling does not flash an empty image.
    for (let index = 0; index < FRAME_COUNT; index++) {
      const image = new Image();
      image.src = frameSrc(index + 1);
    }

    const updateFrame = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / scrollDistance)
      );

      setFrame(1 + Math.round(progress * (FRAME_COUNT - 1)));

      const robotProgress = Math.min(1, Math.max(0, (progress - 0.2) / 0.25));
      const verticalOffset = robotProgress * ROBOT_TRAVEL_PX;

      if (robotRef.current) {
        robotRef.current.style.transform = `translate3d(0, ${verticalOffset}px, 0)`;
      }

      if (textRef.current) {
        const textDistance = Math.max(
          0,
          textRef.current.scrollWidth - section.clientWidth
        );
        textRef.current.style.transform = `translate3d(${-progress * textDistance}px, calc(-50% + ${verticalOffset}px), 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute top-20
         z-20 w-full md:top-0">
          {children}
        </div>

        <div
          ref={textRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 z-0 flex w-max whitespace-nowrap text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-none tracking-tight text-[var(--foreground)] opacity-40 will-change-transform"
          style={{ transform: "translate3d(0, -50%, 0)" }}
        >
          <span>DESIGN / CODE / COFFEE / COOKING / CODE / CREATE /</span>
        </div>

        <div ref={robotRef} className="relative z-10 w-[160vw] shrink-0 overflow-hidden rounded-lg will-change-transform md:w-full md:max-w-5xl">
          <img
            src={frameSrc(frame)}
            alt="Robot rotating as you scroll"
            className="block h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
