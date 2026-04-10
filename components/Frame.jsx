"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Upload, Download, Square, RectangleVertical, RectangleHorizontal,
  Image as ImageIcon, ZoomIn, Menu, X, Sparkles, CheckCircle2, Maximize,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:          "linear-gradient(135deg, #dfe9ff 0%, #eef2ff 40%, #f5f0ff 70%, #e0f7ff 100%)",
  glass:       "rgba(255,255,255,0.58)",
  glassBorder: "1.5px solid rgba(255,255,255,0.9)",
  glassBlur:   "blur(28px) saturate(180%)",
  shadowGlass: "0 8px 32px rgba(100,120,220,0.13), 0 1.5px 6px rgba(100,120,220,0.07)",
  shadowDeep:  "0 24px 64px rgba(80,100,200,0.2)",
  accent:      "#5b6ef5",
  accent2:     "#a78bfa",
  text:        "#1a1d3a",
  textMid:     "#5a5f80",
  textSoft:    "#9196b8",
  radius:      20,
  radiusSm:    12,
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
};

const getCroppedImg = (imageSrc, cropPixels) =>
  new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;
      canvas.getContext("2d").drawImage(
        image,
        cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height,
        0, 0, cropPixels.width, cropPixels.height
      );
      resolve(canvas.toDataURL("image/png"));
    };
  });

const glassPanel = (extra = {}) => ({
  background: T.glass,
  border: T.glassBorder,
  backdropFilter: T.glassBlur,
  WebkitBackdropFilter: T.glassBlur,
  boxShadow: T.shadowGlass,
  ...extra,
});

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
    textTransform: "uppercase", color: T.textSoft,
    marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
    fontFamily: T.fontBody,
  }}>
    {children}
  </div>
);

const FrameEditor = () => {
  const [image, setImage]                         = useState(null);
  const [crop, setCrop]                           = useState({ x: 0, y: 0 });
  const [zoom, setZoom]                           = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [frame, setFrame]                         = useState("/image/frame1.png");
  const [ratio, setRatio]                         = useState("square");
  const [showSidebar, setShowSidebar]             = useState(false);
  const [isPreviewOpen, setIsPreviewOpen]         = useState(false);
  const [finalPreviewUrl, setFinalPreviewUrl]     = useState(null);
  const [isProcessing, setIsProcessing]           = useState(false);
  const [hoverRatio, setHoverRatio]               = useState(null);
  const [hoverFrame, setHoverFrame]               = useState(null);

  const RATIOS = {
    square:    { aspect: 1,   icon: <Square size={15}/>,             label: "Square 1:1"    },
    portrait:  { aspect: 4/5, icon: <RectangleVertical size={15}/>,  label: "Portrait 4:5"  },
    landscape: { aspect: 3/2, icon: <RectangleHorizontal size={15}/>,label: "Landscape 3:2" },
  };
  const FRAMES = ["frame.png", "frame1.png", "frame2.png"];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };
  const onCropComplete = useCallback((_, px) => setCroppedAreaPixels(px), []);

  const generateFinalImage = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    const cropped  = await getCroppedImg(image, croppedAreaPixels);
    const exportW  = ratio === "landscape" ? 1200 : 800;
    const exportH  = exportW / RATIOS[ratio].aspect;
    const canvas   = document.createElement("canvas");
    canvas.width   = exportW; canvas.height = exportH;
    const ctx      = canvas.getContext("2d");
    const img      = new Image(); img.src = cropped;
    const frameImg = new Image(); frameImg.src = frame;
    await Promise.all([new Promise(r => img.onload = r), new Promise(r => frameImg.onload = r)]);
    const pad = (20 / 400) * exportW;
    ctx.drawImage(img, pad, pad, exportW - pad*2, exportH - pad*2);
    ctx.drawImage(frameImg, 0, 0, exportW, exportH);
    setFinalPreviewUrl(canvas.toDataURL("image/png"));
    setIsPreviewOpen(true);
    setIsProcessing(false);
  };

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = finalPreviewUrl;
    a.download = `dhara-frame-${Date.now()}.png`;
    a.click();
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" />
      <style>{`
        .df-range{-webkit-appearance:none;appearance:none;flex:1;height:4px;background:linear-gradient(to right,#5b6ef5,#a78bfa);border-radius:99px;outline:none;cursor:pointer}
        .df-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;background:white;border:2.5px solid #5b6ef5;border-radius:50%;box-shadow:0 2px 8px rgba(91,110,245,.3)}
        @keyframes df-spin{to{transform:rotate(360deg)}}
        .df-spinner{width:17px;height:17px;border:2.5px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:df-spin .7s linear infinite}
      `}</style>

      {/* ROOT — inline background so Tailwind/globals.css can never win */}
      <div style={{
        fontFamily: T.fontBody,
        background: T.bg,
        color: T.text,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}>

        {/* Blobs */}
        {[
          { w:500, h:500, bg:"radial-gradient(circle,#a5b4fc,#818cf8)", top:"-120px", left:"-150px" },
          { w:400, h:400, bg:"radial-gradient(circle,#bae6fd,#7dd3fc)", bottom:"-100px", right:"-100px" },
          { w:320, h:320, bg:"radial-gradient(circle,#f9a8d4,#fda4af)", top:"38%", left:"33%" },
        ].map((b, i) => (
          <div key={i} style={{
            position:"fixed", width:b.w, height:b.h, borderRadius:"50%",
            background:b.bg, filter:"blur(80px)", opacity:0.3,
            pointerEvents:"none", zIndex:0,
            top:b.top, left:b.left, bottom:b.bottom, right:b.right,
          }} />
        ))}

        {/* Mobile Header */}
        <div style={{
          ...glassPanel(),
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"13px 20px", position:"relative", zIndex:2, flexShrink:0,
        }}>
          <div>
            <div style={{ fontFamily:T.fontDisplay, fontSize:"1.15rem", fontWeight:700, color:T.text }}>Dhara Frames</div>
            <div style={{ fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent, fontWeight:700, marginTop:2 }}>Frame Workshop</div>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} style={{
            background:"rgba(255,255,255,0.5)", border:T.glassBorder,
            backdropFilter:T.glassBlur, WebkitBackdropFilter:T.glassBlur,
            borderRadius:10, padding:8, cursor:"pointer", color:T.text,
            display:"flex", alignItems:"center",
          }}>
            {showSidebar ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* Inner */}
        <div style={{ display:"flex", flex:1, overflow:"hidden", position:"relative", zIndex:1 }}>

          {/* Mobile overlay */}
          {showSidebar && (
            <div onClick={() => setShowSidebar(false)} style={{
              position:"fixed", inset:0, background:"rgba(15,20,60,0.3)",
              backdropFilter:"blur(4px)", zIndex:40,
            }}/>
          )}

          {/* Left Sidebar */}
          <aside style={{
            ...glassPanel({
              width:272, flexShrink:0,
              padding:"28px 22px",
              display:"flex", flexDirection:"column", gap:26,
              overflowY:"auto",
              borderRight:T.glassBorder,
              boxSizing:"border-box",
            }),
            // responsive: on small screens slide in/out
            position: typeof window !== "undefined" && window.innerWidth < 1024 ? "fixed" : "relative",
            top:0, bottom:0, left:0, zIndex:50,
            transform: typeof window !== "undefined" && window.innerWidth < 1024 && !showSidebar
              ? "translateX(-100%)" : "translateX(0)",
            transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div>
              <h1 style={{ fontFamily:T.fontDisplay, fontSize:"1.4rem", fontWeight:700, color:T.text, letterSpacing:"-0.01em", margin:0, lineHeight:1.2 }}>
                Dhara Frames
              </h1>
              <span style={{ fontFamily:T.fontBody, fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent, fontWeight:700, marginTop:4, display:"block" }}>
                Frame Workshop
              </span>
            </div>

            {/* Upload */}
            <div>
              <SectionLabel><Upload size={11}/> Upload Artwork</SectionLabel>
              <div style={{
                position:"relative", border:`2px dashed rgba(91,110,245,0.28)`,
                borderRadius:T.radiusSm, padding:"22px 12px", textAlign:"center",
                cursor:"pointer", background:"rgba(91,110,245,0.03)", boxSizing:"border-box",
              }}>
                <input type="file" accept="image/*" onChange={handleUpload}
                  style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", height:"100%" }}/>
                <div style={{ width:38, height:38, background:`linear-gradient(135deg,${T.accent},${T.accent2})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 9px", color:"white" }}>
                  <Upload size={17} color="white"/>
                </div>
                <p style={{ fontSize:13, color:T.textMid, fontWeight:500, margin:0 }}>Click to browse</p>
                <p style={{ fontSize:11, color:T.textSoft, margin:"3px 0 0" }}>PNG · JPG · WEBP</p>
              </div>
            </div>

            {/* Ratio */}
            <div>
              <SectionLabel><Maximize size={11}/> Aspect Ratio</SectionLabel>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {Object.entries(RATIOS).map(([key, val]) => {
                  const active = ratio === key;
                  const hov = hoverRatio === key;
                  return (
                    <button key={key}
                      style={{
                        display:"flex", alignItems:"center", gap:10,
                        padding:"11px 15px", borderRadius:T.radiusSm,
                        border: active ? "none" : `1.5px solid ${hov ? "rgba(91,110,245,0.25)" : "transparent"}`,
                        fontFamily:T.fontBody, fontSize:13, fontWeight:500,
                        cursor:"pointer", width:"100%", textAlign:"left",
                        background: active ? `linear-gradient(135deg,${T.accent},${T.accent2})` : hov ? "rgba(91,110,245,0.08)" : "rgba(255,255,255,0.5)",
                        color: active ? "white" : hov ? T.accent : T.textMid,
                        boxShadow: active ? "0 4px 16px rgba(91,110,245,0.35)" : "none",
                        transition:"all 0.18s",
                      }}
                      onMouseEnter={() => setHoverRatio(key)}
                      onMouseLeave={() => setHoverRatio(null)}
                      onClick={() => { setRatio(key); setShowSidebar(false); }}
                    >
                      {val.icon} {val.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main style={{
            flex:1, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            padding:"28px 20px", overflowY:"auto", gap:20,
          }}>
            {!image ? (
              <div style={{ textAlign:"center", opacity:0.45 }}>
                <ImageIcon size={50} color="#a5b4fc"/>
                <p style={{ marginTop:12, fontSize:15, fontWeight:500, color:T.textMid, fontFamily:T.fontBody }}>
                  Upload an artwork to get started
                </p>
              </div>
            ) : (
              <>
                {/* Cropper */}
                <div style={{
                  width:"100%", maxWidth:540,
                  aspectRatio: String(RATIOS[ratio].aspect),
                  maxHeight:"clamp(260px, 52vh, 500px)",
                  borderRadius:T.radius, overflow:"hidden",
                  boxShadow:T.shadowDeep,
                  position:"relative", background:"#fff", flexShrink:0,
                }}>
                  <div style={{ position:"absolute", top:"5%", left:"5%", right:"5%", bottom:"5%" }}>
                    <Cropper
                      image={image} crop={crop} zoom={zoom}
                      aspect={RATIOS[ratio].aspect}
                      onCropChange={setCrop} onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <img src={frame} alt="Frame overlay" style={{
                    position:"absolute", inset:0, width:"100%", height:"100%",
                    objectFit:"fill", pointerEvents:"none", zIndex:10,
                  }}/>
                </div>

                {/* Controls */}
                <div style={{
                  ...glassPanel({ borderRadius:T.radius, padding:"18px 22px", boxSizing:"border-box" }),
                  width:"100%", maxWidth:540,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <ZoomIn size={16} color={T.textSoft}/>
                    <input className="df-range" type="range" min={1} max={3} step={0.01} value={zoom}
                      onChange={e => setZoom(Number(e.target.value))} style={{ flex:1 }}/>
                    <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.textSoft, minWidth:34, textAlign:"right", fontFamily:T.fontBody }}>
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  <button
                    disabled={isProcessing}
                    onClick={generateFinalImage}
                    style={{
                      width:"100%", padding:"13px 0",
                      background: isProcessing ? "#c4c8f8" : `linear-gradient(135deg,${T.accent},${T.accent2})`,
                      color:"white", border:"none", borderRadius:T.radiusSm,
                      fontFamily:T.fontBody, fontSize:14, fontWeight:700,
                      cursor: isProcessing ? "not-allowed" : "pointer",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                      boxShadow: isProcessing ? "none" : "0 8px 24px rgba(91,110,245,0.38)",
                    }}
                  >
                    {isProcessing
                      ? <><div className="df-spinner"/> Generating…</>
                      : <><Sparkles size={16}/> Preview Framed Result</>
                    }
                  </button>
                </div>
              </>
            )}
          </main>

          {/* Right Sidebar */}
          <aside style={{
            ...glassPanel({
              width:180, flexShrink:0,
              padding:"22px 14px",
              borderLeft:T.glassBorder,
              display:"flex", flexDirection:"column", gap:10,
              overflowY:"auto", boxSizing:"border-box",
            }),
          }}>
            <SectionLabel>Frames</SectionLabel>
            {FRAMES.map((f, i) => {
              const active = frame.includes(f);
              const hov    = hoverFrame === i;
              return (
                <button key={i}
                  onClick={() => setFrame(`/image/${f}`)}
                  onMouseEnter={() => setHoverFrame(i)}
                  onMouseLeave={() => setHoverFrame(null)}
                  style={{
                    width:"100%", aspectRatio:"1",
                    borderRadius:14, overflow:"hidden",
                    border:`2px solid ${active ? T.accent : hov ? T.accent2 : "rgba(200,210,255,0.4)"}`,
                    cursor:"pointer", background:"white",
                    position:"relative",
                    boxShadow: active ? "0 4px 20px rgba(91,110,245,0.35)" : hov ? "0 4px 14px rgba(167,139,250,0.28)" : "none",
                    transform: hov && !active ? "translateY(-2px)" : "none",
                    transition:"all 0.18s", padding:0,
                  }}
                >
                  <img src={`/image/${f}`} alt={`Frame ${i+1}`}
                    style={{ width:"100%", height:"100%", objectFit:"fill", padding:4, display:"block" }}/>
                  {active && (
                    <div style={{ position:"absolute", bottom:5, right:5 }}>
                      <CheckCircle2 size={15} color={T.accent}/>
                    </div>
                  )}
                </button>
              );
            })}
          </aside>

        </div>{/* /inner */}

        {/* Modal */}
        {isPreviewOpen && (
          <div onClick={() => setIsPreviewOpen(false)} style={{
            position:"fixed", inset:0, zIndex:100,
            display:"flex", alignItems:"center", justifyContent:"center", padding:16,
            background:"rgba(15,20,60,0.52)",
            backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              position:"relative", width:"100%", maxWidth:760,
              borderRadius:26, overflow:"hidden",
              display:"flex", flexDirection:"column", maxHeight:"90vh",
              background:"rgba(255,255,255,0.84)",
              backdropFilter:"blur(40px) saturate(200%)",
              WebkitBackdropFilter:"blur(40px) saturate(200%)",
              border:"1.5px solid rgba(255,255,255,0.92)",
              boxShadow:"0 32px 96px rgba(30,40,120,0.22)",
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid rgba(91,110,245,0.1)", background:"rgba(255,255,255,0.7)", flexShrink:0 }}>
                <div>
                  <h2 style={{ fontFamily:T.fontDisplay, fontSize:"1.35rem", color:T.text, margin:0 }}>Framed Result</h2>
                  <p style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:T.accent, fontWeight:700, margin:"3px 0 0", fontFamily:T.fontBody }}>Ready for export</p>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} style={{ background:"rgba(91,110,245,0.08)", border:"none", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:T.textMid }}>
                  <X size={19}/>
                </button>
              </div>

              <div style={{ flex:1, overflowY:"auto", padding:28, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#eef2ff 0%,#f5f0ff 100%)" }}>
                <img src={finalPreviewUrl} alt="Final"
                  style={{ maxWidth:"100%", maxHeight:"52vh", objectFit:"contain", borderRadius:10, boxShadow:"0 24px 72px rgba(30,40,120,0.22)" }}/>
              </div>

              <div style={{ padding:"18px 24px", borderTop:"1px solid rgba(91,110,245,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, background:"rgba(255,255,255,0.7)", flexWrap:"wrap", flexShrink:0 }}>
                <p style={{ fontSize:12, color:T.textSoft, fontFamily:T.fontBody }}>{ratio === "landscape" ? "1200" : "800"}px · PNG</p>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => setIsPreviewOpen(false)} style={{ background:"none", border:"none", fontFamily:T.fontBody, fontSize:14, fontWeight:600, color:T.textMid, cursor:"pointer", padding:"11px 16px", borderRadius:T.radiusSm }}>
                    Edit Further
                  </button>
                  <button onClick={downloadImage} style={{ display:"flex", alignItems:"center", gap:8, background:`linear-gradient(135deg,${T.accent},${T.accent2})`, color:"white", border:"none", borderRadius:T.radiusSm, padding:"11px 22px", fontFamily:T.fontBody, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 6px 20px rgba(91,110,245,0.38)" }}>
                    <Download size={15}/> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default FrameEditor;
