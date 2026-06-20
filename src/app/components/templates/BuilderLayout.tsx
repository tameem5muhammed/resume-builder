import React from 'react';

interface BuilderLayoutProps {
  forms: React.ReactNode;
  preview: React.ReactNode;
}

export function BuilderLayout({ forms, preview }: BuilderLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Left Side: Form Area (Scrollable) */}
      <aside className="w-full md:w-1/2 lg:w-[45%] h-full overflow-y-auto border-r border-gray-200 bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {forms}
        </div>
      </aside>

      {/* Right Side: PDF Preview Area (Sticky/Fixed) */}
      <main className="w-full md:w-1/2 lg:w-[55%] h-full bg-gray-600 flex items-center justify-center p-6 overflow-hidden">
        <div className="w-full h-full max-w-4xl bg-white shadow-2xl rounded flex items-center justify-center">
          {preview}
        </div>
      </main>
    </div>
  );
}