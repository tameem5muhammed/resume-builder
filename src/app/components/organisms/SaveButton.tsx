"use client";

import { useState } from "react";
import { useResumeStore } from "@/app/store/useResumeStore";
import { saveResume } from "@/app/actions/resumeActions";

export function SaveButton() {
  const data = useResumeStore((state) => state.data);
  const currentResumeId = useResumeStore((state) => state.currentResumeId);
  const setCurrentResumeId = useResumeStore((state) => state.setCurrentResumeId);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Determine a title for the resume based on the user's name
      const title = data.personalInfo.name ? `${data.personalInfo.name}'s Resume` : "Untitled Resume";
      
      // Call our Next.js Server Action
      const result = await saveResume(title, data, currentResumeId || undefined);
      
      if (result.success && result.newId) {
        // If it was a new resume, the database generated an ID. Let's save it to memory!
        setCurrentResumeId(result.newId);
        alert("Resume saved successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className={`px-6 py-2 font-bold rounded-md shadow-md transition-colors ${
        isSaving ? "bg-gray-600 cursor-not-allowed text-gray-300" : "bg-emerald-600 hover:bg-emerald-700 text-white"
      }`}
    >
      {isSaving ? "Saving..." : "Save to Cloud"}
    </button>
  );
}