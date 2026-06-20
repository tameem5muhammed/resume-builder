"use client";

import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '../pdf/ResumeDocument';
import { useResumeStore } from '@/app/store/useResumeStore';

export default function ResumePreview() {
  // Pull the live data straight from our Zustand store
  const data = useResumeStore((state) => state.data);

  return (
    <PDFViewer className="w-full h-full border-none rounded-md">
      <ResumeDocument data={data} />
    </PDFViewer>
  );
}