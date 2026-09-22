const TITLE_FONT = "var(--font-urbanist), Urbanist, sans-serif";

/* A self-contained "podcast studio" banner, standing in for a licensed photo
   we don't have in the asset pack — dark acoustic-foam wall, twin mics either
   side of a glowing wordmark, plus an animated waveform. Fills its parent, so
   the caller controls aspect ratio / rounding via className. */
export function StudioBanner({ className = "absolute inset-0" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 20%, #5a1414 0%, #2a0d0d 45%, #150808 100%)",
        }}
      />
      {/* foam-panel pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="foam" width="46" height="40" patternUnits="userSpaceOnUse">
            <polygon points="23,2 44,20 23,38 2,20" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#foam)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-14">
        {[0, 1].map((side) => (
          <svg key={side} width="64" height="140" viewBox="0 0 64 140" className="opacity-90 sm:hidden">
            <rect x="24" y="0" width="16" height="70" rx="8" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
            <rect x="14" y="70" width="36" height="8" rx="4" fill="#c7c9cc" />
            <rect x="28" y="78" width="8" height="40" fill="#c7c9cc" />
            <ellipse cx="32" cy="122" rx="22" ry="6" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
          </svg>
        ))}
        <svg
          width="120"
          height="260"
          viewBox="0 0 64 140"
          className="hidden opacity-90 sm:block"
        >
          <rect x="24" y="0" width="16" height="70" rx="8" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
          <rect x="14" y="70" width="36" height="8" rx="4" fill="#c7c9cc" />
          <rect x="28" y="78" width="8" height="40" fill="#c7c9cc" />
          <ellipse cx="32" cy="122" rx="22" ry="6" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
        </svg>

        <div className="flex flex-col items-center">
          <span
            className="whitespace-nowrap text-[22px] font-extrabold uppercase tracking-[0.3em] text-transparent sm:text-[42px]"
            style={{
              fontFamily: TITLE_FONT,
              WebkitTextStroke: "1px #f4b8ff",
              textShadow: "0 0 18px #e879f9, 0 0 42px #a21caf",
            }}
          >
            Podcast
          </span>
          <div className="mt-3 flex items-end gap-[3px] sm:mt-5 sm:gap-1">
            {[6, 12, 18, 26, 34, 26, 18, 12, 20, 30, 22, 14, 8].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full bg-white/90 sm:w-[3px]"
                style={{ height: h * 0.55, boxShadow: "0 0 6px rgba(255,255,255,0.7)" }}
              />
            ))}
          </div>
        </div>

        <svg
          width="120"
          height="260"
          viewBox="0 0 64 140"
          className="hidden scale-x-[-1] opacity-90 sm:block"
        >
          <rect x="24" y="0" width="16" height="70" rx="8" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
          <rect x="14" y="70" width="36" height="8" rx="4" fill="#c7c9cc" />
          <rect x="28" y="78" width="8" height="40" fill="#c7c9cc" />
          <ellipse cx="32" cy="122" rx="22" ry="6" fill="#0e0e10" stroke="#c7c9cc" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
