"use client";

import { useEffect, useCallback, useRef } from "react";

// ======================================================
// CONFIGURATION
// ======================================================

const DOUBLE_TAP_INTERVAL = 300; // ms between taps
const MOVEMENT_TOLERANCE = 25; // px allowed between taps

// ======================================================
// INTERACTIVE ELEMENT CHECK
// ======================================================

const INTERACTIVE_TAGS = new Set([
  "A",
  "BUTTON",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "LABEL",
  "DETAILS",
  "SUMMARY",
  "OPTION",
]);

const INTERACTIVE_ROLES = new Set([
  "button",
  "link",
  "menuitem",
  "tab",
  "checkbox",
  "radio",
  "switch",
  "slider",
  "textbox",
  "combobox",
  "listbox",
  "option",
  "spinbutton",
  "searchbox",
  "menu",
  "menubar",
]);

function isInteractiveElement(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;

  let el: HTMLElement | null = target;

  while (el) {
    // Check tag name
    if (INTERACTIVE_TAGS.has(el.tagName)) return true;

    // Check role attribute
    const role = el.getAttribute("role");
    if (role && INTERACTIVE_ROLES.has(role)) return true;

    // Check contentEditable
    if (el.isContentEditable) return true;

    // Check tabindex on elements that look interactive
    if (
      el.getAttribute("tabindex") !== null &&
      el.onclick !== null
    ) {
      return true;
    }

    // Check if it's inside a dialog/modal
    if (el.tagName === "DIALOG") return true;

    // Stop at body
    if (el === document.body) break;

    el = el.parentElement;
  }

  return false;
}

// ======================================================
// HOOK
// ======================================================

interface UseThemeGestureOptions {
  onToggle: () => void;
  enabled?: boolean;
}

export function useThemeGesture({
  onToggle,
  enabled = true,
}: UseThemeGestureOptions) {
  const lastTapRef = useRef<{
    time: number;
    x: number;
    y: number;
  } | null>(null);

  const prefersReducedMotion = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    prefersReducedMotion.current = mq.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mq.addEventListener("change", handler);

    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []);

  // ====================================================
  // TOUCH (double-tap)
  // ====================================================

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;

      // Skip interactive elements
      if (isInteractiveElement(e.target)) return;

      // Only handle single-finger taps
      if (e.changedTouches.length !== 1) return;

      const touch = e.changedTouches[0];
      const now = Date.now();

      const last = lastTapRef.current;

      if (
        last &&
        now - last.time < DOUBLE_TAP_INTERVAL &&
        Math.abs(touch.clientX - last.x) < MOVEMENT_TOLERANCE &&
        Math.abs(touch.clientY - last.y) < MOVEMENT_TOLERANCE
      ) {
        // Double-tap detected!
        lastTapRef.current = null;
        onToggle();
      } else {
        lastTapRef.current = {
          time: now,
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    },
    [enabled, onToggle]
  );

  // ====================================================
  // MOUSE (double-click)
  // ====================================================

  const handleDblClick = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;

      // Skip interactive elements
      if (isInteractiveElement(e.target)) return;

      // Check if user selected text (word selection via dbl-click)
      const selection = window.getSelection();

      if (
        selection &&
        selection.toString().trim().length > 0
      ) {
        return;
      }

      onToggle();
    },
    [enabled, onToggle]
  );

  // ====================================================
  // REGISTER LISTENERS
  // ====================================================

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    document.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    document.addEventListener("dblclick", handleDblClick);

    return () => {
      document.removeEventListener(
        "touchend",
        handleTouchEnd
      );
      document.removeEventListener(
        "dblclick",
        handleDblClick
      );
    };
  }, [enabled, handleTouchEnd, handleDblClick]);
}
