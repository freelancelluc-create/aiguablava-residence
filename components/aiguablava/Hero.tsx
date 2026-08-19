"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = () => {
    const el = document.getElementById("residence");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Aiguablava Residence — Hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: loaded ? "scale(1)" : "scale(1.04)",
          transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Image
          src="/aiguablava/hero.png"
          alt="Aiguablava Residence — luxury Mediterranean villa with sea views, Begur, Costa Brava"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Gradient overlays — cinematic layering */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(23,23,23,0.45) 0%, rgba(23,23,23,0.1) 40%, rgba(23,23,23,0.05) 60%, rgba(23,23,23,0.65) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
        {/* Location badge */}
        <div
          className="mb-6 md:mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "rgba(244,241,234,0.7)", fontFamily: "var(--font-dm)" }}
          >
            Aiguablava · Begur · Costa Brava
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="mb-4 md:mb-6 leading-none"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            color: "#F4F1EA",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            letterSpacing: "-0.01em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease 0.5s, transform 1s ease 0.5s",
          }}
        >
          Where architecture<br />
          <em style={{ fontStyle: "italic" }}>meets the Mediterranean.</em>
        </h1>

        {/* Subline */}
        <p
          className="mb-8 md:mb-10 max-w-lg"
          style={{
            color: "rgba(244,241,234,0.75)",
            fontFamily: "var(--font-dm)",
            fontWeight: 300,
            fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)",
            lineHeight: 1.7,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.7s, transform 1s ease 0.7s",
          }}
        >
          A private residence overlooking the extraordinary coastline of Aiguablava.
        </p>

        {/* Property stats row */}
        <div
          className="flex items-center gap-6 md:gap-10 mb-10 md:mb-12 flex-wrap"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(15px)",
            transition: "opacity 1s ease 0.85s, transform 1s ease 0.85s",
          }}
        >
          <div>
            <div
              className="text-xl md:text-2xl font-light"
              style={{ color: "#F4F1EA", fontFamily: "var(--font-serif)" }}
            >
              €1,725,000
            </div>
          </div>
          <div
            className="w-px h-6 hidden sm:block"
            style={{ backgroundColor: "rgba(244,241,234,0.25)" }}
          />
          <div
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(244,241,234,0.6)", fontFamily: "var(--font-dm)" }}
          >
            4 Bedrooms · 4 Bathrooms · 262 m²
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(15px)",
            transition: "opacity 1s ease 1s, transform 1s ease 1s",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-7 py-3.5 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300"
            style={{
              backgroundColor: "#F4F1EA",
              color: "#171717",
              fontFamily: "var(--font-dm)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8E3D9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F4F1EA";
            }}
          >
            Request a Private Viewing
          </a>
          <a
            href="#residence"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("residence")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-7 py-3.5 text-[10px] tracking-[0.25em] uppercase text-center transition-all duration-300 border"
            style={{
              color: "#F4F1EA",
              borderColor: "rgba(244,241,234,0.4)",
              fontFamily: "var(--font-dm)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(244,241,234,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(244,241,234,0.4)";
            }}
          >
            Explore the Residence
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        onClick={scrollDown}
        aria-label="Scroll to explore the residence"
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 cursor-pointer border-0 bg-transparent"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(244,241,234,0.5)", fontFamily: "var(--font-dm)" }}
        >
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden" style={{ backgroundColor: "rgba(244,241,234,0.2)" }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              backgroundColor: "rgba(244,241,234,0.7)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </button>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(350%); }
        }
      `}</style>
    </section>
  );
}
