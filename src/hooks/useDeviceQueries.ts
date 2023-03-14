import { useEffect, useState } from 'react';

const mobileMediaQuery = window.matchMedia('(max-width: 576px)');
const tabletMediaQuery = window.matchMedia('(min-width: 577px and max-width: 1200px)');

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 576 && window.innerWidth < 1200);

  useEffect(() => {
    const queryMobileChanged = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    const queryTabletChanged = (e: MediaQueryListEvent) => {
      setIsTablet(e.matches);
    };

    try {
      mobileMediaQuery.addEventListener('change', queryMobileChanged);
      tabletMediaQuery.addEventListener('change', queryTabletChanged);
    } catch (error) {
      try {
        mobileMediaQuery.addListener(queryMobileChanged);
        tabletMediaQuery.addListener(queryTabletChanged);
      } catch (err) {
        // Empty
      }
    }

    return () => {
      try {
        mobileMediaQuery.removeEventListener('change', queryMobileChanged);
        tabletMediaQuery.removeEventListener('change', queryTabletChanged);
      } catch (error) {
        try {
          mobileMediaQuery.removeListener(queryMobileChanged);
          tabletMediaQuery.removeListener(queryTabletChanged);
        } catch (err) {
          // Empty
        }
      }
    };
  }, []);

  return { isTablet, isMobile };
}
