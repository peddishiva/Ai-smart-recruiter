import { useEffect, useRef, useState } from 'react';

export function useChartSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const updateWidth = () => {
      setWidth(Math.floor(node.getBoundingClientRect().width));
    };

    updateWidth();

    const frame = requestAnimationFrame(updateWidth);
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    width,
    height: 320,
    ready: width > 0,
  };
}
