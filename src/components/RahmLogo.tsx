interface RahmLogoProps {
  tone?: 'light' | 'dark';
  compact?: boolean;
}

export function RahmLogo({ tone = 'dark', compact = false }: RahmLogoProps) {
  const textColor = tone === 'light' ? 'text-[#FFFFFF]' : 'text-[#171918]';
  const strokeColor = tone === 'light' ? '#FFFFFF' : '#171918';

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none">
      <svg
        width={compact ? '26' : '30'}
        height={compact ? '26' : '30'}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer architectural portal frame */}
        <path
          d="M5 31V9.5L18 4L31 9.5V31"
          stroke={strokeColor}
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        {/* Inner cantilevered threshold */}
        <path
          d="M11.5 31V14.5H24.5V31"
          stroke="#B69A69"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        {/* Monolith lintel */}
        <line x1="2" y1="31" x2="34" y2="31" stroke="#B69A69" strokeWidth="1.25" />
        {/* Architectural center axis */}
        <line x1="18" y1="14.5" x2="18" y2="31" stroke={strokeColor} strokeWidth="0.9" opacity="0.65" />
      </svg>
      <span className={`font-serif tracking-[0.22em] font-medium uppercase ${textColor} ${compact ? 'text-base' : 'text-lg'}`}>
        RAHM <span className="text-[#B69A69] font-normal">LUXURY</span>
      </span>
    </span>
  );
}
