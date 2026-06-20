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
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold">Social Media Profiles</h2>
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md"
        >
          + Add Profile
        </button>
      </div>

      <div className="space-y-4">
        {socialMedia.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end bg-gray-50 p-4 border rounded-md">
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
              className="mb-4 px-3 py-2 text-red-500 hover:bg-red-50 rounded font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}