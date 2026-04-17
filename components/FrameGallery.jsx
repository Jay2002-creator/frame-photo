"use client";

const GALLERY_FRAMES = [
  { src: "/image/bluewood.png",    name: "Blue Wood",     tag: "Ornate",  frameId: "woodblue",      accent: "#6366F1" },
  { src: "/image/wood2.png",       name: "Dark Walnut",   tag: "Classic", frameId: "wood",          accent: "#8B5CF6" },
  { src: "/image/wood3.jpeg",      name: "Light Oak",     tag: "Classic", frameId: "wood-light",    accent: "#0EA5E9" },
  { src: "/image/frameside.png",   name: "Classic Side",  tag: "Classic", frameId: "testing-frame", accent: "#6366F1" },
  { src: "/image/frame.png",       name: "Natural Wood",  tag: "Classic", frameId: "frame-natural", accent: "#10B981" },
  { src: "/image/frame1.png",      name: "Gold Leaf",     tag: "Ornate",  frameId: "frame-gold",    accent: "#F59E0B" },
  { src: "/image/frame2.png",      name: "Slim Profile",  tag: "Modern",  frameId: "frame-slim",    accent: "#64748B" },
  { src: "/image/uniqueframe.png", name: "Carved Unique", tag: "Ornate",  frameId: "uniqueframe2",  accent: "#EC4899" },
];

const TAG_COLORS = {
  Classic: { bg: "rgba(99,102,241,0.08)",  text: "#6366F1" },
  Ornate:  { bg: "rgba(139,92,246,0.1)",   text: "#8B5CF6" },
  Modern:  { bg: "rgba(100,116,139,0.1)",  text: "#64748B" },
};

function FrameCard({ frame }) {
  const tag = TAG_COLORS[frame.tag] || TAG_COLORS.Classic;

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("frameSelect", { detail: { frameId: frame.frameId } }));
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 18,
        border: "1.5px solid rgba(255,255,255,0.8)",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 4px 24px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
        transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 48px ${frame.accent}28`;
        e.currentTarget.style.borderColor = `${frame.accent}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(99,102,241,0.06)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.12)";
      }}
    >
      <div
        style={{
          height: 56,
          backgroundImage: `url(${frame.src})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
          borderBottom: "1px solid rgba(99,102,241,0.08)",
        }}
      />
      <div style={{ padding: "10px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{frame.name}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", padding: "2px 8px",
            borderRadius: 999, background: tag.bg, color: tag.text, textTransform: "uppercase",
          }}>
            {frame.tag}
          </span>
        </div>
        <div style={{ fontSize: 11, color: frame.accent, fontWeight: 600 }}>
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
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #e8eeff 40%, #f4f0ff 70%, #eef6ff 100%)",
        padding: "88px 24px 100px",
        borderTop: "1px solid rgba(255,255,255,0.7)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 999, padding: "5px 16px", fontSize: 10, fontWeight: 700,
            color: "#6366F1", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18,
          }}>
            Our Collection
          </div>
          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800, color: "#1E293B", margin: "0 0 14px", letterSpacing: "-0.01em",
          }}>
            Premium Frame Styles
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Click any frame to instantly apply it to your artwork in the studio.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, marginBottom: 52 }}>
          {GALLERY_FRAMES.map((f) => <FrameCard key={f.frameId} frame={f} />)}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "16px 44px", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #6366F1, #4338CA)",
              color: "#ffffff", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em",
              cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(99,102,241,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.35)"; }}
          >
            Open Frame Studio →
          </button>
        </div>
      </div>
    </section>
  );
}
