import React, { useState, useEffect } from "react";

export default function ModalTrash({ isOpen, onClose, onEmptyTrash }) {
  const defaultItems = [
    { id: 1, name: "accidentally_committed_.env.local", size: "4 KB", date: "Just now", icon: "🔑", detail: "AWS Secret Keys exposed to GitHub" },
    { id: 2, name: "git_push_force_master.sh", size: "1 KB", date: "3 AM last night", icon: "⚠️", detail: "Overwrote senior dev's main branch" },
    { id: 3, name: "it_works_on_my_machine.dockerfile", size: "850 MB", date: "Yesterday", icon: "🐳", detail: "Failed in production anyway" },
    { id: 4, name: "stack_overflow_ctrl_c_ctrl_v.js", size: "12 KB", date: "2 days ago", icon: "📋", detail: "Unchecked code from 2011 thread" },
    { id: 5, name: "console.log('HERE 2222222').js", size: "2 KB", date: "3 days ago", icon: "🔍", detail: "Leftover print debug statement #48" },
    { id: 6, name: "css_vertical_centering_attempt.css", size: "88 KB", date: "Last week", icon: "📐", detail: "Failed 14 table-cell hacks" },
    { id: 7, name: "node_modules_heavy.tar.gz", size: "1.4 GB", date: "2 weeks ago", icon: "📦", detail: "Heavier than a black hole" },
  ];

  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEmpty = () => {
    setItems([]);
    if (onEmptyTrash) {
      onEmptyTrash();
    }
  };

  const handleRestore = () => {
    setItems(defaultItems);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[65vh] flex flex-col bg-stone-900/95 rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden animate-expand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 h-11 bg-stone-800/90 border-b border-stone-700/80">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950">×</span>
            </button>
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950">-</span>
            </button>
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950">+</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-stone-200">
            <span>🗑️ Trash</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-400 font-normal">{items.length} items</span>
          </div>

          <div>
            {items.length > 0 ? (
              <button
                onClick={handleEmpty}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg shadow transition-colors"
              >
                Empty Trash
              </button>
            ) : (
              <button
                onClick={handleRestore}
                className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] font-semibold rounded-lg border border-stone-700 transition-colors"
              >
                Restore Items
              </button>
            )}
          </div>
        </div>

        {/* Trash Content List */}
        <div className="flex-1 p-4 overflow-y-auto bg-stone-950/80">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-4xl">✨</span>
              <p className="text-sm font-bold text-stone-300">Trash is Completely Empty!</p>
              <p className="text-xs text-stone-500 max-w-xs">
                All software bugs, redundant dependencies, and sleepless nights have been permanently deleted.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 bg-stone-900/90 hover:bg-stone-800/80 rounded-xl border border-stone-800/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-stone-200">{item.name}</p>
                      {item.detail && (
                        <p className="text-[11px] text-stone-400 font-medium">{item.detail}</p>
                      )}
                      <p className="text-[10px] text-stone-500">Deleted {item.date}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">{item.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
