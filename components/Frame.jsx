"use client";
import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { 
  Upload, 
  Download, 
  Maximize, 
  Square, 
  RectangleVertical, 
  RectangleHorizontal, 
  Image as ImageIcon,
  ZoomIn,
  Menu,
  X,
  Eye
} from "lucide-react";

// --- Helper Functions ---
const getCroppedImg = (imageSrc, cropPixels) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );
      resolve(canvas.toDataURL("image/png"));
    };
  });
};

const FrameEditor = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [frame, setFrame] = useState("/image/frame1.png");
  const [ratio, setRatio] = useState("square");
  const [showSidebar, setShowSidebar] = useState(false);
  
  // New States for Preview Logic
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [finalPreviewUrl, setFinalPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const FRAME_PADDING = 20;
  
  const RATIOS = {
    square: { aspect: 1, icon: <Square size={18} />, label: "Square" },
    portrait: { aspect: 4 / 5, icon: <RectangleVertical size={18} />, label: "Portrait" },
    landscape: { aspect: 3 / 2, icon: <RectangleHorizontal size={18} />, label: "Landscape" },
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // --- Generate the Preview / Processing Logic ---
  const generateFinalImage = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);

    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    const canvas = document.createElement("canvas");
    
    const exportW = ratio === "landscape" ? 1200 : 800;
    const exportH = exportW / RATIOS[ratio].aspect;
    
    canvas.width = exportW;
    canvas.height = exportH;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = croppedImage;
    const frameImg = new Image();
    frameImg.src = frame;

    await Promise.all([
      new Promise((res) => (img.onload = res)),
      new Promise((res) => (frameImg.onload = res)),
    ]);

    const dynamicPadding = (FRAME_PADDING / 400) * exportW;
    const innerWidth = exportW - dynamicPadding * 2;
    const innerHeight = exportH - dynamicPadding * 2;
    
    ctx.drawImage(img, dynamicPadding, dynamicPadding, innerWidth, innerHeight);
    ctx.drawImage(frameImg, 0, 0, exportW, exportH);

    const dataUrl = canvas.toDataURL("image/png");
    setFinalPreviewUrl(dataUrl);
    setIsPreviewOpen(true);
    setIsProcessing(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = finalPreviewUrl;
    link.download = `art-frame-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F8F9FA] text-slate-800 font-sans overflow-hidden">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <h1 className="text-lg font-bold">Studio Editor</h1>
        <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 bg-slate-100 rounded-lg">
          <Menu size={20} />
        </button>
      </div>

      {/* LEFT SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 p-6 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="hidden lg:block mb-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Studio Editor</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold text-[10px]">Frame Workshop</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Upload size={16} /> Upload Artwork
            </label>
            <div className="group relative border-2 border-dashed border-slate-200 rounded-xl p-6 transition-all hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer text-center">
              <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <ImageIcon className="text-slate-400 mx-auto mb-2 group-hover:text-blue-500" size={24} />
              <span className="text-xs text-slate-500">Click to browse</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Maximize size={16} /> Aspect Ratio
            </label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(RATIOS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => { setRatio(key); setShowSidebar(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    ratio === key ? "bg-slate-900 text-white shadow-md" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {value.icon} <span>{value.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER: PREVIEW AREA */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 md:p-12 bg-[#F1F3F5] overflow-y-auto pt-[100px]!">
        {!image ? (
          <div className="text-center opacity-40">
            <ImageIcon className="mx-auto mb-4" size={48} />
            <p className="font-medium">Please upload an artwork to begin</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto">
            <div 
              className="relative shadow-2xl bg-white w-full max-h-[50vh] md:max-h-[65vh] transition-all duration-500"
              style={{ 
                aspectRatio: `${RATIOS[ratio].aspect}`,
                maxHeight: 'min(70vh, 100%)' 
              }}
            >
              <div className="absolute" style={{ top: "5%", left: "5%", right: "5%", bottom: "5%" }}>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={RATIOS[ratio].aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  classes={{ containerClassName: "rounded-sm" }}
                />
              </div>
              <img
                src={frame}
                alt="Frame"
                className="absolute inset-0 w-full h-full pointer-events-none z-10 object-stretch"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="mt-8 w-full max-w-md bg-white rounded-2xl shadow-xl p-5 border border-slate-100 space-y-4">
              <div className="flex items-center gap-4">
                <ZoomIn size={18} className="text-slate-400 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <span className="text-xs font-bold text-slate-500 w-10 text-right">{Math.round(zoom * 100)}%</span>
              </div>
              <button
                onClick={generateFinalImage}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-lg disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : <><Eye size={18} /> Preview Framed Result</>}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* RIGHT SIDEBAR: Frame Gallery */}
      <aside className="w-full lg:w-72 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 overflow-x-auto">
        <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest text-[10px]">Available Frames</h3>
        <div className="flex lg:grid lg:grid-cols-2 gap-3 pb-4">
          {["frame.png", "frame1.png", "frame2.png"].map((f, i) => (
            <button
              key={i}
              onClick={() => setFrame(`/image/${f}`)}
              className={`relative flex-shrink-0 w-20 h-20 lg:w-auto lg:h-auto aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                frame.includes(f) ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-100 hover:border-slate-300"
              }`}
            >
              <img src={`/image/${f}`} alt="Frame" className="w-full h-full object-fill p-1" />
            </button>
          ))}
        </div>
      </aside>

      {/* --- PREMIUM PREVIEW MODAL --- */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Final Result</h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Ready for export</p>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Preview Image Container */}
            <div className="flex-1 bg-[#F1F3F5] p-6 md:p-12 overflow-y-auto flex items-center justify-center min-h-0">
               <div className="relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-h-full">
                  <img 
                    src={finalPreviewUrl} 
                    alt="Final Framed Result" 
                    className="max-w-full max-h-[50vh] object-contain rounded-sm"
                  />
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-sm text-slate-500 hidden md:block">
                Generated at high-resolution {ratio === "landscape" ? "1200px" : "800px"} width.
              </p>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="flex-1 md:flex-none px-6 py-3 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Edit Further
                </button>
                <button 
                  onClick={downloadImage}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  <Download size={18} /> Download Master
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay (Mobile) */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default FrameEditor;