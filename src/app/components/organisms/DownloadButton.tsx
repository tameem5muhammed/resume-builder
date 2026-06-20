"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '../pdf/ResumeDocument';
import { useResumeStore } from '@/app/store/useResumeStore';

export function DownloadButton() {
  const data = useResumeStore((state) => state.data);
  const [isClient, setIsClient] = useState(false);

  // This ensures the component only renders in the browser, preventing server-side crashes
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format the file name dynamically based on the user's name
  const fileName = data.personalInfo.name 
    ? `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` 
    : 'My_Resume.pdf';

  // Show a disabled fallback button while Next.js is mounting the client
  if (!isClient) {
    return (
      <button className="px-6 py-2 bg-gray-400 text-white font-bold rounded-md shadow-sm cursor-not-allowed">
        Loading...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
      fileName={fileName}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition-colors flex items-center justify-center"
    >
      {/* PDFDownloadLink provides a render prop to show loading states */}
      {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  );
}