import { useEffect, useRef, useState } from "react";

export const ITEM_EXIT_DURATION_MS = 260;

export const ITEM_MOTION_STATES = {
  idle: "idle",
  default: "exiting-default",
  complete: "exiting-complete",
  delete: "exiting-delete",
};

export function useAnimatedItemAction(duration = ITEM_EXIT_DURATION_MS) {
  const [pendingItems, setPendingItems] = useState({});
  const timersRef = useRef(new Map());
  const busyRef = useRef(false);

  useEffect(() => {
    return () => {
      for (const timeoutId of timersRef.current.values()) {
        window.clearTimeout(timeoutId);
      }
      timersRef.current.clear();
      busyRef.current = false;
    };
  }, []);

  function runItemAction(itemKey, motionState, callback) {
    if (!itemKey || busyRef.current || timersRef.current.has(itemKey)) {
      return false;
    }

    busyRef.current = true;
    setPendingItems({ [itemKey]: motionState });

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const timeoutId = window.setTimeout(() => {
      timersRef.current.delete(itemKey);

      try {
        callback();
      } finally {
        busyRef.current = false;
        setPendingItems({});
      }
    }, prefersReducedMotion ? 0 : duration);

    timersRef.current.set(itemKey, timeoutId);
    return true;
  }

  function getMotionState(itemKey) {
    return pendingItems[itemKey] ?? ITEM_MOTION_STATES.idle;
  }

  return {
    getMotionState,
    isSectionBusy: Object.keys(pendingItems).length > 0,
    runItemAction,
  };
}
