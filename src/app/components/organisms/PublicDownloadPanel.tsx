"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '../pdf/ResumeDocument';
import { ResumeData, VisibilitySettings } from '@/app/store/useResumeStore';

export function PublicDownloadPanel({ data }: { data: ResumeData }) {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Initialize the PDF visibility with the owner's original visibility settings
  const [pdfVisibility, setPdfVisibility] = useState<VisibilitySettings>(data.visibility);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper array to generate the switches cleanly
  const sections: { key: keyof VisibilitySettings; label: string }[] = [
    { key: 'education', label: 'Education' },
    { key: 'experience', label: 'Experience' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'volunteer', label: 'Volunteer' },
    { key: 'projects', label: 'Projects' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'skills', label: 'Skills' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'awards', label: 'Awards' },
    { key: 'languages', label: 'Languages' },
    { key: 'hobbies', label: 'Hobbies' },
    { key: 'references', label: 'References' },
  ];

  const handleToggle = (key: keyof VisibilitySettings) => {
    setPdfVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isClient) {
    return (
      <button className="px-6 py-2 bg-gray-200 text-gray-500 font-bold rounded-md cursor-not-allowed">
        Loading...
      </button>
    );
  }

  const fileName = data.personalInfo.name 
    ? `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` 
    : 'Resume.pdf';

  // We inject the customized visibility settings into a clone of the data
  const pdfData = { ...data, visibility: pdfVisibility };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowMenu(!showMenu)}
        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-md shadow-md transition-colors"
      >
        Customize & Download
      </button>

      {/* The Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Include in PDF:</h3>
            <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-red-500 font-bold text-lg">×</button>
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2 mb-4 custom-scrollbar">
            {sections.map(({ key, label }) => {
              // Only show the toggle if the owner actually has data for this section!
              // If the owner hid it, don't even give the public viewer the option to turn it on.
              if (!data.visibility[key]) return null;

              return (
                <label key={key} className="flex items-center cursor-pointer space-x-3 group p-1 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={pdfVisibility[key]}
                    onChange={() => handleToggle(key)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${pdfVisibility[key] ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </label>
              );
            })}
          </div>

          <PDFDownloadLink
            document={<ResumeDocument data={pdfData} />}
            fileName={fileName}
            className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md shadow-sm transition-colors"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Custom PDF')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}