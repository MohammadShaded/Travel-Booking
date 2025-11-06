import styles from './Logo.module.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
  showText?: boolean;
  className?: string;
}

export default function Logo({ 
  size = 'medium', 
  variant = 'default',
  showText = true,
  className = '' 
}: LogoProps) {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const containerClasses = [
    styles.logoContainer,
    styles[size],
    variant === 'white' && styles.white,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Logo Icon - Modern Travel/Hotel Symbol */}
      <svg
        width={sizeMap[size]}
        height={sizeMap[size]}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        {/* Outer building shape */}
        <path
          d="M8 24L32 8L56 24V54C56 55.0609 55.5786 56.0783 54.8284 56.8284C54.0783 57.5786 53.0609 58 52 58H12C10.9391 58 9.92172 57.5786 9.17157 56.8284C8.42143 56.0783 8 55.0609 8 54V24Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#logoGradient)"
          fillOpacity="0.1"
        />
        
        {/* Door */}
        <path
          d="M24 58V38H40V58"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Windows - Left column */}
        <rect x="16" y="28" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="16" y="40" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
        
        {/* Windows - Right column */}
        <rect x="40" y="28" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="40" y="40" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
        
        {/* Star/Quality indicator at top */}
        <path
          d="M32 4L34 10L40 10L35 14L37 20L32 16L27 20L29 14L24 10L30 10L32 4Z"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="8" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className={styles.textContainer}>
          <span className={styles.brandName}>
            TravelEase
          </span>
          {size !== 'small' && (
            <span className={styles.tagline}>
              Book Your Stay
            </span>
          )}
        </div>
      )}
    </div>
  );
}
