"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const places = [
  { name: "Cala Aiguablava", desc: "The beach", distance: "~3 min" },
  { name: "Begur", desc: "Medieval hilltop village", distance: "~10 min" },
  { name: "Sa Riera", desc: "Charming fishing cove", distance: "~8 min" },
  { name: "Tamariu", desc: "Secluded bay village", distance: "~12 min" },
  { name: "Pals", desc: "Medieval walled town", distance: "~20 min" },
];

export default function Location() {
  const { ref, inView } = useInView();

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      ref={ref}
      className="w-full"
      style={{ backgroundColor: "#F4F1EA" }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Full-width coastline image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "21/9",
            minHeight: "280px",
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <Image
            src="/aiguablava/coastline.png"
            alt="Cala Aiguablava bay — secluded turquoise cove surrounded by pine-covered hills on the Costa Brava"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient for text legibility */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(23,23,23,0.7) 0%, rgba(23,23,23,0.1) 60%, transparent 100%)" }}
          />
          <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
              }}
            >
              <span
                className="text-[10px] tracking-[0.35em] uppercase block mb-4"
                style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
              >
                Location
              </span>
              <h2
                id="location-heading"
                className="leading-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  color: "#F4F1EA",
                  letterSpacing: "-0.01em",
                }}
              >
                Aiguablava, Begur.
              </h2>
            </div>
          </div>
        </div>

        {/* Location content */}
        <div
          className="px-6 md:px-16 lg:px-24 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
          }}
        >
          {/* Description */}
          <div>
            <p
              className="mb-6 leading-relaxed"
              style={{
                color: "#5A5A5A",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1.0625rem",
                lineHeight: 1.85,
              }}
            >
              One of the Costa Brava&apos;s most captivating coastal settings, where pine-covered hills meet clear Mediterranean waters. Aiguablava is known for its seclusion and natural beauty — a place that has remained unspoiled.
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
              The village of Begur, with its medieval castle and whitewashed streets, is just minutes away. Excellent restaurants, boutique shops and a vibrant local market define life here throughout the year.
            </p>

            {/* Map placeholder */}
            <div
              className="mt-10 relative overflow-hidden flex items-center justify-center"
              style={{
                height: "240px",
                backgroundColor: "#E8E3D9",
                border: "1px solid rgba(184,176,162,0.4)",
              }}
              aria-label="Map showing Aiguablava, Begur, Costa Brava"
              role="img"
            >
              <div className="text-center px-8">
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                >
                  Aiguablava · Begur · Costa Brava
                </div>
                <div
                  className="text-sm"
                  style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                >
                  41°56&apos;N, 3°13&apos;E
                </div>
              </div>
              {/* Decorative dot */}
              <div
                className="absolute"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#A58B68" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] tracking-widest uppercase whitespace-nowrap"
                  style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
                >
                  Aiguablava
                </div>
              </div>
            </div>
          </div>

          {/* Nearby places */}
          <div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-8"
              style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
            >
              Nearby
            </div>
            <ul className="space-y-0" aria-label="Nearby places and distances">
              {places.map((place, i) => (
                <li
                  key={place.name}
                  className="flex items-center justify-between py-5"
                  style={{
                    borderBottom: i < places.length - 1 ? "1px solid rgba(184,176,162,0.3)" : "none",
                  }}
                >
                  <div>
                    <div
                      className="font-light mb-0.5"
                      style={{ fontFamily: "var(--font-serif)", color: "#171717", fontSize: "1.125rem" }}
                    >
                      {place.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                    >
                      {place.desc}
                    </div>
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
                  >
                    {place.distance}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
