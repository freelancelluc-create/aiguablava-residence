"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Residence", href: "#residence" },
  { label: "Architecture", href: "#architecture" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(244,241,234,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,176,162,0.3)" : "none",
        }}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo / Brand */}
          <a
            href="#"
            aria-label="Aiguablava Residence — Back to top"
            className="flex flex-col leading-none"
            style={{ color: scrolled ? "#171717" : "#F4F1EA" }}
          >
            <span
              className="text-xs tracking-[0.25em] uppercase font-light"
              style={{ fontFamily: "var(--font-dm)", letterSpacing: "0.2em" }}
            >
              Aiguablava
            </span>
            <span
              className="text-[11px] tracking-[0.15em] uppercase opacity-60"
              style={{ fontFamily: "var(--font-dm)", letterSpacing: "0.15em" }}
            >
              Residence
            </span>
          </a>

          {/* Desktop links */}
          <ul
            className="hidden md:flex items-center gap-8"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[11px] tracking-[0.2em] uppercase font-light transition-opacity duration-200 hover:opacity-60 cursor-pointer bg-transparent border-0"
                  style={{
                    color: scrolled ? "#171717" : "#F4F1EA",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-200 cursor-pointer"
              style={{
                color: scrolled ? "#171717" : "#F4F1EA",
                borderColor: scrolled ? "rgba(23,23,23,0.35)" : "rgba(244,241,234,0.45)",
                backgroundColor: "transparent",
                fontFamily: "var(--font-dm)",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = scrolled ? "#171717" : "#F4F1EA";
                btn.style.color = scrolled ? "#F4F1EA" : "#171717";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "transparent";
                btn.style.color = scrolled ? "#171717" : "#F4F1EA";
              }}
            >
              Private Viewing
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                backgroundColor: scrolled ? "#171717" : "#F4F1EA",
                transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: scrolled ? "#171717" : "#F4F1EA",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                backgroundColor: scrolled ? "#171717" : "#F4F1EA",
                transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          backgroundColor: "#171717",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex flex-col justify-center items-center h-full gap-10 px-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block text-3xl font-light tracking-widest uppercase transition-opacity duration-200 hover:opacity-50 cursor-pointer bg-transparent border-0"
              style={{
                color: "#F4F1EA",
                fontFamily: "var(--font-serif)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="mt-8 text-xs tracking-[0.25em] uppercase px-8 py-4 border cursor-pointer bg-transparent"
            style={{
              color: "#F4F1EA",
              borderColor: "rgba(244,241,234,0.3)",
              fontFamily: "var(--font-dm)",
              transitionDelay: menuOpen ? "320ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.5s ease 320ms`,
            }}
          >
            Request Private Viewing
          </button>
        </div>
      </div>
    </>
  );
}
