"use client";

const SHOWCASE_ITEMS = [
  {
    id: "gilt",
    name: "Classical Gilt",
    tag: "Ornate",
    shadow: "inset 0 0 0 2px #fde68a,inset 0 0 0 5px #b45309,0 0 0 28px #ca8a04,0 0 0 30px #92400e,0 0 0 32px #fde68a,0 0 0 34px #78350f,10px 14px 48px rgba(0,0,0,.25)",
    innerShadow: "inset 0 0 24px rgba(0,0,0,.15)",
    fw: 34,
    accent: "#D97706",
    desc: "Timeless gold ornate",
  },
  {
    id: "black",
    name: "Gallery Black",
    tag: "Modern",
    shadow: "inset 0 0 0 2px #3f3f46,inset 0 0 0 4px #18181b,0 0 0 22px #09090b,0 0 0 24px #27272a,0 0 0 26px #52525b,8px 12px 40px rgba(0,0,0,.3)",
    innerShadow: "inset 0 0 18px rgba(0,0,0,.12)",
    fw: 26,
    accent: "#64748B",
    desc: "Museum gallery look",
  },
  {
    id: "cobalt",
    name: "Cobalt Blue",
    tag: "Modern",
    shadow: "inset 0 0 0 2px #93c5fd,inset 0 0 0 4px #2563eb,0 0 0 22px #1e3a8a,0 0 0 24px #1d4ed8,0 0 0 26px #60a5fa,8px 12px 40px rgba(37,99,235,.25)",
    innerShadow: "inset 0 0 16px rgba(37,99,235,.1)",
    fw: 26,
    accent: "#3B82F6",
    desc: "Bold statement piece",
  },
  {
    id: "rose",
    name: "Rose Gold",
    tag: "Ornate",
    shadow: "inset 0 0 0 2px #fda4af,inset 0 0 0 4px #e11d48,0 0 0 24px #be185d,0 0 0 26px #9f1239,0 0 0 28px #fda4af,8px 12px 42px rgba(190,24,93,.2)",
    innerShadow: "inset 0 0 18px rgba(190,24,93,.08)",
    fw: 28,
    accent: "#EC4899",
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

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.82)",
        overflow: "hidden",
        boxShadow: "0 4px 28px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 24px 60px ${item.accent}28`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(99,102,241,0.07)";
      }}
    >
      {/* Frame preview */}
      <div
        style={{
          padding: "28px",
          background: "rgba(238,242,255,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
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
            filter: "drop-shadow(-2px -2px 8px rgba(255,255,255,0.8)) drop-shadow(6px 8px 20px rgba(0,0,0,0.15))",
            borderRadius: 4,
          }}
        >
          <div style={{ boxShadow: item.shadow, borderRadius: 4, overflow: "hidden" }}>
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
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#f1f5f9",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  opacity: 0.8,
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
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>{item.name}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
            background: `${item.accent}12`, color: item.accent,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>{item.tag}</span>
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", margin: "0 0 12px" }}>{item.desc}</p>
        <button
          onClick={() => {
            const idMap = { gilt: "classical-gilt", black: "gallery-black", cobalt: "cobalt-blue", rose: "rose-gold" };
            window.dispatchEvent(new CustomEvent("frameSelect", { detail: { frameId: idMap[item.id] } }));
            document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            width: "100%", padding: "8px 0", borderRadius: 10,
            border: `1px solid ${item.accent}44`,
            background: `${item.accent}0a`, color: item.accent, fontSize: 12,
            fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer",
            transition: "background 0.18s, border-color 0.18s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${item.accent}18`; e.currentTarget.style.borderColor = `${item.accent}88`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `${item.accent}0a`; e.currentTarget.style.borderColor = `${item.accent}44`; }}
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
        background: "linear-gradient(160deg, #f4f0ff 0%, #eef2ff 40%, #f0f8ff 70%, #f8f4ff 100%)",
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
            Live Previews
          </div>
          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800, color: "#1E293B", margin: "0 0 14px",
          }}>
            See It in Action
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Real frame styles, rendered live. Click any card to apply it to your photo instantly.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {SHOWCASE_ITEMS.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} colorIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
