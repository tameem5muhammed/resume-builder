"use client";

import { useResumeStore, PortfolioItem } from '@/app/store/useResumeStore';
import { FormField } from '../molecules/FormField';

export function PortfolioForm() {
  const portfolio = useResumeStore((state) => state.data.portfolio);
  const updateList = useResumeStore((state) => state.updateList);

  const handleAdd = () => {
    updateList('portfolio', [...portfolio, { id: crypto.randomUUID(), title: '', link: '' }]);
  };

  const updateItem = (id: string, field: keyof PortfolioItem, value: string) => {
    updateList('portfolio', portfolio.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-xl font-bold">Portfolio Links</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md">+ Add Link</button>
      </div>

      <div className="space-y-4">
        {portfolio.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end bg-gray-50 p-4 border rounded-md">
            <FormField label="Link Title (e.g., Dribbble)" id={`title-${item.id}`} value={item.title} onChange={(e) => updateItem(item.id, 'title', e.target.value)} />
            <FormField label="URL" id={`url-${item.id}`} type="url" value={item.link} onChange={(e) => updateItem(item.id, 'link', e.target.value)} />
            <button onClick={() => updateList('portfolio', portfolio.filter(p => p.id !== item.id))} className="mb-4 px-3 py-2 text-red-500 hover:bg-red-50 rounded">Remove</button>
          </div>
        ))}
      </div>
    </section>
  );
}