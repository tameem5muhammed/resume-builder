"use client";
import { useResumeStore } from '@/app/store/useResumeStore';

export function SectionToggles() {
  const visibility = useResumeStore((state) => state.data.visibility);
  const toggleVisibility = useResumeStore((state) => state.toggleVisibility);

  const sections: { key: keyof typeof visibility; label: string }[] = [
    { key: 'summary', label: 'Summary' },
    { key: 'education', label: 'Education' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'volunteer', label: 'Volunteer' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'awards', label: 'Awards' },
    { key: 'languages', label: 'Languages' },
    { key: 'hobbies', label: 'Hobbies' },
    { key: 'references', label: 'References' },
    { key: 'footer', label: 'Footer' },
  ];

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800 mb-8">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2 text-white">Toggle Sections</h2>
      <div className="flex flex-wrap gap-4">
        {sections.map(({ key, label }) => (
          <label key={key} className="flex items-center cursor-pointer space-x-2">
            <input
              type="checkbox"
              // The double bang (!!) forces undefined to become false, keeping the input strictly controlled
              checked={!!visibility[key]} 
              onChange={() => toggleVisibility(key)}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className={`text-sm ${visibility[key] ? 'text-gray-200' : 'text-gray-500 line-through'}`}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}