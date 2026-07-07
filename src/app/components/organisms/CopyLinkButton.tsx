"use client";

import { useState } from "react";

export function CopyLinkButton({ resumeId, isPublic }: { resumeId: string; isPublic: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Construct the full URL based on the current window location
    const url = `${window.location.origin}/resume/${resumeId}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!isPublic}
      title={!isPublic ? "Set resume to Public to share" : "Copy public link"}
      className={`flex-1 text-center px-4 py-2 text-sm font-bold rounded transition-colors ${
        isPublic 
          ? copied 
            ? "bg-green-600 text-white" 
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-gray-800 text-gray-500 cursor-not-allowed"
      }`}
    >
      {copied ? "Copied!" : "Share Link"}
    </button>
  );
}