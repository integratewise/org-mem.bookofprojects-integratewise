import clsx from "clsx";

export function IntegrateWiseLogo({ 
  className, 
  variant = 'full', 
  color = 'blue' 
}: { 
  className?: string; 
  variant?: 'full' | 'logomark'; 
  color?: 'blue' | 'light' 
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
            stroke={isLight ? "#A4A9BE" : "#4356A9"} 
            strokeWidth="16" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
         />
         {/* Node circles */}
         <circle cx="35" cy="50" r="16" fill={isLight ? "#EDEEF0" : "#232D42"} />
         <circle cx="90" cy="50" r="22" fill={isLight ? "#F5DFEC" : "#4356A9"} />
         <circle cx="90" cy="50" r="8" fill={isLight ? "#EB4F72" : "#EB4F72"} />
         <circle cx="150" cy="50" r="18" fill={isLight ? "#EDEEF0" : "#232D42"} />
      </g>

      {/* Text (only for full variant) */}
      {variant === 'full' && (
        <g transform="translate(220, 0)">
          <text 
            x="0" 
            y="45" 
            fill={isLight ? "#F2F3F4" : "#232D42"} 
            fontFamily="Inter, system-ui, sans-serif" 
            fontWeight="bold" 
            fontSize="32"
          >
            IntegrateWise
          </text>
          <text 
            x="0" 
            y="70" 
            fill={isLight ? "#A4A9BE" : "#636A82"} 
            fontFamily="Inter, system-ui, sans-serif" 
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
