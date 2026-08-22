import { useId } from 'react';

/**
 * Kyrgyz traditional ornament components inspired by "kochkor" (ram-horn) and
 * "iri kochkor" geometric motifs found on shyrdaks and felt rugs.
 */

interface OrnamentProps {
  className?: string;
  color?: string;
  opacity?: number;
}

const ACCENT = 'var(--color-accent)';

/** Horizontal border strip with repeating kochkor motif */
export function KyrgyzBorder({ className = '', color = ACCENT, opacity = 0.5 }: OrnamentProps) {
  const id = useId();
  const patternId = `kochkor-${id.replace(/:/g, '')}`;
  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ opacity }}>
      <svg viewBox="0 0 400 32" preserveAspectRatio="xMidYMid meet" className="w-full h-8">
        <defs>
          <pattern id={patternId} x="0" y="0" width="40" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M4 16 C4 8, 12 4, 16 8 C20 12, 20 20, 16 24 C12 28, 4 24, 4 16 Z"
              fill="none" stroke={color} strokeWidth="1.2"
            />
            <path
              d="M16 8 C20 4, 28 4, 32 8 C36 12, 36 20, 32 24"
              fill="none" stroke={color} strokeWidth="1.2"
            />
            <path d="M2 2 L38 2" stroke={color} strokeWidth="0.6" />
            <path d="M2 30 L38 30" stroke={color} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="32" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

/** Corner ornament: geometric Kyrgyz frame corner */
export function KyrgyzCorner({
  className = '',
  color = ACCENT,
  opacity = 0.4,
  flip = false,
}: OrnamentProps & { flip?: boolean }) {
  return (
    <div
      className={`w-16 h-16 ${className}`}
      style={{ opacity, transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <svg viewBox="0 0 64 64" fill="none">
        <path d="M2 2 L62 2 L62 6 M2 2 L2 62 L6 62" stroke={color} strokeWidth="1.5" />
        <path d="M12 12 C12 8, 18 6, 20 10 C22 14, 20 20, 16 20 C12 20, 10 16, 12 12 Z"
          stroke={color} strokeWidth="1" />
        <path d="M20 10 C24 6, 32 6, 34 10" stroke={color} strokeWidth="1" />
        <path d="M10 20 C6 24, 6 32, 10 34" stroke={color} strokeWidth="1" />
        <rect x="8" y="8" width="4" height="4" transform="rotate(45 10 10)"
          stroke={color} strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/** Horizontal divider with central diamond and kochkor wings */
export function KyrgyzDivider({ className = '', color = ACCENT }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, ${color}80)` }} />
      <svg viewBox="0 0 48 20" width="48" height="20" fill="none">
        <path d="M4 10 C4 6, 8 4, 10 6 C12 8, 12 12, 10 14 C8 16, 4 14, 4 10 Z"
          stroke={color} strokeWidth="1" />
        <path d="M10 6 C14 2, 18 2, 20 6 M20 6 L24 10 M28 6 C30 2, 34 2, 38 6"
          stroke={color} strokeWidth="1" />
        <path d="M38 6 C40 8, 40 12, 38 14 C36 16, 32 16, 32 12 C32 8, 36 6, 38 6 Z"
          stroke={color} strokeWidth="1" />
        <rect x="22" y="8" width="4" height="4" transform="rotate(45 24 10)"
          fill={color} opacity="0.8" />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}80, ${color}40, transparent)` }} />
    </div>
  );
}

/** Floating decorative element – a single stylised kochkor rosette */
export function KyrgyzRosette({ size = 40, color = ACCENT, opacity = 0.3 }: { size?: number; color?: string; opacity?: number }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" style={{ opacity }}>
      {petals.map((deg) => {
        const r = Math.PI / 180;
        const cx = 20 + 6 * Math.cos((deg - 20) * r);
        const cy = 20 + 6 * Math.sin((deg - 20) * r);
        const mx = 20 + 14 * Math.cos(deg * r);
        const my = 20 + 14 * Math.sin(deg * r);
        const ex = 20 + 6 * Math.cos((deg + 20) * r);
        const ey = 20 + 6 * Math.sin((deg + 20) * r);
        return (
          <path
            key={deg}
            d={`M20 20 C${cx.toFixed(1)} ${cy.toFixed(1)}, ${mx.toFixed(1)} ${my.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)} Z`}
            stroke={color} strokeWidth="0.8" fill={`${color}20`}
          />
        );
      })}
      <circle cx="20" cy="20" r="3" stroke={color} strokeWidth="1" />
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}
