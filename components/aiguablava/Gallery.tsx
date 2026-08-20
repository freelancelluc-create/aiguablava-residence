"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/basePath";

const galleryImages = [
  { src: withBase("/aiguablava/hero.png"), alt: "Aiguablava Residence exterior — villa perched above Mediterranean sea", caption: "The Residence" },
  { src: withBase("/aiguablava/pool.png"), alt: "Infinity pool with turquoise Mediterranean sea view", caption: "The Pool" },
  { src: withBase("/aiguablava/interior.png"), alt: "Open-plan interior living space with sea views", caption: "Living Space" },
  { src: withBase("/aiguablava/terrace.png"), alt: "Shaded terrace with outdoor dining table and sea view", caption: "The Terrace" },
  { src: withBase("/aiguablava/architecture.png"), alt: "Architectural exterior facade — clean contemporary Mediterranean design", caption: "Architecture" },
  { src: withBase("/aiguablava/garden.png"), alt: "Private garden at dusk with illuminated villa and olive trees", caption: "The Garden" },
  { src: withBase("/aiguablava/coastline.png"), alt: "Cala Aiguablava bay — turquoise cove surrounded by pine forests", caption: "Aiguablava Bay" },
  { src: withBase("/aiguablava/location.png"), alt: "Begur hilltop village on Costa Brava with sea views", caption: "Begur" },
];

function useInView(threshold = 0.05) {
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

export default function Gallery() {
  const { ref, inView } = useInView();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        ref={ref}
        className="w-full py-24 md:py-36"
        style={{ backgroundColor: "#F4F1EA" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
          {/* Header */}
          <div
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div>
              <span
                className="text-[10px] tracking-[0.35em] uppercase block mb-4"
                style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
              >
                Gallery
              </span>
              <h2
                id="gallery-heading"
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  fontSize: "clamp(1.75rem, 3vw, 3rem)",
                  color: "#171717",
                  letterSpacing: "-0.01em",
                }}
              >
                A closer look at the residence.
              </h2>
            </div>
            <p
              className="text-sm max-w-xs text-right hidden md:block"
              style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)", fontWeight: 300 }}
            >
              Click any image to view full screen. Use arrow keys to navigate.
            </p>
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${img.caption} in fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.8s ease ${0.05 * i}s, transform 0.8s ease ${0.05 * i}s`,
                }}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "16/10" : "4/3" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-5 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(23,23,23,0.65) 0%, transparent 60%)",
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  >
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase"
                      style={{ color: "rgba(244,241,234,0.8)", fontFamily: "var(--font-dm)" }}
                    >
                      {img.caption}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(23,23,23,0.97)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery — ${galleryImages[lightboxIndex].caption}`}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute top-6 right-6 text-[10px] tracking-[0.25em] uppercase cursor-pointer border-0 bg-transparent transition-opacity hover:opacity-60"
            style={{ color: "rgba(244,241,234,0.6)", fontFamily: "var(--font-dm)" }}
          >
            Close
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 cursor-pointer border-0 bg-transparent p-3 transition-opacity hover:opacity-60"
            style={{ color: "rgba(244,241,234,0.6)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-5xl w-full mx-16 md:mx-24">
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="mt-4 text-center">
              <span
                className="text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(244,241,234,0.4)", fontFamily: "var(--font-dm)" }}
              >
                {galleryImages[lightboxIndex].caption} — {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 md:right-8 cursor-pointer border-0 bg-transparent p-3 transition-opacity hover:opacity-60"
            style={{ color: "rgba(244,241,234,0.6)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
