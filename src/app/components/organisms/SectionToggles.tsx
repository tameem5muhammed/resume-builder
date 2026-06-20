"use client";

import { useResumeStore } from '@/app/store/useResumeStore';

export function SectionToggles() {
  const visibility = useResumeStore((state) => state.data.visibility);
  const toggleVisibility = useResumeStore((state) => state.toggleVisibility);

  // Helper array to generate the switches cleanly
  const sections = [
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
  ] as const;

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Visible Sections</h2>
      <p className="text-sm text-gray-500 mb-6">Toggle which sections appear on your final PDF.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map(({ key, label }) => (
          <label key={key} className="flex items-center cursor-pointer space-x-3 group">
            {/* The Checkbox */}
            <input
              type="checkbox"
              checked={visibility[key]}
              onChange={() => toggleVisibility(key)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className={`text-sm font-medium transition-colors ${visibility[key] ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}