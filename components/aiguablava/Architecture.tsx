"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/basePath";

function useInView(threshold = 0.1) {
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

export default function Architecture() {
  const { ref, inView } = useInView();

  return (
    <section
      id="architecture"
      aria-labelledby="arch-heading"
      ref={ref}
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: "#F4F1EA" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase block mb-4"
            style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
          >
            Architecture
          </span>
          <h2
            id="arch-heading"
            className="leading-tight max-w-2xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#171717",
              letterSpacing: "-0.01em",
            }}
          >
            Modern Mediterranean,<br />
            <em style={{ fontStyle: "italic" }}>shaped by its surroundings.</em>
          </h2>
        </div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-end">
          {/* Large image — 7 columns */}
          <div
            className="lg:col-span-7 relative overflow-hidden"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            <div className="relative" style={{ aspectRatio: "16/11" }}>
              <Image
                src={withBase("/aiguablava/interior.png")}
                alt="Interior living space of Aiguablava Residence — open plan with floor-to-ceiling windows and sea view"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Text — 5 columns, offset down */}
          <div
            className="lg:col-span-5 lg:pl-16 lg:pb-12"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
            }}
          >
            <p
              className="mb-8 leading-relaxed"
              style={{
                color: "#5A5A5A",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1.0625rem",
                lineHeight: 1.85,
              }}
            >
              Every space is oriented toward natural light and the Mediterranean horizon. Open interiors flow seamlessly into private outdoor terraces and gardens — a dialogue between architecture and landscape.
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: "#5A5A5A",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1.0625rem",
                lineHeight: 1.85,
              }}
            >
              Clean lines and natural materials define the aesthetic. The residence is both restrained and generous — private yet open to the sky and sea that surround it.
            </p>

            {/* Feature list */}
            <ul
              className="mt-10 space-y-3"
              aria-label="Architectural features"
            >
              {[
                "Floor-to-ceiling glass",
                "Indoor / outdoor connection",
                "Private pool and garden",
                "Sea-facing terraces",
                "Natural material palette",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#5A5A5A", fontFamily: "var(--font-dm)" }}
                >
                  <span
                    className="block w-4 h-px"
                    style={{ backgroundColor: "#A58B68" }}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
