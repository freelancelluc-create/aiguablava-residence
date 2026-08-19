"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const images = [
  {
    src: "/aiguablava/pool.png",
    alt: "Infinity pool at Aiguablava Residence with Mediterranean sea view",
    caption: "The pool",
    aspect: "portrait" as const,
  },
  {
    src: "/aiguablava/terrace.png",
    alt: "Shaded terrace with outdoor dining and sea views",
    caption: "Outdoor living",
    aspect: "landscape" as const,
  },
  {
    src: "/aiguablava/garden.png",
    alt: "Private garden at dusk with olive trees and villa illuminated",
    caption: "The garden",
    aspect: "landscape" as const,
  },
];

export default function LivingExperience() {
  const { ref, inView } = useInView();

  return (
    <section
      aria-labelledby="living-heading"
      ref={ref}
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: "#171717" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div
          className="mb-16 md:mb-20 max-w-xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase block mb-5"
            style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
          >
            The Experience
          </span>
          <h2
            id="living-heading"
            className="leading-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
              color: "#F4F1EA",
              letterSpacing: "-0.01em",
            }}
          >
            Made for slow<br />
            <em style={{ fontStyle: "italic" }}>Mediterranean days.</em>
          </h2>
        </div>

        {/* Immersive image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-16">
          {/* Pool — portrait, tall left column */}
          <div
            className="md:col-span-4 relative overflow-hidden group"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            <div className="relative" style={{ aspectRatio: "3/4" }}>
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: "linear-gradient(to top, rgba(23,23,23,0.7) 0%, transparent 100%)" }}
              >
                <span
                  className="text-[9px] tracking-[0.25em] uppercase"
                  style={{ color: "rgba(244,241,234,0.6)", fontFamily: "var(--font-dm)" }}
                >
                  {images[0].caption}
                </span>
              </div>
            </div>
          </div>

          {/* Right column — two landscape images stacked */}
          <div className="md:col-span-8 flex flex-col gap-4 md:gap-5">
            <div
              className="relative overflow-hidden group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
              }}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(23,23,23,0.7) 0%, transparent 100%)" }}
                >
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "rgba(244,241,234,0.6)", fontFamily: "var(--font-dm)" }}
                  >
                    {images[1].caption}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="relative overflow-hidden group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 0.5s, transform 1s ease 0.5s",
              }}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(23,23,23,0.7) 0%, transparent 100%)" }}
                >
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "rgba(244,241,234,0.6)", fontFamily: "var(--font-dm)" }}
                  >
                    {images[2].caption}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial text block */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.9s ease 0.6s",
          }}
        >
          {[
            { time: "Morning", desc: "Coffee and sea light from the terrace as the Mediterranean wakes." },
            { time: "Afternoon", desc: "Long lunches under the shade. The pool. The silence of the pines." },
            { time: "Evening", desc: "The sky turns ochre over the water. The residence glows from within." },
          ].map((item) => (
            <div key={item.time}>
              <div
                className="text-lg mb-3 font-light italic"
                style={{ fontFamily: "var(--font-serif)", color: "#F4F1EA" }}
              >
                {item.time}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(244,241,234,0.5)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
