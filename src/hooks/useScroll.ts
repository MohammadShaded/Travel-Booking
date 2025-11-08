import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll position
 * Returns isScrolled: true when user scrolls past threshold
 */
export function useScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const shouldScroll = scrollPosition > threshold;
          
          // Only update if state actually changed (prevents flickering)
          if (shouldScroll !== isScrolled) {
            setIsScrolled(shouldScroll);
          }
          
          ticking = false;
        });

        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, isScrolled]);

  return { isScrolled };
}
