import React, { useState, useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 16;
const INITIAL_SPEED = 140;

export default function ModalSnakeGame({ isOpen, onClose }) {
  const [snake, setSnake] = useState([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]);
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const generateFood = useCallback((currentSnake) => {
    let candidate;
    let collision = true;
    while (collision) {
      candidate = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = false;
      for (let i = 0; i < currentSnake.length; i++) {
        if (currentSnake[i].x === candidate.x && currentSnake[i].y === candidate.y) {
          collision = true;
          break;
        }
      }
    }
    return candidate;
  }, []);

  const resetGame = () => {
    const initialSnake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isOpen || gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const dir = directionRef.current;

        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Check Wall Collisions
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            setHighScore((h) => Math.max(h, nextScore));
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [isOpen, gameOver, isPaused, food, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === " " || e.key === "p" || e.key === "P") {
        setIsPaused((p) => !p);
        return;
      }

      const dir = directionRef.current;
      if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && dir !== "DOWN") {
        setDirection("UP");
      } else if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && dir !== "UP") {
        setDirection("DOWN");
      } else if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && dir !== "RIGHT") {
        setDirection("LEFT");
      } else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && dir !== "LEFT") {
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-stone-900/95 rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden flex flex-col items-center animate-expand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titlebar */}
        <div className="w-full flex items-center justify-between px-4 h-10 bg-stone-800/90 border-b border-stone-700/80">
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-red-950">×</span>
            </button>
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-950">-</span>
            </button>
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 flex items-center justify-center group">
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-green-950">+</span>
            </button>
          </div>
          <span className="text-xs font-bold text-stone-200">🐍 Retro Arcade Snake</span>
          <div className="w-12" />
        </div>

        {/* Score Header */}
        <div className="w-full px-6 py-2 bg-stone-950 flex items-center justify-between text-xs font-mono border-b border-stone-800">
          <div className="text-emerald-400 font-bold">SCORE: {score}</div>
          <div className="text-amber-400 font-bold">HIGH SCORE: {highScore}</div>
        </div>

        {/* Game Arena Grid */}
        <div className="relative p-4 bg-stone-950">
          <div
            className="grid gap-1 bg-stone-900 p-2 rounded-xl border border-stone-800"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              width: "280px",
              height: "280px",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
              const x = idx % GRID_SIZE;
              const y = Math.floor(idx / GRID_SIZE);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;

              let cellStyle = "bg-stone-950/60 rounded-[3px]";
              if (isHead) cellStyle = "bg-emerald-400 shadow-md shadow-emerald-500/50 rounded-[4px]";
              else if (isBody) cellStyle = "bg-emerald-600 rounded-[3px]";
              else if (isFood) cellStyle = "bg-red-500 animate-pulse rounded-full shadow-md shadow-red-500/50";

              return <div key={idx} className={cellStyle} />;
            })}
          </div>

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 rounded-xl m-4">
              <span className="text-xl font-extrabold text-red-500 font-mono tracking-widest">GAME OVER</span>
              <span className="text-xs text-stone-300 font-mono">Final Score: {score}</span>
              <button
                onClick={resetGame}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg transition-transform active:scale-95"
              >
                Play Again 🔄
              </button>
            </div>
          )}

          {/* Pause Overlay */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-xl m-4">
              <span className="text-lg font-bold text-amber-400 font-mono tracking-wider">PAUSED</span>
            </div>
          )}
        </div>

        {/* Controls Footer */}
        <div className="w-full px-4 py-2.5 bg-stone-900 flex items-center justify-between text-[11px] text-stone-400 font-mono border-t border-stone-800">
          <span>Use ⬆️⬇️⬅️➡️ or WASD</span>
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded"
          >
            {isPaused ? "Resume" : "Pause (Space)"}
          </button>
        </div>
      </div>
    </div>
  );
}
