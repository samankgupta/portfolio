import { useEffect, useState, useRef } from "react";
import linkedin from "./images/linkedin.png";
import mail from "./images/mail.png";
import SG from "./images/SG-removebg.png";
import doc from "./images/doc.png";
import github from "./images/github.png";
import pdficon from "./images/pdficon.gif";
import folder from "./images/folder.webp";
import ModalFile from "./ModalFile";
import ModalFolder from "./ModalFolder";

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [modalFilePosition, setModalFilePosition] = useState({ top: 0, left: 0 });
  const [modalFileName, setModalFileName] = useState("");
  const [modalFolderPosition, setModalFolderPosition] = useState({ top: 0, left: 0 });
  const [modalFolderName, setModalFolderName] = useState("");
  const [activeApp, setActiveApp] = useState("Finder");
  const [activeMenu, setActiveMenu] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [batteryLevel, setBatteryLevel] = useState("100%");
  const [isCharging, setIsCharging] = useState(true);

  // Battery API integration
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        const updateBattery = () => {
          setBatteryLevel(`${Math.round(battery.level * 100)}%`);
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      }).catch(() => {
        setBatteryLevel("100%");
      });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Close menus and desktop selections when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-bar-dropdown") && !event.target.closest(".menu-bar-item")) {
        setActiveMenu(null);
      }
      if (!event.target.closest(".selectable-item")) {
        setSelectedItem(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Toast message timer reset
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  const timeFormat = currentDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const weekday = currentDateTime.toLocaleDateString("en-US", { weekday: "short" });
  const day = currentDateTime.toLocaleDateString("en-US", { day: "numeric" });
  const month = currentDateTime.toLocaleDateString("en-US", { month: "short" });

  const formattedDateTime = `${weekday} ${month} ${day} ${"\u00A0"}${timeFormat}`;
  const mobileTimeFormat = timeFormat;

  const versionNumber = `${currentDateTime.getMonth() + 1}.${currentDateTime.getDate()}`;

  const lastTapRef = useRef({ time: 0, item: null });

  const openItem = (event, name, type) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (type === "file") {
      setModalFilePosition({ top: rect.top, left: rect.left });
      setModalFileName(name);
      setIsModalFileOpen(true);
      setActiveApp("QuickLook");
    } else {
      setModalFolderPosition({ top: rect.top, left: rect.left });
      setModalFolderName(name);
      setIsModalFolderOpen(true);
      setActiveApp("Finder");
    }
  };

  const handleDoubleClick = openItem;

  const handleItemClick = (e, name, type) => {
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
      openItem(e, name, type);
      lastTapRef.current = { time: 0, item: null };
      return;
    }

    lastTapRef.current = { time: now, item: name };
    setSelectedItem(name);
  };

  const openFolderFromDock = (folderName) => {
    setModalFolderName(folderName);
    setIsModalFolderOpen(true);
    setActiveApp("Finder");
  };

  const closeFileModal = () => {
    setIsModalFileOpen(false);
  };
  const closeFolderModal = () => {
    setSelectedItem(null);
    setIsModalFolderOpen(false);
  };

  const toggleMenu = (e, menuName) => {
    if (e) e.stopPropagation();
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      }
    }
  };

  return (
    <div className="fixed inset-0 h-full w-full h-[100dvh] w-[100dvw] bg-bgimage bg-center bg-cover overflow-hidden select-none font-sans touch-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-9 sm:top-10 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] bg-stone-900/95 text-stone-100 border border-stone-700 shadow-2xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold backdrop-blur-2xl animate-bounce flex items-center justify-between space-x-2">
          <span className="truncate">{toastMessage}</span>
          <button
            onClick={() => setToastMessage("")}
            className="ml-2 text-stone-400 hover:text-white font-bold text-sm"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Menu Bar */}
      <header className="h-7 w-full bg-stone-900/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-2 sm:px-3 text-xs text-stone-200 z-30 relative shadow-md">
        {/* Left Side Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Portfolio Brand */}
          <div className="relative menu-bar-item">
            <button
              onClick={(e) => toggleMenu(e, "brand")}
              className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer hover:text-white transition-colors p-0.5 rounded hover:bg-white/10"
            >
              <img src={SG} alt="SG Logo" className="h-3.5 w-auto" />
              <span className="font-bold text-white tracking-wide">
                Samank Gupta
              </span>
            </button>

            {/* System Info Dropdown */}
            {activeMenu === "brand" && (
              <div className="absolute top-7 left-0 w-60 sm:w-64 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(null);
                    showToast(`Samank's Portfolio OS v${versionNumber}`);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                >
                  <span className="font-semibold">About Portfolio OS</span>
                  <span className="text-[10px] text-stone-400">v{versionNumber}</span>
                </button>
                <div className="border-t border-stone-800 my-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(null);
                    showToast("⚙️ Built with React, Tailwind CSS, & Custom Image Assets");
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                >
                  System Settings...
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(null);
                    showToast("⚡ 0 apps crashing! System running smooth at 120 FPS");
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                >
                  Force Quit...
                </button>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="hidden sm:flex items-center space-x-1.5 sm:space-x-3 text-stone-300 font-medium">
            <span className="hidden xs:inline font-semibold text-white bg-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[11px] sm:text-xs">
              {activeApp}
            </span>

            {/* File Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "file")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                File
              </button>
              {activeMenu === "file" && (
                <div className="absolute top-7 left-0 w-56 sm:w-60 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      openFolderFromDock("Projects");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    📁 Open Projects Folder
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      handleDoubleClick(e, "Resume", "file");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    📄 QuickLook Resume PDF
                  </button>
                  <div className="border-t border-stone-800 my-1" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      closeFileModal();
                      closeFolderModal();
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    × Close Active Window
                  </button>
                </div>
              )}
            </div>

            {/* Edit Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "edit")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                Edit
              </button>
              {activeMenu === "edit" && (
                <div className="absolute top-7 left-0 w-60 sm:w-64 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      showToast("↩️ Undo: Cannot undo Samank's work experience!");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Undo Action</span>
                    <span className="text-[10px] text-stone-400">⌘Z</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      showToast("↪️ Redo: Still 100% optimized!");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Redo Action</span>
                    <span className="text-[10px] text-stone-400">⇧⌘Z</span>
                  </button>
                  <div className="border-t border-stone-800 my-1" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      navigator.clipboard?.writeText("Python, React, AI, Machine Learning, Cloud");
                      showToast("📋 Copied Samank's Tech Stack to Clipboard!");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Copy Skills</span>
                    <span className="text-[10px] text-stone-400">⌘C</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      setSelectedItem("Projects");
                      showToast("✨ Selected Projects Folder!");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Select Desktop Item</span>
                    <span className="text-[10px] text-stone-400">⌘A</span>
                  </button>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "view")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                View
              </button>
              {activeMenu === "view" && (
                <div className="absolute top-7 left-0 w-60 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      showToast("🖼️ Icons Grid layout active");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    As Icons Grid
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      toggleFullScreen();
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between"
                  >
                    <span>Toggle Full Screen</span>
                    <span className="text-[10px] text-stone-400">F11</span>
                  </button>
                </div>
              )}
            </div>

            {/* Go Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "go")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                Go
              </button>
              {activeMenu === "go" && (
                <div className="absolute top-7 left-0 w-60 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      openFolderFromDock("Projects");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    🚀 Go to Projects
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      openFolderFromDock("Professional Experience");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    💼 Go to Experience
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      openFolderFromDock("Leadership Roles");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    🏆 Go to Leadership
                  </button>
                </div>
              )}
            </div>

            {/* Window Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "window")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                Window
              </button>
              {activeMenu === "window" && (
                <div className="absolute top-7 left-0 w-60 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      closeFolderModal();
                      closeFileModal();
                      showToast("🟡 All windows closed");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    Minimize All
                  </button>
                </div>
              )}
            </div>

            {/* Help Menu */}
            <div className="relative menu-bar-item">
              <button
                onClick={(e) => toggleMenu(e, "help")}
                className="hover:text-white transition-colors px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] sm:text-xs"
              >
                Help
              </button>
              {activeMenu === "help" && (
                <div className="absolute top-7 left-0 w-64 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-1 z-50 text-xs text-stone-200 menu-bar-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      showToast("💡 Quick Tip: Double-click any folder or file to preview!");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    💡 Navigation Help
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      window.open("mailto:samankgupta@gmail.com", "_blank");
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white"
                  >
                    ✉️ Contact Samank (Email)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Quick Links, Battery, & Date/Time */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* Quick Action Link Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 px-0.5 sm:px-1">
            <button
              onClick={(e) => handleDoubleClick(e, "Resume", "file")}
              title="📄 QuickLook Resume Document"
              className="group relative p-0.5 sm:p-1 hover:bg-white/15 rounded transition-all duration-150"
            >
              <img src={doc} alt="Resume" className="h-3.5 w-auto filter brightness-0 invert drop-shadow" />
            </button>

            <a
              href="https://github.com/samankgupta"
              target="_blank"
              rel="noreferrer"
              title="🐙 GitHub Profile (@samankgupta)"
              className="group relative p-0.5 sm:p-1 hover:bg-white/15 rounded transition-all duration-150"
            >
              <img src={github} alt="GitHub" className="h-3.5 w-auto filter brightness-0 invert drop-shadow" />
            </a>

            <a
              href="https://www.linkedin.com/in/samank-gupta/"
              target="_blank"
              rel="noreferrer"
              title="💼 LinkedIn Connection"
              className="group relative p-0.5 sm:p-1 hover:bg-white/15 rounded transition-all duration-150"
            >
              <img src={linkedin} alt="LinkedIn" className="h-3.5 w-auto filter brightness-0 invert drop-shadow" />
            </a>

            <a
              href="mailto:samankgupta@gmail.com"
              target="_blank"
              rel="noreferrer"
              title="✉️ Send Email to Samank"
              className="group relative p-0.5 sm:p-1 hover:bg-white/15 rounded transition-all duration-150"
            >
              <img src={mail} alt="Email" className="h-3.5 w-auto filter brightness-0 invert drop-shadow" />
            </a>
          </div>

          {/* Battery Status Indicator & Dropdown */}
          <div className="relative menu-bar-item hidden sm:block">
            <button
              onClick={(e) => toggleMenu(e, "battery")}
              className="flex items-center space-x-1 text-[11px] sm:text-xs text-stone-200 font-medium px-1 sm:px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
              title={`Battery Level: ${batteryLevel}${isCharging ? " (Charging)" : ""}`}
            >
              <span className="text-[10px] sm:text-[11px] font-mono">{batteryLevel}</span>
              <div className="relative flex items-center">
                <div className="w-4 sm:w-5 h-2.5 rounded-[2px] border border-stone-300 p-0.5 flex items-center">
                  <div
                    className="h-full bg-stone-100 rounded-[1px] transition-all"
                    style={{ width: batteryLevel }}
                  />
                </div>
                <div className="w-0.5 h-1 bg-stone-300 rounded-r-[1px]" />
              </div>
            </button>

            {activeMenu === "battery" && (
              <div className="absolute top-7 right-0 w-56 bg-stone-900/95 backdrop-blur-2xl border border-stone-700/80 rounded-xl shadow-2xl py-2 px-3 z-50 text-xs text-stone-200 menu-bar-dropdown">
                <div className="flex items-center justify-between font-semibold pb-1.5 border-b border-stone-800">
                  <span className="text-stone-300">Battery</span>
                  <span className="text-stone-100 font-mono">{batteryLevel}</span>
                </div>
                
                <div className="py-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Power Source:</span>
                    <span className="font-semibold text-white">
                      {isCharging ? "Power Adapter" : "Battery"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Status:</span>
                    <span className="text-stone-200">
                      {isCharging ? "Charging ⚡" : "Using Battery"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-1.5 mt-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(null);
                      showToast(`⚙️ Battery Health: Normal (${batteryLevel})`);
                    }}
                    className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-stone-300 transition-colors text-[11px]"
                  >
                    Battery Settings...
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-stone-200 font-medium text-[11px] sm:text-xs tracking-tight pl-1.5 sm:pl-2 border-l border-white/10">
            <span className="hidden sm:inline">{formattedDateTime}</span>
            <span className="inline sm:hidden">{mobileTimeFormat}</span>
          </div>
        </div>
      </header>

      {/* Main Desktop Container & Crawling Heading */}
      <main className="contents">
        <h1 className="sr-only">Samank Gupta - Software Engineer & Data Scientist Portfolio OS</h1>

      {/* Desktop Items Column Container (ALIGNED & SPACED EVENLY) */}
      <div
        className="absolute top-10 sm:top-12 right-3 sm:right-10 flex flex-col items-center gap-3.5 sm:gap-6 z-10 select-none"
        onClick={() => setSelectedItem(null)}
      >
        {/* Projects Folder */}
        <div
          className="selectable-item flex flex-col items-center w-20 sm:w-24 cursor-pointer group"
          onClick={(e) => handleItemClick(e, "Projects", "folder")}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openItem(e, "Projects", "folder");
          }}
        >
          <div
            className={`p-0.5 rounded-xl transition-all duration-200 transform group-hover:scale-105 ${selectedItem === "Projects"
                ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                : "group-hover:bg-white/10"
              }`}
          >
            <img src={folder} alt="Projects" className="w-[56px] h-[56px] sm:w-22 sm:h-22 object-contain filter drop-shadow-xl" />
          </div>
          <p
            className={`text-xs sm:text-sm font-semibold text-center mt-0.5 px-1 py-0.5 rounded-md transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] ${selectedItem === "Projects"
                ? "bg-blue-600 text-white shadow"
                : "text-white group-hover:bg-black/40"
              }`}
          >
            Projects
          </p>
        </div>

        {/* Professional Experience Folder */}
        <div
          className="selectable-item flex flex-col items-center w-20 sm:w-24 cursor-pointer group"
          onClick={(e) => handleItemClick(e, "Professional Experience", "folder")}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openItem(e, "Professional Experience", "folder");
          }}
        >
          <div
            className={`p-0.5 rounded-xl transition-all duration-200 transform group-hover:scale-105 ${selectedItem === "Professional Experience"
                ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                : "group-hover:bg-white/10"
              }`}
          >
            <img src={folder} alt="Professional Experience" className="w-[56px] h-[56px] sm:w-22 sm:h-22 object-contain filter drop-shadow-xl" />
          </div>
          <p
            className={`text-xs sm:text-sm font-semibold text-center mt-0.5 px-1 py-0.5 rounded-md transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] ${selectedItem === "Professional Experience"
                ? "bg-blue-600 text-white shadow"
                : "text-white group-hover:bg-black/40"
              }`}
          >
            Experience
          </p>
        </div>

        {/* Leadership Roles Folder */}
        <div
          className="selectable-item flex flex-col items-center w-20 sm:w-24 cursor-pointer group"
          onClick={(e) => handleItemClick(e, "Leadership Roles", "folder")}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openItem(e, "Leadership Roles", "folder");
          }}
        >
          <div
            className={`p-0.5 rounded-xl transition-all duration-200 transform group-hover:scale-105 ${selectedItem === "Leadership Roles"
                ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                : "group-hover:bg-white/10"
              }`}
          >
            <img src={folder} alt="Leadership Roles" className="w-[56px] h-[56px] sm:w-22 sm:h-22 object-contain filter drop-shadow-xl" />
          </div>
          <p
            className={`text-xs sm:text-sm font-semibold text-center mt-0.5 px-1 py-0.5 rounded-md transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] ${selectedItem === "Leadership Roles"
                ? "bg-blue-600 text-white shadow"
                : "text-white group-hover:bg-black/40"
              }`}
          >
            Leadership
          </p>
        </div>

        {/* Research Paper File */}
        <div
          className="selectable-item flex flex-col items-center w-20 sm:w-24 cursor-pointer group"
          onClick={(e) => handleItemClick(e, "researchPaper", "file")}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openItem(e, "Research Paper", "file");
          }}
        >
          <div
            className={`p-0.5 rounded-xl transition-all duration-200 transform group-hover:scale-105 ${selectedItem === "researchPaper"
                ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                : "group-hover:bg-white/10"
              }`}
          >
            <img src={pdficon} alt="Research Paper" className="w-[56px] h-[56px] sm:w-22 sm:h-22 object-contain filter drop-shadow-xl" />
          </div>
          <p
            className={`text-xs sm:text-sm font-semibold text-center mt-0.5 px-1 py-0.5 rounded-md leading-tight max-w-[76px] sm:max-w-[100px] transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] ${selectedItem === "researchPaper"
                ? "bg-blue-600 text-white shadow"
                : "text-white group-hover:bg-black/40"
              }`}
          >
            Research<br className="sm:hidden" /> Paper
          </p>
        </div>

        {/* About Me Folder */}
        <div
          className="selectable-item flex flex-col items-center w-20 sm:w-24 cursor-pointer group"
          onClick={(e) => handleItemClick(e, "About Me", "folder")}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openItem(e, "About Me", "folder");
          }}
        >
          <div
            className={`p-0.5 rounded-xl transition-all duration-200 transform group-hover:scale-105 ${selectedItem === "About Me"
                ? "bg-blue-600/30 ring-1 ring-blue-400/60 shadow-md"
                : "group-hover:bg-white/10"
              }`}
          >
            <img src={folder} alt="About Me" className="w-[56px] h-[56px] sm:w-22 sm:h-22 object-contain filter drop-shadow-xl" />
          </div>
          <p
            className={`text-xs sm:text-sm font-semibold text-center mt-0.5 px-1 py-0.5 rounded-md transition-colors [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] ${selectedItem === "About Me"
                ? "bg-blue-600 text-white shadow"
                : "text-white group-hover:bg-black/40"
              }`}
          >
            About Me
          </p>
        </div>
      </div>

      {/* Bottom Dock */}
      <div className="hidden sm:block absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center space-x-1 sm:space-x-3 px-2 py-1.5 sm:px-3 sm:py-2 bg-stone-900/75 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl transition-all">
          <button
            onClick={() => openFolderFromDock("Projects")}
            title="Projects Folder"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={folder} alt="Projects" className="w-7 h-7 sm:w-10 sm:h-10 object-contain filter drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              Projects
            </span>
            <div className="w-1 h-1 bg-stone-300 rounded-full mx-auto mt-0.5 sm:mt-1 opacity-80" />
          </button>

          <button
            onClick={() => openFolderFromDock("Professional Experience")}
            title="Work Experience"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={folder} alt="Experience" className="w-7 h-7 sm:w-10 sm:h-10 object-contain filter drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              Work Experience
            </span>
            <div className="w-1 h-1 bg-stone-300 rounded-full mx-auto mt-0.5 sm:mt-1 opacity-80" />
          </button>

          <button
            onClick={() => openFolderFromDock("Leadership Roles")}
            title="Leadership Roles"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={folder} alt="Leadership" className="w-7 h-7 sm:w-10 sm:h-10 object-contain filter drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              Leadership Roles
            </span>
            <div className="w-1 h-1 bg-stone-300 rounded-full mx-auto mt-0.5 sm:mt-1 opacity-80" />
          </button>

          <button
            onClick={() => openFolderFromDock("About Me")}
            title="About Me Folder"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={folder} alt="About Me" className="w-7 h-7 sm:w-10 sm:h-10 object-contain filter drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              About Me
            </span>
            <div className="w-1 h-1 bg-stone-300 rounded-full mx-auto mt-0.5 sm:mt-1 opacity-80" />
          </button>

          <div className="w-px h-6 sm:h-8 bg-white/20 mx-0.5 sm:mx-1 flex-shrink-0" />

          <a
            href="https://github.com/samankgupta"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={github} alt="GitHub" className="w-6 h-6 sm:w-9 sm:h-9 object-contain filter brightness-0 invert drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              GitHub Profile
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/samank-gupta/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={linkedin} alt="LinkedIn" className="w-6 h-6 sm:w-9 sm:h-9 object-contain filter brightness-0 invert drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              LinkedIn Profile
            </span>
          </a>

          <a
            href="mailto:samankgupta@gmail.com"
            target="_blank"
            rel="noreferrer"
            title="Email"
            className="group relative p-1 sm:p-2 hover:-translate-y-1.5 hover:scale-110 transition-all duration-200 flex-shrink-0"
          >
            <img src={mail} alt="Email" className="w-6 h-6 sm:w-9 sm:h-9 object-contain filter brightness-0 invert drop-shadow-md" />
            <span className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900/95 text-stone-200 text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700 shadow-xl font-medium">
              Email Samank
            </span>
          </a>
        </div>
      </div>

      {/* File Preview Modal */}
      <ModalFile
        isOpen={isModalFileOpen}
        onClose={closeFileModal}
        modalPosition={modalFilePosition}
        modalFileName={modalFileName}
      />

      {/* Folder Finder Modal */}
      <ModalFolder
        isOpen={isModalFolderOpen}
        onClose={closeFolderModal}
        modalPosition={modalFolderPosition}
        modalFolderName={modalFolderName}
      />
      </main>
    </div>
  );
}

export default App;
