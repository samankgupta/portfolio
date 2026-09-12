import React, { useState, useEffect, useRef } from "react";
import { FileAssets } from "./FileURLs";

export default function ModalTerminal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "Welcome to Samank Gupta's Portfolio Terminal (v2.6.0)\nType 'help' to see available commands or 'projects' to list all software projects.",
    },
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: "user", text: `$ ${cmd}` }];
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newHistory.push({
        type: "system",
        text: `Available Commands:
  • help       - Show this command reference
  • about      - Display Samank's bio & background
  • projects   - List all featured software engineering & ML projects
  • skills     - Show technical skill stack
  • experience - Display work experience & Spot Award
  • contact    - Get email, LinkedIn, and GitHub links
  • cat resume - Open official resume details
  • matrix     - Enter matrix mode toggle
  • whoami     - Display current terminal user
  • sudo       - Try admin escalation
  • clear      - Clear terminal screen`,
      });
    } else if (lower === "about") {
      newHistory.push({
        type: "system",
        text: `Samank Gupta — Computer Science Professional
Samank is a Computer Science professional with experience in software engineering, data engineering, and AI/ML. Previously worked as a Data Engineer at Becton Dickinson (BD) and completed my Master’s in Computer Science at George Washington University.
Passionate about applied AI, scalable software, building products that solve real-world problems, filmmaking, and sports.`,
      });
    } else if (lower === "projects") {
      const projList = Object.keys(FileAssets)
        .filter((k) => FileAssets[k].category === "Projects")
        .map((k) => `  - ${k}: ${FileAssets[k].description}`)
        .join("\n");
      newHistory.push({
        type: "system",
        text: `Featured Projects:\n${projList}`,
      });
    } else if (lower === "skills") {
      newHistory.push({
        type: "system",
        text: `Technical Skills:
  • Languages: Python, Java, C++, C, Swift, TypeScript, SQL, Kotlin, PHP
  • ML / AI: PyTorch, TensorFlow, Scikit-Learn, Gemini 2.5 Pro, LlamaIndex, Pinecone, spaCy, NLTK
  • Web Stack: React, Next.js, Node.js, Flask, FastAPI, Express, Django, Tailwind CSS
  • Cloud & Data: Azure Data Factory, Docker, AWS, MongoDB, Supabase, Databricks, PostgreSQL`,
      });
    } else if (lower === "experience") {
      newHistory.push({
        type: "system",
        text: `Professional Experience:
  1. Software Engineer @ Becton Dickinson (BD) [Jun 2023 - Jul 2024]
     - Cut ETL execution time by 35% (Azure, Python, Docker). Recipient of BD Spot Award.
  2. Data Science Intern @ Becton Dickinson (BD) [Jan 2023 - Jun 2023]
     - Analyzed 50k chatbot transcripts & projected $40K annual cost savings.
  3. Data Science Intern @ Becton Dickinson (BD) [May 2022 - Jul 2022]
     - Built NLP triage pipeline on 10k+ customer complaints with 91% accuracy.
  4. Web Dev Intern @ Acumensa Technologies [Jun 2021 - Aug 2021]
     - Built agriculture supply chain React/Django portal boosting engagement by 30%.`,
      });
    } else if (lower === "contact") {
      newHistory.push({
        type: "system",
        text: `Contact Links:
  • Email: samankgupta@gmail.com
  • LinkedIn: https://www.linkedin.com/in/samank-gupta/
  • GitHub: https://github.com/samankgupta
  • Portfolio: https://samankgupta.tech/`,
      });
    } else if (lower === "cat resume" || lower === "resume") {
      newHistory.push({
        type: "system",
        text: `PDF Resume URL: https://resume.samankgupta.tech/\nOfficial Resume loaded. You can view full document in Portfolio OS!`,
      });
    } else if (lower === "whoami") {
      newHistory.push({
        type: "system",
        text: `visitor@samankgupta-macbook-pro ~ % (Welcome hiring team & tech enthusiast!)`,
      });
    } else if (lower === "sudo" || lower.startsWith("sudo ")) {
      newHistory.push({
        type: "system",
        text: `[sudo] password for visitor: 
Permission denied: Samank has root privileges on this portfolio! 🚀`,
      });
    } else if (lower === "matrix") {
      newHistory.push({
        type: "system",
        text: `01010011 01100001 01101101 01100001 01101110 01101011 00100000 01000111 01110101 01110000 01110100 01100001
Wake up, Neo... The Matrix has you. Follow the white rabbit 🐇`,
      });
    } else if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      newHistory.push({
        type: "system",
        text: `zsh: command not found: ${cmd}. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[75vh] flex flex-col bg-stone-950/95 rounded-2xl border border-stone-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm animate-expand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 h-10 bg-stone-900 border-b border-stone-800">
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

          <div className="flex items-center space-x-2 text-stone-300 font-sans text-xs font-semibold">
            <span className="text-emerald-400 font-bold">samank@portfolio-macbook</span>
            <span className="text-stone-600">—</span>
            <span className="text-stone-400">zsh</span>
          </div>

          <div className="w-16" />
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 text-stone-200 leading-relaxed cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div
              key={idx}
              className={item.type === "user" ? "text-emerald-400 font-semibold" : "text-stone-300 whitespace-pre-wrap"}
            >
              {item.text}
            </div>
          ))}

          {/* Active Prompt Line */}
          <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-1">
            <span className="text-emerald-400 font-bold flex-shrink-0">
              samank@macbook ~ %
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent text-stone-100 focus:outline-none font-mono"
              autoFocus
              spellCheck="false"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
