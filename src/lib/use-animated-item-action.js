import { startTransition, useEffect, useRef, useState } from "react";

export const ITEM_EXIT_DURATION_MS = 180;

export const ITEM_MOTION_STATES = {
  idle: "idle",
  default: "exiting-default",
  complete: "exiting-complete",
  delete: "exiting-delete",
};

export function useAnimatedItemAction(duration = ITEM_EXIT_DURATION_MS) {
  const [activeAction, setActiveAction] = useState(null);
  const timersRef = useRef(new Map());
  const activeKeyRef = useRef(null);

  useEffect(() => {
    return () => {
      for (const timeoutId of timersRef.current.values()) {
        window.clearTimeout(timeoutId);
      }
      timersRef.current.clear();
      activeKeyRef.current = null;
    };
  }, []);

  function runItemAction(itemKey, motionState, callback) {
    if (!itemKey || activeKeyRef.current || timersRef.current.has(itemKey)) {
      return false;
    }

    activeKeyRef.current = itemKey;
    setActiveAction({ itemKey, motionState });

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const timeoutId = window.setTimeout(() => {
      timersRef.current.delete(itemKey);

      try {
        startTransition(() => {
          callback();
        });
      } finally {
        activeKeyRef.current = null;
        setActiveAction(null);
      }
    }, prefersReducedMotion ? 0 : duration);

    timersRef.current.set(itemKey, timeoutId);
    return true;
  }

  function getMotionState(itemKey) {
    return activeAction?.itemKey === itemKey ? activeAction.motionState : ITEM_MOTION_STATES.idle;
  }

  function isItemPending(itemKey) {
    return activeAction?.itemKey === itemKey;
  }

  return {
    getMotionState,
    isItemPending,
    runItemAction,
  };
}
