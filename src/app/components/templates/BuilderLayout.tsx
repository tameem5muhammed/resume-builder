import React from 'react';

interface BuilderLayoutProps {
  forms: React.ReactNode;
  preview: React.ReactNode;
}

export function BuilderLayout({ forms, preview }: BuilderLayoutProps) {
  return (
    // Changed bg-gray-100 to bg-gray-950
    <div className="flex flex-col h-screen bg-gray-950 md:flex-row text-gray-100">
      
      {/* Left Side: Form Area - Changed bg-gray-50 to bg-gray-950, border to gray-800 */}
      <aside className="w-full md:w-1/2 lg:w-[45%] h-full overflow-y-auto border-r border-gray-800 bg-gray-950 p-6 custom-scrollbar">
        <div className="max-w-2xl mx-auto space-y-8">
          {forms}
        </div>
      </aside>

      {/* Right Side: PDF Preview Area - Changed bg-gray-600 to bg-gray-900 */}
      <main className="w-full md:w-1/2 lg:w-[55%] h-full bg-gray-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="w-full h-full max-w-4xl shadow-2xl rounded flex items-center justify-center border border-gray-700 overflow-hidden">
          {preview}
        </div>
      </main>
    </div>
  );
}