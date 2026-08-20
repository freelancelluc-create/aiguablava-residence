"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/basePath";

function useInView(threshold = 0.15) {
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

export default function Introduction() {
  const { ref, inView } = useInView();

  return (
    <section
      id="residence"
      aria-labelledby="intro-heading"
      ref={ref}
      className="w-full py-24 md:py-36 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#F4F1EA" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text column */}
          <div>
            <div
              className="mb-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
              }}
            >
              <span
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
              >
                The Residence
              </span>
            </div>

            <h2
              id="intro-heading"
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                color: "#171717",
                fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                letterSpacing: "-0.01em",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              }}
            >
              Designed for<br />
              <em style={{ fontStyle: "italic" }}>Mediterranean living.</em>
            </h2>

            <p
              className="mb-8 leading-relaxed max-w-md"
              style={{
                color: "#5A5A5A",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
              }}
            >
              Set above the coastline of Aiguablava, this contemporary residence combines clean architectural lines, private outdoor spaces and expansive views of the Mediterranean — crafted for those who value quiet, beauty and space.
            </p>

            <div
              className="pt-8"
              style={{
                borderTop: "1px solid rgba(184,176,162,0.4)",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.9s ease 0.5s",
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div
                    className="text-3xl mb-1 font-light"
                    style={{ fontFamily: "var(--font-serif)", color: "#171717" }}
                  >
                    262 m²
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                  >
                    Built area
                  </div>
                </div>
                <div>
                  <div
                    className="text-3xl mb-1 font-light"
                    style={{ fontFamily: "var(--font-serif)", color: "#171717" }}
                  >
                    2023
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                  >
                    Contemporary build
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div
            className="relative overflow-hidden"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            }}
          >
            <div className="relative" style={{ aspectRatio: "4/5" }}>
              <Image
                src={withBase("/aiguablava/architecture.png")}
                alt="Aiguablava Residence exterior — contemporary Mediterranean architecture with clean lines and stone terrace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative offset border */}
            <div
              className="absolute -bottom-4 -right-4 w-3/4 h-1/2 -z-10"
              style={{ border: "1px solid rgba(165,139,104,0.3)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
