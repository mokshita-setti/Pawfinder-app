export const HeroDog = ({ size = 158 }: { size?: number }) => (
  <svg width={size} height={size * 1.12} viewBox="0 0 158 178" fill="none">
    <defs>
      <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C4B5FD" stopOpacity=".35" />
        <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="79" cy="89" r="70" fill="url(#heroGlow)" />
    <circle cx="22" cy="30" r="3.5" fill="#DDD6FE" opacity=".7" />
    <circle cx="138" cy="45" r="2.5" fill="#BAE6FD" opacity=".6" />
    <circle cx="18" cy="90" r="2" fill="#C4B5FD" opacity=".5" />
    <ellipse cx="33" cy="68" rx="18" ry="31" fill="#F59E0B" transform="rotate(-10 33 68)" />
    <ellipse cx="125" cy="68" rx="18" ry="31" fill="#F59E0B" transform="rotate(10 125 68)" />
    <ellipse cx="79" cy="76" rx="47" ry="44" fill="#FCD34D" />
    <ellipse cx="79" cy="93" rx="28" ry="20" fill="#FBBF24" />
    <circle cx="61" cy="68" r="9.5" fill="#1a1a2e" />
    <circle cx="97" cy="68" r="9.5" fill="#1a1a2e" />
    <circle cx="64.5" cy="64" r="3.5" fill="white" />
    <circle cx="100.5" cy="64" r="3.5" fill="white" />
    <circle cx="66" cy="62" r="1.5" fill="white" opacity=".7" />
    <circle cx="102" cy="62" r="1.5" fill="white" opacity=".7" />
    <ellipse cx="79" cy="87" rx="10" ry="7" fill="#1a1a2e" />
    <ellipse cx="75" cy="84" rx="3" ry="2" fill="#374151" opacity=".5" />
    <path
      d="M60 97 Q79 114 98 97"
      stroke="#92400E"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="79" cy="110" rx="9" ry="7" fill="#FCA5A5" />
    <line x1="79" y1="104" x2="79" y2="117" stroke="#FB7185" strokeWidth="1.5" opacity=".4" />
    <path
      d="M44 116 Q79 125 114 116"
      stroke="#7C3AED"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    <rect
      x="64"
      y="116"
      width="30"
      height="30"
      rx="5"
      fill="white"
      stroke="#DDD6FE"
      strokeWidth="1.5"
    />
    <rect x="67" y="119" width="5" height="5" rx="1" fill="#8B5CF6" />
    <rect x="74" y="119" width="2" height="2" fill="#8B5CF6" />
    <rect x="78" y="119" width="3" height="2" fill="#8B5CF6" />
    <rect x="83" y="119" width="5" height="5" rx="1" fill="#8B5CF6" />
    <rect x="67" y="126" width="2" height="4" fill="#8B5CF6" />
    <rect x="71" y="127" width="3" height="2" fill="#8B5CF6" />
    <rect x="76" y="126" width="2" height="2" fill="#8B5CF6" />
    <rect x="80" y="126" width="2" height="4" fill="#8B5CF6" />
    <rect x="83" y="126" width="5" height="5" rx="1" fill="#8B5CF6" />
    <rect x="67" y="132" width="5" height="5" rx="1" fill="#8B5CF6" />
    <rect x="74" y="132" width="2" height="2" fill="#8B5CF6" />
    <rect x="78" y="134" width="5" height="2" fill="#8B5CF6" />
    <rect x="85" y="132" width="2" height="4" fill="#8B5CF6" />
    <circle cx="79" cy="131" r="5.5" fill="#EDE9FE" />
    <svg x="75.5" y="127.5" width="7" height="7" viewBox="0 0 100 100" fill="#8B5CF6">
      <ellipse cx="35" cy="14" rx="11" ry="13" />
      <ellipse cx="65" cy="14" rx="11" ry="13" />
      <ellipse cx="11" cy="43" rx="9" ry="12" />
      <ellipse cx="89" cy="43" rx="9" ry="12" />
      <path d="M50 33 C29 33 18 48 18 64 C18 81 33 91 50 91 C67 91 82 81 82 64 C82 48 71 33 50 33Z" />
    </svg>
  </svg>
);

export const QRCodeSvg = ({ size = 148 }: { size?: number }) => {
  const c = size / 21;
  const m = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
  ];
  const skipCenter = (x: number, y: number) => x >= 8 && x <= 12 && y >= 8 && y <= 12;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="white" />
      {m.map((row, y) =>
        row.map((dark, x) => {
          if (!dark || skipCenter(x, y)) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * c + 0.6}
              y={y * c + 0.6}
              width={c - 0.8}
              height={c - 0.8}
              rx={c * 0.18}
              fill="#1E293B"
            />
          );
        })
      )}
      <circle cx={size / 2} cy={size / 2} r={size * 0.115} fill="#EDE9FE" />
      <g transform={`translate(${size / 2 - size * 0.075},${size / 2 - size * 0.075})`}>
        <svg width={size * 0.15} height={size * 0.15} viewBox="0 0 100 100" fill="#8B5CF6">
          <ellipse cx="35" cy="14" rx="11" ry="13" />
          <ellipse cx="65" cy="14" rx="11" ry="13" />
          <ellipse cx="11" cy="43" rx="9" ry="12" />
          <ellipse cx="89" cy="43" rx="9" ry="12" />
          <path d="M50 33 C29 33 18 48 18 64 C18 81 33 91 50 91 C67 91 82 81 82 64 C82 48 71 33 50 33Z" />
        </svg>
      </g>
    </svg>
  );
};
