"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/app/store/useResumeStore";

export function StoreInitializer({ savedData }: { savedData: any }) {
  const loadFullResume = useResumeStore((state) => state.loadFullResume);
  const initialized = useRef(false);

  useEffect(() => {
    // Only load the data once when the component mounts
    if (!initialized.current && savedData) {
      loadFullResume(savedData.id, savedData.content);
      initialized.current = true;
    }
  }, [savedData, loadFullResume]);

  return null; // This component renders nothing to the screen
}