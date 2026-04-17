"use client";

const FRAME_PREVIEWS = [
  { src: "/image/bluewood.png", label: "Blue Wood", accent: "#6366F1" },
  { src: "/image/wood2.png", label: "Walnut", accent: "#8B5CF6" },
  { src: "/image/wood3.jpeg", label: "Oak", accent: "#0EA5E9" },
  { src: "/image/frameside.png", label: "Classic", accent: "#6366F1" },
  { src: "/image/frame.png", label: "Natural", accent: "#10B981" },
  { src: "/image/uniqueframe.png", label: "Unique", accent: "#EC4899" },
];

function FrameStrip({ src, label, accent }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: 130,
        borderRadius: 14,
        overflow: "hidden",
        border: `1.5px solid ${accent}44`,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `0 4px 24px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
        transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${accent}33`;
        e.currentTarget.style.borderColor = `${accent}88`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(99,102,241,0.08)";
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
        background: "linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0f9ff 70%, #fafafe 100%)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Animated aurora blobs behind everything */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", top: "-10%", left: "20%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
          animation: "blob1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%)",
          animation: "blob2 10s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-5%", left: "-5%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 65%)",
          animation: "blob3 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "15%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 65%)",
          animation: "blob1 9s ease-in-out infinite reverse",
        }} />
      </div>

      {/* Subtle grid pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #6366F1 25%, #8B5CF6 50%, #0EA5E9 75%, transparent)", zIndex: 2 }} />

      {/* Corner brackets */}
      {[
        { top: 20, left: 20, flip: "" },
        { top: 20, right: 20, flip: "scaleX(-1)" },
        { bottom: 20, left: 20, flip: "scaleY(-1)" },
        { bottom: 20, right: 20, flip: "scale(-1,-1)" },
      ].map((pos, i) => (
        <svg key={i} style={{ position: "absolute", opacity: 0.3, transform: pos.flip, zIndex: 2, ...pos }} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 4 L4 44 M4 4 L44 4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="4" cy="4" r="3.5" fill="#6366F1" />
        </svg>
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 760 }}>

        {/* Pill badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.6)", border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: 999, padding: "6px 18px", fontSize: 11, fontWeight: 700,
          color: "#6366F1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32,
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 2px 16px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
          Handcrafted Frame Studio
        </div>

        {/* DHARA with animated gradient behind it */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 0 }}>
          {/* Moving gradient glow behind the text */}
          <div style={{
            position: "absolute",
            inset: "-20px -40px",
            borderRadius: "40%",
            background: "linear-gradient(135deg, #6366F1, #8B5CF6, #0EA5E9, #EC4899, #6366F1)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 5s ease infinite",
            filter: "blur(40px)",
            opacity: 0.35,
            zIndex: -1,
          }} />
          <h1 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            lineHeight: 0.92,
            margin: 0,
            background: "linear-gradient(135deg, #1e1b4b 0%, #4338CA 30%, #6366F1 55%, #0EA5E9 80%, #8B5CF6 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 6s ease infinite",
          }}>
            DHARA
          </h1>
        </div>

        {/* "frames" subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "14px 0 24px", justifyContent: "center", width: "100%" }}>
          <div style={{ height: 1.5, width: 56, background: "linear-gradient(90deg, transparent, #6366F1)", borderRadius: 2 }} />
          <span style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1rem, 3.5vw, 1.9rem)",
            letterSpacing: "0.5em",
            fontWeight: 400,
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #6366F1, #8B5CF6, #0EA5E9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            frames
          </span>
          <div style={{ height: 1.5, width: 56, background: "linear-gradient(90deg, #6366F1, transparent)", borderRadius: 2 }} />
        </div>

        {/* Tagline */}
        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#475569", fontWeight: 400, lineHeight: 1.8, maxWidth: 460, marginBottom: 44 }}>
          Upload your photo, pick a frame, and see exactly how it will look — before you order.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={handleScroll}
            style={{
              padding: "15px 38px", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #6366F1, #4338CA)",
              color: "#ffffff", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em",
              cursor: "pointer", boxShadow: "0 8px 28px rgba(99,102,241,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(99,102,241,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.4)"; }}
          >
            Start Framing →
          </button>
          <button
            onClick={handleGallery}
            style={{
              padding: "15px 38px", borderRadius: 14,
              border: "1.5px solid rgba(99,102,241,0.3)",
              background: "rgba(255,255,255,0.65)", color: "#4338CA", fontSize: 14,
              fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(99,102,241,0.08)",
              transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            View Collection
          </button>
        </div>
      </div>

      {/* Frame strip previews */}
      <div style={{
        position: "relative", zIndex: 2, marginTop: 64,
        display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 880,
      }}>
        {FRAME_PREVIEWS.map((fp) => <FrameStrip key={fp.src} {...fp} />)}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScroll}
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer", zIndex: 2,
        }}
        aria-label="Scroll down"
      >
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94A3B8" }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: "drop 1.6s ease-in-out infinite" }}>
          <path d="M9 3 L9 15 M5 11 L9 15 L13 11" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`
        @keyframes drop {
          0%,100% { transform: translateY(0); opacity: .9; }
          50%      { transform: translateY(5px); opacity: .4; }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(40px,-30px) scale(1.08); }
          66%      { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-50px,30px) scale(1.06); }
          66%      { transform: translate(30px,-20px) scale(0.97); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,40px) scale(1.05); }
          66%      { transform: translate(-40px,-10px) scale(0.98); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
