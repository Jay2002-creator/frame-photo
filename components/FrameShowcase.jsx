"use client";

// Each showcase item uses CSS box-shadow to simulate the frame visually
const SHOWCASE_ITEMS = [
  {
    id: "gilt",
    name: "Classical Gilt",
    tag: "Ornate",
    shadow: "inset 0 0 0 2px #fde68a,inset 0 0 0 5px #b45309,0 0 0 28px #ca8a04,0 0 0 30px #92400e,0 0 0 32px #fde68a,0 0 0 34px #78350f,10px 14px 48px rgba(0,0,0,.85)",
    innerShadow: "inset 0 0 24px rgba(0,0,0,.6)",
    fw: 34,
    accent: "#FACC15",
    desc: "Timeless gold ornate",
  },
  {
    id: "black",
    name: "Gallery Black",
    tag: "Modern",
    shadow: "inset 0 0 0 2px #3f3f46,inset 0 0 0 4px #18181b,0 0 0 22px #09090b,0 0 0 24px #27272a,0 0 0 26px #52525b,8px 12px 40px rgba(0,0,0,.9)",
    innerShadow: "inset 0 0 18px rgba(0,0,0,.5)",
    fw: 26,
    accent: "#A1A1AA",
    desc: "Museum gallery look",
  },
  {
    id: "cobalt",
    name: "Cobalt Blue",
    tag: "Modern",
    shadow: "inset 0 0 0 2px #93c5fd,inset 0 0 0 4px #2563eb,0 0 0 22px #1e3a8a,0 0 0 24px #1d4ed8,0 0 0 26px #60a5fa,8px 12px 40px rgba(0,0,0,.8)",
    innerShadow: "inset 0 0 16px rgba(0,0,0,.5)",
    fw: 26,
    accent: "#60A5FA",
    desc: "Bold statement piece",
  },
  {
    id: "rose",
    name: "Rose Gold",
    tag: "Ornate",
    shadow: "inset 0 0 0 2px #fda4af,inset 0 0 0 4px #e11d48,0 0 0 24px #be185d,0 0 0 26px #9f1239,0 0 0 28px #fda4af,8px 12px 42px rgba(0,0,0,.8)",
    innerShadow: "inset 0 0 18px rgba(0,0,0,.5)",
    fw: 28,
    accent: "#FB7185",
    desc: "Elegant rose finish",
  },
];

const SAMPLE_COLORS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

function ShowcaseCard({ item, colorIndex }) {
  const mat = 16;
  const fw = item.fw;

  return (
    <div
      style={{
        background: "#18181B",
        borderRadius: 20,
        border: `1px solid ${item.accent}22`,
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 24px 60px ${item.accent}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Frame preview area */}
      <div
        style={{
          padding: "28px",
          background: "#27272A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            filter: "drop-shadow(-4px -4px 12px rgba(255,255,255,0.04)) drop-shadow(8px 10px 28px rgba(0,0,0,0.8))",
            borderRadius: 4,
          }}
        >
          {/* The framed artwork simulation */}
          <div
            style={{
              boxShadow: item.shadow,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 140,
                height: 110,
                background: SAMPLE_COLORS[colorIndex],
                boxShadow: item.innerShadow,
                padding: mat,
                boxSizing: "border-box",
              }}
            >
              {/* Art placeholder inside mat */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#0F172A",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  opacity: 0.7,
                }}
              >
                🖼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div style={{ padding: "14px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#FAFAFA" }}>{item.name}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
            background: `${item.accent}18`, color: item.accent,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>{item.tag}</span>
        </div>
        <p style={{ fontSize: 12, color: "#71717A", margin: "0 0 12px" }}>{item.desc}</p>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("frameSelect", { detail: { frameId: item.id === "gilt" ? "classical-gilt" : item.id === "black" ? "gallery-black" : item.id === "cobalt" ? "cobalt-blue" : "rose-gold" } }));
            document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            width: "100%", padding: "8px 0", borderRadius: 10, border: `1px solid ${item.accent}44`,
            background: `${item.accent}0e`, color: item.accent, fontSize: 12,
            fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer",
            transition: "background 0.18s, border-color 0.18s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${item.accent}22`; e.currentTarget.style.borderColor = `${item.accent}88`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${item.accent}0e`; e.currentTarget.style.borderColor = `${item.accent}44`; }}
        >
          Try this frame →
        </button>
      </div>
    </div>
  );
}

export default function FrameShowcase() {
  return (
    <section
      style={{
        background: "#09090B",
        padding: "88px 24px 100px",
        borderTop: "1px solid #27272A",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)",
            borderRadius: 999, padding: "5px 16px", fontSize: 10, fontWeight: 700,
            color: "#FACC15", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18,
          }}>
            Live Previews
          </div>
          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800, color: "#FAFAFA", margin: "0 0 14px",
          }}>
            See It in Action
          </h2>
          <p style={{ color: "#71717A", fontSize: 16, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Real frame styles, rendered live. Click any card to apply it to your photo instantly.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {SHOWCASE_ITEMS.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} colorIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
