"use client";

const navLinks = [
  { label: "Residence", href: "#residence" },
  { label: "Architecture", href: "#architecture" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="w-full"
      style={{ backgroundColor: "#171717" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pt-20 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: "#F4F1EA", fontFamily: "var(--font-dm)" }}
              >
                Aiguablava
              </div>
              <div
                className="text-[10px] tracking-[0.15em] uppercase opacity-40"
                style={{ color: "#F4F1EA", fontFamily: "var(--font-dm)" }}
              >
                Residence
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(244,241,234,0.35)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
            >
              A private residence on the Costa Brava.<br />
              Aiguablava, Begur, Spain.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-[9px] tracking-[0.25em] uppercase mb-6"
              style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
            >
              Navigation
            </div>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm transition-opacity hover:opacity-60 cursor-pointer bg-transparent border-0 p-0 text-left"
                      style={{ color: "rgba(244,241,234,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-[9px] tracking-[0.25em] uppercase mb-6"
              style={{ color: "#A58B68", fontFamily: "var(--font-dm)" }}
            >
              Contact
            </div>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="mailto:freelancelluc@gmail.com"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "rgba(244,241,234,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                >
                  freelancelluc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+34689425955"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "rgba(244,241,234,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                >
                  +34 689 425 955
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34689425955?text=Hello,%20I%20am%20interested%20in%20Aiguablava%20Residence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "rgba(244,241,234,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                >
                  WhatsApp · +34 689 425 955
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between">
          {/* Legal links */}
          <div className="flex gap-6 order-2 md:order-1">
            <a
              href="/privacy"
              className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "rgba(244,241,234,0.25)", fontFamily: "var(--font-dm)" }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "rgba(244,241,234,0.25)", fontFamily: "var(--font-dm)" }}
            >
              Terms
            </a>
          </div>

          {/* Legal disclaimer — required per spec */}
          <div
            className="text-center order-3 md:order-2"
            style={{ color: "rgba(244,241,234,0.18)", fontFamily: "var(--font-dm)", fontSize: "0.625rem", letterSpacing: "0.1em" }}
          >
            Independent design concept. Not affiliated with the property owner or listing agency.
          </div>

          {/* Language selector placeholder */}
          <div className="flex gap-3 order-1 md:order-3">
            <button
              className="text-[10px] tracking-[0.15em] uppercase cursor-pointer border-0 bg-transparent transition-opacity"
              style={{ color: "rgba(244,241,234,0.5)", fontFamily: "var(--font-dm)" }}
              aria-label="View in English (current)"
            >
              EN
            </button>
            <span style={{ color: "rgba(244,241,234,0.15)" }}>·</span>
            <button
              className="text-[10px] tracking-[0.15em] uppercase cursor-pointer border-0 bg-transparent transition-opacity hover:opacity-60"
              style={{ color: "rgba(244,241,234,0.25)", fontFamily: "var(--font-dm)" }}
              aria-label="View in Spanish (coming soon)"
              title="Spanish version coming soon"
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
