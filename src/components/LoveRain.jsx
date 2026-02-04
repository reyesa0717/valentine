import { useMemo } from "react";

// Cute Penguin Face SVG
const PenguinFace = ({ color = "#1a0812", size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Head */}
    <ellipse cx="50" cy="55" rx="32" ry="35" fill={color} />

    {/* Belly / face patch */}
    <ellipse cx="50" cy="60" rx="20" ry="22" fill="#ffffff" />

    {/* Left eye */}
    <ellipse cx="40" cy="50" rx="4" ry="5" fill="#1a0812" />
    <circle cx="41" cy="49" r="1" fill="#ffffff" />

    {/* Right eye */}
    <ellipse cx="60" cy="50" rx="4" ry="5" fill="#1a0812" />
    <circle cx="61" cy="49" r="1" fill="#ffffff" />

    {/* Beak (top) */}
    <polygon points="50,56 44,62 56,62" fill="#ffb703" />
    {/* Beak (bottom) */}
    <polygon points="50,62 45,68 55,68" fill="#fca311" />

    {/* Left cheek blush */}
    <circle cx="32" cy="60" r="3" fill="#ffb6c1" opacity="0.6" />
    {/* Right cheek blush */}
    <circle cx="68" cy="60" r="3" fill="#ffb6c1" opacity="0.6" />

    {/* Left flipper */}
    <ellipse
      cx="18"
      cy="60"
      rx="8"
      ry="18"
      fill={color}
      transform="rotate(-20 18 60)"
    />

    {/* Right flipper */}
    <ellipse
      cx="82"
      cy="60"
      rx="8"
      ry="18"
      fill={color}
      transform="rotate(20 82 60)"
    />
  </svg>
);

// Heart SVG
const Heart = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Star SVG
const Star = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// POOP SVG
const Poop = ({ color = "#8b5a2b", size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Base */}
    <ellipse cx="50" cy="78" rx="28" ry="14" fill={color} />

    {/* Middle swirl */}
    <ellipse cx="50" cy="60" rx="22" ry="18" fill={color} />

    {/* Upper swirl */}
    <ellipse cx="50" cy="42" rx="16" ry="14" fill={color} />

    {/* Tip */}
    <ellipse cx="50" cy="28" rx="10" ry="9" fill={color} />

    {/* Eyes */}
    <circle cx="44" cy="58" r="2.5" fill="#1a0812" />
    <circle cx="56" cy="58" r="2.5" fill="#1a0812" />

    {/* Smile */}
    <path
      d="M45 64 Q50 68 55 64"
      stroke="#1a0812"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const components = [PenguinFace, Heart, Star, Poop];

function LoveRain() {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 6,
        size: 25 + Math.random() * 30,
        type: Math.floor(Math.random() * components.length),
        blur: 0.3 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.4,
        color: ["#ff69b4", "#ffb6c1", "#ff1493", "#ffc0cb", "#fff0f5"][
          Math.floor(Math.random() * 5)
        ],
      });
    }
    return arr;
  }, []);

  return (
    <>
      <style>{`
        @keyframes kittyFall {
          0% {
            transform: translate3d(0, -80px, 0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          8% {
            opacity: var(--item-opacity);
          }
          50% {
            transform: translate3d(20px, 50vh, 0) rotate(15deg) scale(1);
          }
          92% {
            opacity: var(--item-opacity);
          }
          100% {
            transform: translate3d(-15px, 115vh, 0) rotate(-10deg) scale(0.9);
            opacity: 0;
          }
        }
        .kitty-rain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }
        .kitty-item {
          position: absolute;
          top: -80px;
          will-change: transform, opacity;
          animation: kittyFall ease-in-out infinite;
        }
      `}</style>

      <div className="kitty-rain-container">
        {items.map((item) => {
          const Component = components[item.type];
          return (
            <div
              key={item.id}
              className="kitty-item"
              style={{
                left: item.left + "%",
                animationDuration: item.duration + "s",
                animationDelay: item.delay + "s",
                filter: `blur(${item.blur}px)`,
                "--item-opacity": item.opacity,
              }}
            >
              <Component color={item.color} size={item.size} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default LoveRain;
