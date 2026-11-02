export function Bow({ size = 80, className = "" }) {
  return (
    <svg className={className} width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none" aria-hidden="true">
      <path d="M59 37C37 12 9 5 8 25C7 44 36 48 59 43C40 50 25 73 39 77C52 81 59 54 61 46C65 59 70 81 83 77C99 72 80 51 65 43C90 49 115 44 113 25C111 5 83 12 63 37" fill="#F5B9D7" stroke="#B779A5" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M25 25L48 39M94 25L72 39M42 66L55 48M80 66L67 48" stroke="#FFE9F3" strokeWidth="3" strokeLinecap="round"/>
      <rect x="53" y="33" width="15" height="16" rx="5" fill="#E79CC5" stroke="#B779A5" strokeWidth="3"/>
      <path d="M58 36L62 45" stroke="#FFF2F8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function Flower({ size = 70, color = "#C9B6F1", className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="50" cy="27" rx="15" ry="25" fill={color} stroke="#B79BD2" strokeWidth="1.5" transform={`rotate(${angle} 50 50)`}/>
      ))}
      <circle cx="50" cy="50" r="14" fill="#FFF1B9" stroke="#D8B98A" strokeWidth="2"/>
      <circle cx="45" cy="47" r="1.5" fill="#9B7792"/>
      <circle cx="55" cy="47" r="1.5" fill="#9B7792"/>
      <path d="M46 54Q50 58 54 54" stroke="#9B7792" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function Sparkles({ size = 90, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M49 8L57 36L85 44L57 52L49 80L41 52L13 44L41 36Z" fill="#F5B9D7" stroke="#C78DAF" strokeWidth="2"/>
      <path d="M81 67L85 78L96 82L85 86L81 97L77 86L66 82L77 78Z" fill="#B6D9FA"/>
      <circle cx="18" cy="79" r="4" fill="#C9B6F1"/>
    </svg>
  );
}

export function DiaryIllustration() {
  return (
    <svg viewBox="0 0 360 285" className="diary-illustration" role="img" aria-label="Illustrated pink diary with flowers and a bow">
      <ellipse cx="180" cy="258" rx="130" ry="16" fill="#E5D6EA" opacity=".65"/>
      <g transform="rotate(-9 175 140)">
        <rect x="77" y="34" width="218" height="214" rx="19" fill="#A58CB7"/>
        <rect x="66" y="27" width="218" height="214" rx="19" fill="#F4C5DC" stroke="#B77DA6" strokeWidth="3"/>
        <rect x="81" y="42" width="187" height="184" rx="12" fill="#FFEAF4" stroke="#E4A9CA" strokeDasharray="5 5" strokeWidth="2"/>
        <path d="M91 69H255M91 196H255" stroke="#E9B8D4" strokeWidth="2"/>
        <text x="175" y="111" textAnchor="middle" fontFamily="Georgia, serif" fontSize="27" fontStyle="italic" fill="#A66D9A">dear diary</text>
        <text x="175" y="135" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#B789AB">a little piece of me</text>
        <path d="M175 168C153 145 138 173 175 193C212 173 197 145 175 168Z" fill="#EBA6C9"/>
        <rect x="56" y="57" width="18" height="24" rx="7" fill="#B6D9FA" stroke="#8DAFD0" strokeWidth="2"/>
        <rect x="56" y="103" width="18" height="24" rx="7" fill="#B6D9FA" stroke="#8DAFD0" strokeWidth="2"/>
        <rect x="56" y="149" width="18" height="24" rx="7" fill="#B6D9FA" stroke="#8DAFD0" strokeWidth="2"/>
        <rect x="56" y="195" width="18" height="24" rx="7" fill="#B6D9FA" stroke="#8DAFD0" strokeWidth="2"/>
      </g>
      <path d="M280 27Q305 8 315 34Q323 56 296 61Q309 77 294 88Q278 96 271 66Q245 80 242 58Q240 39 269 46Q258 24 280 27Z" fill="#C9B6F1" stroke="#A78BCB" strokeWidth="2"/>
      <circle cx="280" cy="53" r="11" fill="#FFE5A7"/>
      <path d="M46 196L52 212L68 218L52 224L46 240L40 224L24 218L40 212Z" fill="#F4A9CE"/>
      <circle cx="314" cy="192" r="6" fill="#B6D9FA"/>
    </svg>
  );
}
