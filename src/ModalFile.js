import React, { useState, useEffect } from "react";
import { FileAssets, FileURLs } from "./FileURLs";

export default function ModalFile({
  isOpen,
  onClose,
  modalFileName = "",
}) {
  const [zoom, setZoom] = useState(1);
  const [isFit, setIsFit] = useState(true);

  const asset = FileAssets[modalFileName] || {
    name: modalFileName,
    category: "File",
    description: "File preview item.",
    docUrl: FileURLs[modalFileName] || null,
  };

  const docUrl = asset.docUrl || FileURLs[modalFileName];
  const imageSrc = asset.image;

  // Documents that should ONLY display the direct document view
  const isDocumentOnly =
    modalFileName === "Resume" ||
    modalFileName === "Research Paper";

  // Items that should ONLY display the direct infographic image (Introduction)
  const isImageOnly = modalFileName === "Introduction";

  const getInitialTab = () => {
    if (isDocumentOnly) return "document";
    if (imageSrc) return "preview";
    if (docUrl) return "document";
    return "details";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Reset state when a new file is opened
  useEffect(() => {
    setZoom(1);
    setIsFit(true);
    if (isDocumentOnly) {
      setActiveTab("document");
    } else if (imageSrc) {
      setActiveTab("preview");
    } else if (docUrl) {
      setActiveTab("document");
    } else {
      setActiveTab("details");
    }
  }, [modalFileName, isOpen, docUrl, imageSrc, isDocumentOnly]);

  // Handle keyboard shortcuts (ESC, +, -, 0)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "=" || e.key === "+") {
        setZoom((z) => Math.min(z + 0.25, 3));
        setIsFit(false);
      } else if (e.key === "-") {
        setZoom((z) => Math.max(z - 0.25, 0.5));
        setIsFit(false);
      } else if (e.key === "0") {
        setZoom(1);
        setIsFit(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setIsFit(false);
    setZoom((z) => Math.min(z + 0.25, 3));
  };

  const handleZoomOut = () => {
    setIsFit(false);
    setZoom((z) => Math.max(z - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setIsFit(true);
  };

  // If this is a document-only file (Resume, Research Paper), render ONLY the document viewer
  if (isDocumentOnly && docUrl) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden animate-expand transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Titlebar Header */}
          <div className="flex items-center justify-between px-4 h-12 bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-700/80">
            {/* Window Controls */}
            <div className="flex items-center space-x-2 w-24 sm:w-28">
              <button
                onClick={onClose}
                title="Close (Esc)"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950 leading-none">
                  ×
                </span>
              </button>
              <button
                onClick={onClose}
                title="Minimize"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950 leading-none">
                  -
                </span>
              </button>
              <button
                onClick={onClose}
                title="Zoom"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950 leading-none">
                  +
                </span>
              </button>
            </div>

            {/* Window Title */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-stone-200">
              <span className="text-blue-400 font-bold">{asset.category || "Document"}</span>
              <span className="text-stone-600">/</span>
              <span className="truncate max-w-[220px] sm:max-w-[320px]">{asset.name || modalFileName}</span>
            </div>

            {/* Open in New Tab Button */}
            <div className="flex items-center space-x-1.5 w-24 sm:w-28 justify-end">
              <a
                href={docUrl}
                target="_blank"
                rel="noreferrer"
                title="Open document in new tab"
                className="flex items-center space-x-1 px-2.5 py-1 text-[11px] font-medium text-blue-300 hover:text-white bg-blue-900/50 hover:bg-blue-800 rounded border border-blue-700/60 transition-colors"
              >
                <span>Open Tab</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Pure Document Viewport */}
          <div className="flex-1 relative overflow-hidden bg-stone-950">
            <iframe
              src={docUrl}
              title={asset.name || modalFileName}
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // If this is an image-only file (Introduction), render ONLY the infographic image
  if (isImageOnly && imageSrc) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden animate-expand transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Titlebar Header */}
          <div className="flex items-center justify-between px-4 h-12 bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-700/80">
            {/* Window Controls */}
            <div className="flex items-center space-x-2 w-24 sm:w-28">
              <button
                onClick={onClose}
                title="Close (Esc)"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950 leading-none">
                  ×
                </span>
              </button>
              <button
                onClick={onClose}
                title="Minimize"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950 leading-none">
                  -
                </span>
              </button>
              <button
                onClick={handleResetZoom}
                title="Fit to Window"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950 leading-none">
                  +
                </span>
              </button>
            </div>

            {/* Window Title */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-stone-200">
              <span className="text-blue-400 font-bold">{asset.category || "About Me"}</span>
              <span className="text-stone-600">/</span>
              <span className="truncate max-w-[220px] sm:max-w-[320px]">{asset.name || modalFileName}</span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1.5 w-24 sm:w-28 justify-end">
              <button
                onClick={handleZoomOut}
                title="Zoom Out (-)"
                className="p-1 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset Zoom (0)"
                className="px-2 py-0.5 text-[11px] font-mono text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
              >
                {isFit ? "Fit" : `${Math.round(zoom * 100)}%`}
              </button>
              <button
                onClick={handleZoomIn}
                title="Zoom In (+)"
                className="p-1 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Pure Infographic Viewport */}
          <div className="flex-1 relative overflow-auto bg-stone-950 flex flex-col items-center justify-center p-3 sm:p-6">
            <div className="relative flex items-center justify-center max-w-full max-h-full p-2">
              <img
                src={imageSrc}
                alt={asset.name || modalFileName}
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.15s ease-out",
                  maxWidth: isFit ? "100%" : "none",
                  maxHeight: isFit ? "100%" : "none",
                }}
                className="object-contain shadow-2xl rounded-xl border border-stone-800/80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden animate-expand transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titlebar Header */}
        <div className="flex items-center justify-between px-4 h-12 bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-700/80">
          {/* Traffic Light Controls */}
          <div className="flex items-center space-x-2 w-24 sm:w-28">
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950 leading-none">
                ×
              </span>
            </button>
            <button
              onClick={onClose}
              title="Minimize"
              className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950 leading-none">
                -
              </span>
            </button>
            <button
              onClick={handleResetZoom}
              title="Fit to Window"
              className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950 leading-none">
                +
              </span>
            </button>
          </div>

          {/* Window Title & View Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-stone-950/80 px-3 py-1 rounded-lg border border-stone-700/60 text-xs font-semibold text-stone-200">
              <span className="text-blue-400 font-bold">{asset.category || "Item"}</span>
              <span className="text-stone-600">/</span>
              <span className="truncate max-w-[180px] sm:max-w-[260px]">{asset.name || modalFileName}</span>
            </div>

            {/* View Mode Toggle Tabs */}
            <div className="flex items-center bg-stone-950/80 p-0.5 rounded-lg border border-stone-800">
              {imageSrc && (
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "preview"
                      ? "bg-blue-600 text-white shadow"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  🖼️ Infographic
                </button>
              )}
              <button
                onClick={() => setActiveTab("details")}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === "details"
                    ? "bg-blue-600 text-white shadow"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                📊 Details & Tech
              </button>
              {docUrl && (
                <button
                  onClick={() => setActiveTab("document")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "document"
                      ? "bg-blue-600 text-white shadow"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  📄 Document
                </button>
              )}
            </div>
          </div>

          {/* Action / Zoom Controls */}
          <div className="flex items-center space-x-1.5 w-24 sm:w-28 justify-end">
            {docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noreferrer"
                title="Open document in new tab"
                className="flex items-center space-x-1 px-2.5 py-1 text-[11px] font-medium text-blue-300 hover:text-white bg-blue-900/50 hover:bg-blue-800 rounded border border-blue-700/60 transition-colors"
              >
                <span>Open</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {activeTab === "preview" && imageSrc && (
              <>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out (-)"
                  className="p-1 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset Zoom (0)"
                  className="px-2 py-0.5 text-[11px] font-mono text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
                >
                  {isFit ? "Fit" : `${Math.round(zoom * 100)}%`}
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In (+)"
                  className="p-1 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Viewport Content Area */}
        <div className="flex-1 relative overflow-auto bg-stone-950 flex flex-col items-center justify-center p-3 sm:p-6">
          {activeTab === "document" && docUrl ? (
            /* DOCUMENT VIEW TAB */
            <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-stone-800 bg-stone-900">
              <iframe
                src={docUrl}
                title={asset.name || modalFileName}
                className="w-full h-full border-0 rounded-b-xl"
              ></iframe>
            </div>
          ) : activeTab === "preview" && imageSrc ? (
            /* INFOGRAPHIC PREVIEW TAB */
            <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
              <div className="relative flex items-center justify-center max-w-full max-h-full p-2">
                <img
                  src={imageSrc}
                  alt={asset.name || modalFileName}
                  style={{
                    transform: `scale(${zoom})`,
                    transition: "transform 0.15s ease-out",
                    maxWidth: isFit ? "100%" : "none",
                    maxHeight: isFit ? "100%" : "none",
                  }}
                  className="object-contain shadow-2xl rounded-xl border border-stone-800/80"
                />
              </div>
            </div>
          ) : (
            /* DOCUMENT DETAILS & TECH TAB */
            <div className="w-full h-full max-w-3xl overflow-y-auto bg-stone-900/90 rounded-xl border border-stone-800 p-6 sm:p-8 text-stone-200 space-y-6 shadow-inner">
              {/* Header */}
              <div className="border-b border-stone-800 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {asset.name || modalFileName}
                  </h1>
                </div>

                {asset.role && (
                  <p className="text-xs font-semibold text-blue-400 mt-1.5">
                    {asset.role} {asset.organization ? `| ${asset.organization}` : ""}
                  </p>
                )}
                {asset.period && (
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {asset.period} {asset.location ? `• ${asset.location}` : ""}
                  </p>
                )}
              </div>

              {/* Description */}
              {asset.description && (
                <div>
                  <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Description & Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                    {asset.description}
                  </p>
                </div>
              )}

              {/* Technical Skills Matrix Breakdown (for Tech skills) */}
              {modalFileName === "Tech skills" && asset.skillsBreakdown && (
                <div>
                  <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Skill Categories & Competencies
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(asset.skillsBreakdown).map(([categoryName, skillList]) => (
                      <div key={categoryName} className="bg-stone-950/80 p-4 rounded-xl border border-stone-800">
                        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2.5">
                          {categoryName}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {skillList.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 text-xs font-medium bg-stone-800/80 text-stone-200 rounded-md border border-stone-700/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Highlights */}
              {asset.highlights && asset.highlights.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
                    Key Accomplishments & Features
                  </h2>
                  <ul className="space-y-2.5">
                    {asset.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-300 bg-stone-950/40 p-3 rounded-lg border border-stone-800/60">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies & Tools Pills */}
              {asset.techStack && asset.techStack.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
                    Technologies & Frameworks
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {asset.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-blue-950/50 text-blue-300 rounded-lg border border-blue-800/60 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
