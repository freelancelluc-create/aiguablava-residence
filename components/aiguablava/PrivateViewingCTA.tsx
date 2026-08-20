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

export default function PrivateViewingCTA() {
  const { ref, inView } = useInView();

  return (
    <section
      aria-labelledby="cta-heading"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "560px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={withBase("/aiguablava/pool.png")}
          alt="Infinity pool at Aiguablava Residence — private viewing CTA background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(23,23,23,0.72)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-28 md:py-40 flex flex-col items-center text-center">
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase block mb-8"
            style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
          >
            Private Viewing
          </span>
        </div>

        <h2
          id="cta-heading"
          className="mb-6 leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: "clamp(2.25rem, 5vw, 5rem)",
            color: "#F4F1EA",
            letterSpacing: "-0.01em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
          }}
        >
          Come and experience<br />
          <em style={{ fontStyle: "italic" }}>it for yourself.</em>
        </h2>

        <p
          className="mb-12 max-w-md"
          style={{
            color: "rgba(244,241,234,0.65)",
            fontFamily: "var(--font-dm)",
            fontWeight: 300,
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
          }}
        >
          Request a private viewing and discover Aiguablava from a different perspective.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300"
            style={{
              backgroundColor: "#F4F1EA",
              color: "#171717",
              fontFamily: "var(--font-dm)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8E3D9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F4F1EA"; }}
          >
            Request a Private Viewing
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300 border"
            style={{
              color: "#F4F1EA",
              borderColor: "rgba(244,241,234,0.3)",
              fontFamily: "var(--font-dm)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(244,241,234,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(244,241,234,0.3)"; }}
          >
            Contact Us
          </a>
          <a
            href="https://wa.me/34689425955?text=Hello,%20I%20am%20interested%20in%20Aiguablava%20Residence"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300 border"
            style={{
              color: "#A58B68",
              borderColor: "rgba(165,139,104,0.3)",
              fontFamily: "var(--font-dm)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(165,139,104,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(165,139,104,0.3)"; }}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
