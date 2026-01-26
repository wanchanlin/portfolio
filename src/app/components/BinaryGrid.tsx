"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BinaryGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isClicked = useRef(false);

  // Configuration
  const xMax = 12;
  const yMax = 24;
  const pullDistance = 70;

  const [bits, setBits] = useState<number[]>(() => Array(xMax * yMax).fill(0));

  useEffect(() => {
    // 1. Client-side randomization
    setBits((prev) => prev.map(() => Math.round(Math.random())));

    // 2. Cache positions to avoid Layout Thrashing (reading getBoundingClientRect in a loop)
    const updatePositions = () => {
      cellsRef.current.forEach((cell) => {
        if (!cell) return;
        const rect = cell.getBoundingClientRect();
        // Storing on the element for GSAP access
        (cell as any)._center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
    };

    const initRAF = requestAnimationFrame(updatePositions);
    window.addEventListener("resize", updatePositions);

    // 3. Optimized Pointer Logic
    const handlePointerMove = (e: PointerEvent) => {
      if (isClicked.current) return;
      const { clientX, clientY } = e;

      cellsRef.current.forEach((cell) => {
        if (!cell || !(cell as any)._center) return;
        
        const pos = (cell as any)._center;
        const diffX = clientX - pos.x;
        const diffY = clientY - pos.y;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        if (distance < pullDistance) {
          const percent = distance / pullDistance;
          (cell as any)._isPulled = true;
          gsap.to(cell, {
            duration: 0.3,
            x: diffX * (1 - percent) * 0.5, // Subtle pull toward mouse
            y: diffY * (1 - percent) * 0.5,
            overwrite: "auto",
            ease: "power1.out"
          });
        } else if ((cell as any)._isPulled) {
          (cell as any)._isPulled = false;
          gsap.to(cell, {
            duration: 0.8,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelAnimationFrame(initRAF);
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleCellClick = (index: number) => {
    if (isClicked.current) return;
    isClicked.current = true;

    gsap.to(cellsRef.current, {
      duration: 1.2,
      x: () => (Math.random() - 0.5) * 800,
      y: () => (Math.random() - 0.5) * 800,
      opacity: 0,
      scale: 0,
      rotation: () => Math.random() * 720,
      stagger: {
        grid: [xMax, yMax],
        from: index,
        amount: 0.4,
      },
      onComplete: () => {
        gsap.to(cellsRef.current, {
          duration: 1,
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: "back.out(1.7)",
          delay: 0.3,
          onComplete: () => {
            isClicked.current = false;
          },
        });
      },
    });
  };

  return (
    <div className="flex my-8 h-fit w-full items-center justify-center overflow-hidden select-none">
      <div ref={containerRef} className="flex flex-col gap-4">
        {Array.from({ length: xMax }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {Array.from({ length: yMax }).map((_, colIndex) => {
              const index = rowIndex * yMax + colIndex;
              return (
                <div
                  key={colIndex}
                  ref={(el) => { cellsRef.current[index] = el; }}
                  onPointerUp={() => handleCellClick(index)}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[var(--foreground)] text-xs font-bold will-change-transform"
                >
                  {bits[index]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryGrid;