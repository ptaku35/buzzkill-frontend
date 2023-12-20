// useMeasureHeight.ts
import { useState, useRef, useEffect } from "react";

const useMeasureHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return { ref, headerHeight };
};

export default useMeasureHeight;
