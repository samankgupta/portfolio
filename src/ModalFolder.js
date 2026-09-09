import React, { useState, useEffect, useRef } from "react";
import docIcon from "./images/doc.png";
import pdfIcon from "./images/pdficon.gif";
import folderIcon from "./images/folder.webp";
import ModalFile from "./ModalFile";
import { FileAssets } from "./FileURLs";

export default function ModalFolder({
  isOpen,
  onClose,
  modalPosition = { top: 100, left: 100 },
  modalFolderName = "",
}) {
  const filesInFolders = {
    Projects: [
      "FitnessTrendz",
      "Agri-Cultivate",
      "Novelty",
      "Bananaleaf",
      "KYC System",
      "AthElite",
      "TaskHub",
      "AresAI",
      "F1 Overtake Prediction",
      "Youtube Sentiment Analysis",
      "GreenHoyas",
      "A Piece Of Advice",
      "Front Desk",
    ],
    "Professional Experience": [
      "Software Engineer",
      "Data Science Intern 1",
      "Data Science Intern 2",
      "Full Stack Web Development Intern",
    ],
    "Leadership Roles": ["IEEE Computer Society", "Photography Club", "GW School of Business"],
    "About Me": ["Tech skills", "Introduction", "Resume"],
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [modalFilePosition, setModalFilePosition] = useState({ top: 0, left: 0 });
  const [modalFileName, setModalFileName] = useState("");
  const lastTapRef = useRef({ time: 0, item: null });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setSelectedItem(null);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const openFileModal = (event, name) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalFilePosition({
      top: rect.top,
      left: rect.left,
    });
    setModalFileName(name);
    setIsModalFileOpen(true);
  };

  const handleItemClick = (e, name) => {
    e.stopPropagation();
    const now = Date.now();
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        window.matchMedia("(max-width: 640px)").matches ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

    if (
      isTouchOrMobile &&
      (selectedItem === name || (lastTapRef.current.item === name && now - lastTapRef.current.time < 400))
    ) {
      openFileModal(e, name);
      lastTapRef.current = { time: 0, item: null };
      return;
    }

    lastTapRef.current = { time: now, item: name };
    setSelectedItem(name);
  };

  const closeFileModal = () => {
    setIsModalFileOpen(false);
  };

  const files = filesInFolders[modalFolderName] || [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-md p-2 sm:p-6 select-none"
      onClick={() => {
        setSelectedItem(null);
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] sm:h-[72vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden animate-expand transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="flex flex-col bg-gradient-to-b from-stone-750 to-stone-850 border-b border-stone-700/80">
          {/* Top Bar with controls */}
          <div className="flex items-center justify-between px-3 sm:px-4 h-10 sm:h-11 border-b border-stone-800/60">
            <div className="flex items-center space-x-2 w-16 sm:w-24">
              <button
                onClick={onClose}
                title="Close Window (Esc)"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950 leading-none">
                  ×
                </span>
              </button>
              <button
                onClick={onClose}
                title="Minimize Window"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950 leading-none">
                  -
                </span>
              </button>
              <button
                onClick={onClose}
                title="Zoom Window"
                className="group flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950 leading-none">
                  +
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2 truncate">
              <img src={folderIcon} alt="folder" className="w-4 h-4 object-contain filter drop-shadow flex-shrink-0" />
              <h2 className="text-stone-100 text-xs font-bold tracking-wide truncate">
                {modalFolderName}
              </h2>
            </div>

            <div className="w-20 sm:w-28 text-right">
              <span className="text-[10px] sm:text-[11px] text-stone-300 font-semibold bg-stone-800/90 px-2 py-0.5 rounded-full border border-stone-700">
                {files.length} {files.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {/* Finder Path & Navigation Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-1 sm:py-1.5 bg-stone-900/80 text-[10px] sm:text-[11px] text-stone-400 font-medium">
            <div className="flex items-center space-x-1 sm:space-x-1.5 truncate">
              <span className="text-stone-500 hidden xs:inline">Desktop</span>
              <span className="text-stone-600 hidden xs:inline">›</span>
              <span className="text-stone-500">Portfolio</span>
              <span className="text-stone-600">›</span>
              <span className="text-blue-400 font-semibold truncate">{modalFolderName}</span>
            </div>
            <div className="text-[10px] text-stone-400 font-mono hidden sm:flex items-center space-x-1">
              <span>💡 Tap / Double-click file to open</span>
            </div>
          </div>
        </div>

        {/* Finder File Grid Viewport (MOBILE RESPONSIVE GRID) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-stone-950/80">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {files.map((fileName) => {
              const asset = FileAssets[fileName] || {};
              const imageSrc = asset.image;
              const isSelected = selectedItem === fileName;
              const isDoc = Boolean(asset.docUrl);
              const isPdfIcon = fileName === "Resume" || fileName === "Research Paper";

              return (
                <div
                  key={fileName}
                  onClick={(e) => handleItemClick(e, fileName)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    openFileModal(e, fileName);
                  }}
                  className={`group flex flex-col items-center p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all duration-200 transform group-hover:scale-105 ${
                    isSelected
                      ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                      : "hover:bg-stone-800/60"
                  }`}
                >
                  {/* File Icon / Thumbnail Preview */}
                  <div className="relative flex items-center justify-center w-20 sm:w-24 h-16 sm:h-20 mb-1">
                    {isPdfIcon ? (
                      <div className="relative group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
                        <img
                          src={pdfIcon}
                          alt="PDF Document"
                          className="w-12 h-15 sm:w-14 sm:h-[60px] object-contain filter drop-shadow-md"
                        />
                      </div>
                    ) : imageSrc ? (
                      <div className="relative group-hover:scale-105 transition-transform duration-200 w-full h-full flex items-center justify-center">
                        <div className="w-full h-full p-0.5 bg-stone-800 rounded-lg border border-stone-700/50 shadow-sm flex items-center justify-center overflow-hidden bg-stone-900 group-hover:border-blue-500/50 transition-colors">
                          <img
                            src={imageSrc}
                            alt={fileName}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        {/* Image file indicator badge */}
                        <div className="absolute -bottom-1 -right-1 bg-stone-900/95 text-stone-300 text-[9px] font-bold px-1 py-0.5 rounded border border-stone-700/50 shadow-sm">
                          {isDoc ? "PDF" : "PNG"}
                        </div>
                      </div>
                    ) : (
                      <div className="relative group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={docIcon}
                          alt="doc"
                          className="w-11 h-14 sm:w-14 sm:h-[60px] object-contain filter drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* File Label */}
                  <p
                    className={`text-center text-[11px] sm:text-xs font-semibold max-w-[100px] sm:max-w-[115px] truncate px-1 py-0.5 rounded transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white shadow"
                        : "text-stone-200 group-hover:text-white"
                    }`}
                    title={asset.name || fileName}
                  >
                    {fileName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal File Viewer */}
      <ModalFile
        isOpen={isModalFileOpen}
        onClose={closeFileModal}
        modalPosition={modalFilePosition}
        modalFileName={modalFileName}
      />
    </div>
  );
}
