"use client";

// frameId maps to FrameStudio FRAMES ids so clicking auto-selects the frame
const GALLERY_FRAMES = [
  { src: "/image/bluewood.png",    name: "Blue Wood",     tag: "Ornate",  frameId: "woodblue",      accent: "#FACC15" },
  { src: "/image/wood2.png",       name: "Dark Walnut",   tag: "Classic", frameId: "wood",          accent: "#FDE68A" },
  { src: "/image/wood3.jpeg",      name: "Light Oak",     tag: "Classic", frameId: "wood-light",    accent: "#FEF08A" },
  { src: "/image/frameside.png",   name: "Classic Side",  tag: "Classic", frameId: "testing-frame", accent: "#FACC15" },
  { src: "/image/frame.png",       name: "Natural Wood",  tag: "Classic", frameId: "frame-natural", accent: "#FDE68A" },
  { src: "/image/frame1.png",      name: "Gold Leaf",     tag: "Ornate",  frameId: "frame-gold",    accent: "#FACC15" },
  { src: "/image/frame2.png",      name: "Slim Profile",  tag: "Modern",  frameId: "frame-slim",    accent: "#A1A1AA" },
  { src: "/image/uniqueframe.png", name: "Carved Unique", tag: "Ornate",  frameId: "uniqueframe2",  accent: "#FACC15" },
];

const TAG_COLORS = {
  Classic: { bg: "rgba(250,204,21,0.1)", text: "#FDE68A" },
  Ornate:  { bg: "rgba(250,204,21,0.15)", text: "#FACC15" },
  Modern:  { bg: "rgba(161,161,170,0.12)", text: "#A1A1AA" },
  Vintage: { bg: "rgba(250,204,21,0.08)", text: "#FDE68A" },
};

function FrameCard({ frame }) {
  const tag = TAG_COLORS[frame.tag] || TAG_COLORS.Classic;

  const handleClick = () => {
    // Dispatch event so FrameStudio can auto-select this frame
    window.dispatchEvent(new CustomEvent("frameSelect", { detail: { frameId: frame.frameId } }));
    // Scroll to studio
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "#18181B",
        borderRadius: 18,
        border: `1.5px solid ${frame.accent}22`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 48px ${frame.accent}33`;
        e.currentTarget.style.borderColor = `${frame.accent}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = `${frame.accent}22`;
      }}
    >
      {/* Frame strip — just the piece, no extra space */}
      <div
        style={{
          height: 52,
          backgroundImage: `url(${frame.src})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
          borderBottom: `1px solid ${frame.accent}22`,
        }}
      />
      <div style={{ padding: "10px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FAFAFA" }}>{frame.name}</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 999, background: tag.bg, color: tag.text, textTransform: "uppercase" }}>
            {frame.tag}
          </span>
        </div>
        <div style={{ fontSize: 11, color: frame.accent, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          Apply frame →
        </div>
      </div>
    </div>
  );
}

export default function FrameGallery() {
  return (
    <section
      id="gallery"
      style={{ background: "#09090B", padding: "88px 24px 100px", borderTop: "1px solid #27272A" }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.25)",
            borderRadius: 999, padding: "5px 16px", fontSize: 10, fontWeight: 700,
            color: "#FACC15", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18,
          }}>
            Our Collection
          </div>
          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800, color: "#FAFAFA", margin: "0 0 14px", letterSpacing: "-0.01em",
          }}>
            Premium Frame Styles
          </h2>
          <p style={{ color: "#71717A", fontSize: 16, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Click any frame to instantly apply it to your artwork in the studio.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, marginBottom: 52 }}>
          {GALLERY_FRAMES.map((f) => <FrameCard key={f.frameId} frame={f} />)}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "16px 44px", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #FACC15, #F59E0B)",
              color: "#09090B", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em",
              cursor: "pointer", boxShadow: "0 8px 32px rgba(250,204,21,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(250,204,21,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(250,204,21,0.35)"; }}
          >
            Open Frame Studio →
          </button>
        </div>
      </div>
    </section>
  );
}
