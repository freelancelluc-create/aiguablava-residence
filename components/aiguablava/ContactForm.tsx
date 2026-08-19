"use client";

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

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  contact: string;
}

export default function ContactForm() {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState<FormState>("idle");
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    contact: "email",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!data.name.trim()) newErrors.name = "Please enter your full name.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Please enter a valid email address.";
    if (!data.message.trim()) newErrors.message = "Please add a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("loading");
    // Simulated submit — replace with real backend/service
    setTimeout(() => {
      setFormState("success");
    }, 1800);
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: "100%",
    padding: "14px 0",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1px solid ${hasError ? "#c0392b" : "rgba(184,176,162,0.5)"}`,
    color: "#171717",
    fontFamily: "var(--font-dm)",
    fontWeight: 300,
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      ref={ref}
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: "#F4F1EA" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left — contact info */}
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
              Contact
            </span>
            <h2
              id="contact-heading"
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
                color: "#171717",
                letterSpacing: "-0.01em",
              }}
            >
              Arrange a private<br />
              <em style={{ fontStyle: "italic" }}>viewing.</em>
            </h2>
            <p
              className="mb-12 leading-relaxed"
              style={{
                color: "#5A5A5A",
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.85,
              }}
            >
              We are available to answer your questions and arrange a private viewing of the residence at a time that suits you.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  label: "Email",
                  value: "freelancelluc@gmail.com",
                  href: "mailto:freelancelluc@gmail.com",
                },
                {
                  label: "Phone",
                  value: "+34 689 425 955",
                  href: "tel:+34689425955",
                },
                {
                  label: "WhatsApp",
                  value: "+34 689 425 955",
                  href: "https://wa.me/34689425955?text=Hello,%20I%20am%20interested%20in%20Aiguablava%20Residence",
                },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="flex items-start gap-6 py-5"
                  style={{ borderBottom: "1px solid rgba(184,176,162,0.3)" }}
                >
                  <div
                    className="text-[9px] tracking-[0.2em] uppercase w-20 flex-shrink-0 mt-0.5"
                    style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                  >
                    {contact.label}
                  </div>
                  <a
                    href={contact.href}
                    target={contact.label === "WhatsApp" ? "_blank" : undefined}
                    rel={contact.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="transition-opacity hover:opacity-60"
                    style={{
                      color: "#171717",
                      fontFamily: "var(--font-dm)",
                      fontWeight: 300,
                      fontSize: "0.9375rem",
                    }}
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            {formState === "success" ? (
              <div
                className="flex flex-col items-start justify-center h-full gap-6 py-16"
                style={{ borderTop: "1px solid rgba(184,176,162,0.4)" }}
              >
                <div
                  className="text-4xl font-light italic"
                  style={{ fontFamily: "var(--font-serif)", color: "#171717" }}
                >
                  Thank you.
                </div>
                <p
                  style={{
                    color: "#5A5A5A",
                    fontFamily: "var(--font-dm)",
                    fontWeight: 300,
                    lineHeight: 1.8,
                  }}
                >
                  Your message has been received. We will be in touch shortly to arrange your private viewing.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form — request a private viewing"
              >
                <div className="space-y-8">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="ar-name"
                      className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="ar-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-describedby={errors.name ? "ar-name-error" : undefined}
                      placeholder="Your full name"
                      value={data.name}
                      onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                      style={inputStyle(errors.name)}
                    />
                    {errors.name && (
                      <p
                        id="ar-name-error"
                        role="alert"
                        className="mt-1 text-xs"
                        style={{ color: "#c0392b", fontFamily: "var(--font-dm)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="ar-email"
                      className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="ar-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-describedby={errors.email ? "ar-email-error" : undefined}
                      placeholder="your@email.com"
                      value={data.email}
                      onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                      style={inputStyle(errors.email)}
                    />
                    {errors.email && (
                      <p
                        id="ar-email-error"
                        role="alert"
                        className="mt-1 text-xs"
                        style={{ color: "#c0392b", fontFamily: "var(--font-dm)" }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="ar-phone"
                      className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="ar-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+44 (or your country code)"
                      value={data.phone}
                      onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                      style={inputStyle()}
                    />
                  </div>

                  {/* Preferred contact */}
                  <div>
                    <fieldset>
                      <legend
                        className="block text-[9px] tracking-[0.25em] uppercase mb-3"
                        style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                      >
                        Preferred contact method
                      </legend>
                      <div className="flex gap-8">
                        {["email", "phone", "whatsapp"].map((method) => (
                          <label
                            key={method}
                            className="flex items-center gap-2 cursor-pointer text-sm capitalize"
                            style={{ color: "#5A5A5A", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                          >
                            <input
                              type="radio"
                              name="contact"
                              value={method}
                              checked={data.contact === method}
                              onChange={(e) => setData((d) => ({ ...d, contact: e.target.value }))}
                              style={{ accentColor: "#A58B68" }}
                            />
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="ar-message"
                      className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "#B8B0A2", fontFamily: "var(--font-dm)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="ar-message"
                      name="message"
                      rows={4}
                      required
                      aria-required="true"
                      aria-describedby={errors.message ? "ar-message-error" : undefined}
                      placeholder="I would like to arrange a private viewing of the residence..."
                      value={data.message}
                      onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                      style={{
                        ...inputStyle(errors.message),
                        resize: "none",
                        paddingTop: "14px",
                      }}
                    />
                    {errors.message && (
                      <p
                        id="ar-message-error"
                        role="alert"
                        className="mt-1 text-xs"
                        style={{ color: "#c0392b", fontFamily: "var(--font-dm)" }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      aria-disabled={formState === "loading"}
                      className="px-8 py-4 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#171717",
                        color: "#F4F1EA",
                        fontFamily: "var(--font-dm)",
                        border: "none",
                        cursor: formState === "loading" ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (formState !== "loading")
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2A2A2A";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#171717";
                      }}
                    >
                      {formState === "loading" ? "Sending..." : "Request Private Viewing"}
                    </button>

                    {formState === "error" && (
                      <p
                        role="alert"
                        className="mt-4 text-sm"
                        style={{ color: "#c0392b", fontFamily: "var(--font-dm)" }}
                      >
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
