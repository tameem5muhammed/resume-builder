"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '../pdf/ResumeDocument';
import { ResumeData } from '@/app/store/useResumeStore'; // Adjust path if needed

export function PublicDownloadButton({ data }: { data: ResumeData }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fileName = data.personalInfo.name 
    ? `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` 
    : 'Resume.pdf';

  if (!isClient) {
    return (
      <button className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md cursor-not-allowed">
        Loading...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
      fileName={fileName}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-md transition-colors"
    >
      {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  );
}