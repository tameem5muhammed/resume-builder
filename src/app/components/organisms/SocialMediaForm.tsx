"use client";

import { useResumeStore, SocialLink } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function SocialMediaForm() {
  const socialMedia = useResumeStore((state) => state.data.socialMedia);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    updateList('socialMedia', [
      ...socialMedia, 
      { id: crypto.randomUUID(), platform: '', url: '' }
    ]);
  };

  const updateItem = (id: string, field: keyof SocialLink, value: string) => {
    updateList(
      'socialMedia', 
      socialMedia.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white">Social Media Profiles</h2>
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
        >
          + Add Profile
        </button>
      </div>

      <div className="space-y-4">
        {socialMedia.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end bg-gray-800 p-4 border border-gray-700 rounded-md">
            <FormField 
              label="Platform (e.g., LinkedIn)" 
              id={`platform-${item.id}`} 
              value={item.platform} 
              onChange={(e) => updateItem(item.id, 'platform', e.target.value)} 
            />
            <FormField 
              label="URL" 
              id={`url-${item.id}`} 
              type="url" 
              value={item.url} 
              onChange={(e) => updateItem(item.id, 'url', e.target.value)} 
            />
            <button 
              onClick={() => updateList('socialMedia', socialMedia.filter(p => p.id !== item.id))} 
              className="mb-4 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded font-semibold transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}