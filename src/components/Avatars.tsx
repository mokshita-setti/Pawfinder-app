export const AvatarBella = ({ size = 56 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'linear-gradient(145deg,#FEF3C7,#FDE68A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      border: `${size * 0.04}px solid rgba(251,191,36,0.3)`,
      boxShadow: '0 2px 12px rgba(251,191,36,0.2)',
    }}
  >
    <svg width={size * 0.92} height={size * 0.92} viewBox="0 0 60 60">
      <ellipse cx="10" cy="28" rx="9" ry="15" fill="#F59E0B" />
      <ellipse cx="50" cy="28" rx="9" ry="15" fill="#F59E0B" />
      <ellipse cx="30" cy="32" rx="20" ry="19" fill="#FCD34D" />
      <ellipse cx="30" cy="39" rx="12" ry="8" fill="#FBBF24" />
      <circle cx="22" cy="27" r="3.8" fill="#1a1a2e" />
      <circle cx="38" cy="27" r="3.8" fill="#1a1a2e" />
      <circle cx="23.5" cy="25.5" r="1.4" fill="white" />
      <circle cx="39.5" cy="25.5" r="1.4" fill="white" />
      <ellipse cx="30" cy="34" rx="3.5" ry="2.5" fill="#1a1a2e" />
      <path
        d="M25 38 Q30 43 35 38"
        stroke="#92400E"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="30" cy="42" rx="3" ry="2.2" fill="#FCA5A5" />
    </svg>
  </div>
);

export const AvatarBruno = ({ size = 56 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'linear-gradient(145deg,#FDF4FF,#F5D0FE)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      border: `${size * 0.04}px solid rgba(192,132,252,0.25)`,
      boxShadow: '0 2px 12px rgba(192,132,252,0.2)',
    }}
  >
    <svg width={size * 0.92} height={size * 0.92} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#F9A8D4" opacity=".25" />
      <circle cx="30" cy="31" r="18" fill="#FCEFD8" />
      <circle cx="16" cy="35" r="9" fill="#FDE8D0" opacity=".8" />
      <circle cx="44" cy="35" r="9" fill="#FDE8D0" opacity=".8" />
      <circle cx="23" cy="27" r="4.2" fill="#1a1a2e" />
      <circle cx="37" cy="27" r="4.2" fill="#1a1a2e" />
      <circle cx="24.5" cy="25.3" r="1.6" fill="white" />
      <circle cx="38.5" cy="25.3" r="1.6" fill="white" />
      <ellipse cx="30" cy="33" rx="3" ry="2" fill="#DB2777" opacity=".8" />
      <path
        d="M26 37.5 Q30 42 34 37.5"
        stroke="#C2410C"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity=".7"
      />
      <path d="M23 14 Q30 10 37 14 Q30 18 23 14Z" fill="#F472B6" opacity=".7" />
      <circle cx="30" cy="15" r="3" fill="#EC4899" opacity=".4" />
    </svg>
  </div>
);

export const AvatarLuna = ({ size = 56 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'linear-gradient(145deg,#FFF7ED,#FED7AA)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      border: `${size * 0.04}px solid rgba(251,146,60,0.25)`,
      boxShadow: '0 2px 12px rgba(251,146,60,0.2)',
    }}
  >
    <svg width={size * 0.92} height={size * 0.92} viewBox="0 0 60 60">
      <polygon points="10,24 17,8 24,24" fill="#FB923C" />
      <polygon points="50,24 43,8 36,24" fill="#FB923C" />
      <polygon points="13,22 17,12 21,21" fill="#FCA5A5" opacity=".7" />
      <polygon points="47,22 43,12 39,21" fill="#FCA5A5" opacity=".7" />
      <circle cx="30" cy="33" r="20" fill="#FDBA74" />
      <ellipse cx="30" cy="38" rx="13" ry="9" fill="#FED7AA" opacity=".6" />
      <ellipse cx="23" cy="30" rx="4.2" ry="3.5" fill="#10B981" />
      <ellipse cx="37" cy="30" rx="4.2" ry="3.5" fill="#10B981" />
      <ellipse cx="23" cy="30" rx="1.6" ry="3" fill="#1a1a2e" />
      <ellipse cx="37" cy="30" rx="1.6" ry="3" fill="#1a1a2e" />
      <circle cx="24" cy="28.5" r="1" fill="white" />
      <circle cx="38" cy="28.5" r="1" fill="white" />
      <ellipse cx="30" cy="36" rx="2.5" ry="1.8" fill="#EC4899" opacity=".9" />
      <line x1="16" y1="35" x2="27" y2="36" stroke="#92400E" strokeWidth=".7" opacity=".5" />
      <line x1="16" y1="38" x2="27" y2="38" stroke="#92400E" strokeWidth=".7" opacity=".5" />
      <line x1="33" y1="36" x2="44" y2="35" stroke="#92400E" strokeWidth=".7" opacity=".5" />
      <line x1="33" y1="38" x2="44" y2="38" stroke="#92400E" strokeWidth=".7" opacity=".5" />
    </svg>
  </div>
);

export const AVATAR_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  bella: AvatarBella,
  bruno: AvatarBruno,
  luna: AvatarLuna,
};
