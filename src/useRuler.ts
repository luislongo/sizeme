import { RefObject, useEffect, useState } from "react";

const emptyRect: DOMRect = new DOMRect(0, 0, 0, 0);

export const useRuler = (ref: RefObject<HTMLElement>) => {
  const [rect, setRect] = useState<DOMRect>();

  const handleEventFired = () => {
    const clientRect = ref.current?.getBoundingClientRect();
    const { visibility } = getComputedStyle(ref.current!);

    visibility === "visible" && clientRect && setRect(clientRect);
    visibility === "hidden" && setRect(undefined);
  };

  const resize = new ResizeObserver((entries) => {
    handleEventFired();
  });

  const mutation = new MutationObserver((entries) => {
    handleEventFired();
  });

  useEffect(() => {
    ref.current && resize.observe(ref.current);
    ref.current && mutation.observe(ref.current, { attributes: true });

    return () => {
      resize.disconnect();
      setRect(undefined);
    };
  }, []);

  useEffect(() => {
    ref.current && resize.observe(ref.current);
  }, [ref]);

  return rect || emptyRect;
};
