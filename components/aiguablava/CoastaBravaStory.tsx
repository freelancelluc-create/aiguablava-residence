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

export default function CoastaBravaStory() {
  const { ref, inView } = useInView();

  return (
    <section
      aria-labelledby="costa-brava-heading"
      ref={ref}
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: "#171717" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image — full bleed left */}
          <div
            className="relative overflow-hidden order-last lg:order-first"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            <div className="relative" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/aiguablava/location.png"
                alt="Begur medieval village on Costa Brava — stone castle and whitewashed houses above Mediterranean forest"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Caption */}
            <div
              className="mt-4"
              style={{
                color: "rgba(244,241,234,0.3)",
                fontFamily: "var(--font-dm)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                fontWeight: 300,
              }}
            >
              Begur, Costa Brava — 10 minutes from the residence
            </div>
          </div>

          {/* Text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
            }}
          >
            <span
              className="text-[10px] tracking-[0.35em] uppercase block mb-8"
              style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
            >
              The Costa Brava
            </span>
            <h2
              id="costa-brava-heading"
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
                color: "#F4F1EA",
                letterSpacing: "-0.01em",
              }}
            >
              A coastline that<br />
              <em style={{ fontStyle: "italic" }}>stays with you.</em>
            </h2>

            <p
              className="mb-6 leading-relaxed"
              style={{
                color: "rgba(244,241,234,0.55)",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.85,
              }}
            >
              The Costa Brava has long been one of Europe&apos;s most sought-after coastal destinations — not for its crowds, but for its character. Hidden coves, pine-covered cliffs, and medieval villages that seem untouched by time.
            </p>
            <p
              className="mb-10 leading-relaxed"
              style={{
                color: "rgba(244,241,234,0.55)",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.85,
              }}
            >
              Begur sits at the heart of it — a village with Michelin-starred restaurants, local markets, and a calendar of cultural life throughout the year. From here, the best beaches of Aiguablava, Sa Riera and Tamariu are all within reach.
            </p>

            {/* Highlights */}
            <div
              className="grid grid-cols-2 gap-x-8 gap-y-5 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                "Hidden coastal coves",
                "Medieval village of Begur",
                "Mediterranean gastronomy",
                "Coastal walking paths",
                "Year-round mild climate",
                "Cultural calendar",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(244,241,234,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                >
                  <span
                    className="block w-3 h-px flex-shrink-0"
                    style={{ backgroundColor: "#A58B68" }}
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
