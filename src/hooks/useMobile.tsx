import { useEffect, useState } from 'react';

const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  const { clientWidth } = document.documentElement;
  
  useEffect(() => {
    setIsMobile(clientWidth < 421);
  }, [clientWidth]);

  return isMobile;
};

export { useMobile };
