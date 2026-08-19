"use client";

import { useEffect, useRef, useState } from "react";

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

const stats = [
  { value: "262 m²", label: "Interior space" },
  { value: "1,000 m²", label: "Private grounds" },
  { value: "4", label: "Bedrooms" },
  { value: "4", label: "Bathrooms" },
  { value: "Private", label: "Swimming pool" },
  { value: "Sea", label: "Views" },
];

export default function PropertyStats() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      aria-labelledby="stats-heading"
      ref={ref}
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: "#171717" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Section label */}
        <div
          className="mb-16 md:mb-20 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          <span
            id="stats-heading"
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
          >
            The Property
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                borderRight: "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease ${0.1 + i * 0.08}s, transform 0.8s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <div
                className="text-3xl md:text-4xl font-light mb-2 leading-none"
                style={{ fontFamily: "var(--font-serif)", color: "#F4F1EA" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(184,176,162,0.6)", fontFamily: "var(--font-dm)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div
          className="mt-16 md:mt-20 flex justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300 border"
            style={{
              color: "#F4F1EA",
              borderColor: "rgba(244,241,234,0.2)",
              fontFamily: "var(--font-dm)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F4F1EA";
              (e.currentTarget as HTMLAnchorElement).style.color = "#171717";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#F4F1EA";
            }}
          >
            Request a Private Viewing
          </a>
        </div>
      </div>
    </section>
  );
}
