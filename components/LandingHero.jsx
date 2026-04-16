"use client";

const FRAME_PREVIEWS = [
  { src: "/image/bluewood.png", label: "Blue Wood", accent: "#818CF8" },
  { src: "/image/wood2.png", label: "Walnut", accent: "#A78BFA" },
  { src: "/image/wood3.jpeg", label: "Oak", accent: "#67E8F9" },
  { src: "/image/frameside.png", label: "Classic", accent: "#818CF8" },
  { src: "/image/frame.png", label: "Natural", accent: "#34D399" },
  { src: "/image/uniqueframe.png", label: "Unique", accent: "#F472B6" },
];

function FrameStrip({ src, label, accent }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: 130,
        borderRadius: 14,
        overflow: "hidden",
        border: `1.5px solid ${accent}33`,
        background: "#1E293B",
        transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${accent}44`;
        e.currentTarget.style.borderColor = `${accent}99`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = `${accent}33`;
      }}
    >
      <div
        style={{
          height: 36,
          backgroundImage: `url(${src})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: "7px 10px", fontSize: 11, fontWeight: 600, color: accent, letterSpacing: "0.04em" }}>
        {label}
      </div>
    </div>
  );
}

export default function LandingHero() {
  const handleScroll = () => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  const handleGallery = () => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Background gradient blobs */}
      <div style={{ position: "absolute", top: -160, right: -160, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "35%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Thin top/bottom accent lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #6366F1 30%, #818CF8 70%, transparent)", opacity: 0.7 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #6366F1 30%, #818CF8 70%, transparent)", opacity: 0.3 }} />

      {/* Corner brackets */}
      {[
        { top: 20, left: 20, flip: "" },
        { top: 20, right: 20, flip: "scaleX(-1)" },
        { bottom: 20, left: 20, flip: "scaleY(-1)" },
        { bottom: 20, right: 20, flip: "scale(-1,-1)" },
      ].map((pos, i) => (
        <svg key={i} style={{ position: "absolute", opacity: 0.35, transform: pos.flip, ...pos }} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 4 L4 44 M4 4 L44 4" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="4" cy="4" r="3.5" fill="#818CF8" />
        </svg>
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 720 }}>
        {/* Pill badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)",
          borderRadius: 999, padding: "6px 18px", fontSize: 11, fontWeight: 700,
          color: "#818CF8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818CF8", display: "inline-block" }} />
          Handcrafted Frame Studio
        </div>

        {/* Brand name */}
        <h1 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(4.5rem, 14vw, 11rem)",
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: "#F1F5F9",
          lineHeight: 0.92,
          margin: 0,
          textShadow: "0 0 80px rgba(99,102,241,0.3)",
        }}>
          DHARA
        </h1>

        {/* frames subtitle with indigo gradient */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "12px 0 22px", justifyContent: "center", width: "100%" }}>
          <div style={{ height: 2, width: 56, background: "linear-gradient(90deg, transparent, #6366F1)", borderRadius: 2 }} />
          <span style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1rem, 3.5vw, 1.9rem)",
            letterSpacing: "0.5em",
            fontWeight: 400,
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #818CF8, #C4B5FD, #67E8F9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            frames
          </span>
          <div style={{ height: 2, width: 56, background: "linear-gradient(90deg, #6366F1, transparent)", borderRadius: 2 }} />
        </div>

        {/* Tagline */}
        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#94A3B8", fontWeight: 400, lineHeight: 1.75, maxWidth: 460, marginBottom: 40 }}>
          Upload your photo, pick a frame, and see exactly how it will look — before you order.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={handleScroll}
            style={{
              padding: "14px 36px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #6366F1, #4338CA)",
              color: "#ffffff", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em",
              cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.45)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(99,102,241,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.45)"; }}
          >
            Start Framing →
          </button>
          <button
            onClick={handleGallery}
            style={{
              padding: "14px 36px", borderRadius: 12,
              border: "1.5px solid rgba(99,102,241,0.4)",
              background: "transparent", color: "#818CF8", fontSize: 14,
              fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "#6366F1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
          >
            View Collection
          </button>
        </div>
      </div>

      {/* Frame strip previews */}
      <div style={{
        position: "relative", zIndex: 1, marginTop: 60,
        display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 860,
      }}>
        {FRAME_PREVIEWS.map((fp) => <FrameStrip key={fp.src} {...fp} />)}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScroll}
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#475569" }}
        aria-label="Scroll down"
      >
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#475569" }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: "drop 1.6s ease-in-out infinite" }}>
          <path d="M9 3 L9 15 M5 11 L9 15 L13 11" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`@keyframes drop { 0%,100%{transform:translateY(0);opacity:.9} 50%{transform:translateY(5px);opacity:.4} }`}</style>
    </section>
  );
}
