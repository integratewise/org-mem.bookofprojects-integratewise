import clsx from "clsx";

export function IntegrateWiseLogo({ 
  className, 
  variant = 'full', 
  color = 'forest' 
}: { 
  className?: string; 
  variant?: 'full' | 'logomark'; 
  color?: 'forest' | 'light' 
}) {
  const isLight = color === 'light';
  
  return (
    <svg 
      viewBox={variant === 'full' ? "0 0 420 100" : "0 0 200 100"} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("w-full h-full", className)}
    >
      {/* Logomark - Spine-inspired connected nodes */}
      <g>
         {/* Spine curve */}
         <path 
            d="M 20 50 C 50 50, 60 20, 90 20 C 120 20, 120 80, 150 80 C 170 80, 180 50, 190 50" 
            stroke={isLight ? "var(--paper-warm)" : "var(--forest-mid)"} 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
         />
         {/* Node circles */}
         <circle cx="35" cy="50" r="16" fill={isLight ? "var(--paper)" : "var(--ink)"} />
         <circle cx="90" cy="50" r="22" fill={isLight ? "var(--paper-warm)" : "var(--forest)"} />
         <circle cx="90" cy="50" r="8" fill={isLight ? "var(--gold-light)" : "var(--gold)"} />
         <circle cx="150" cy="50" r="18" fill={isLight ? "var(--paper)" : "var(--ink)"} />
      </g>

      {/* Text (only for full variant) */}
      {variant === 'full' && (
        <g transform="translate(220, 0)">
          <text 
            x="0" 
            y="45" 
            fill={isLight ? "var(--paper)" : "var(--ink)"} 
            fontFamily="var(--font-sans)" 
            fontWeight="bold" 
            fontSize="32"
          >
            IntegrateWise
          </text>
          <text 
            x="0" 
            y="70" 
            fill={isLight ? "var(--paper-warm)" : "var(--text-muted)"} 
            fontFamily="var(--font-sans)" 
            fontWeight="normal" 
            fontSize="14"
          >
            Enterprise Integrations
          </text>
        </g>
      )}
    </svg>
  );
}
