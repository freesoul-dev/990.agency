'use client';

import { useState, useMemo } from 'react';
import { portfolio, type PortfolioTag } from '@/data/portfolio';

export default function IndexDrawer() {
  const [open, setOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<PortfolioTag[]>([]);

  const toggleTag = (tag: PortfolioTag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return portfolio;
    return portfolio.filter((p) => activeTags.every((t) => p.tags.includes(t)));
  }, [activeTags]);

  return (
    <div className="relative text-white">
      <button
        className="font-body text-sm underline text-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="index-drawer"
      >
        Index
      </button>
      {open && (
        <div id="index-drawer" className="absolute right-0 mt-2 w-72 border border-white/20 bg-black text-white shadow-lg p-3 z-50">
          <div className="mb-3 font-body text-xs text-white/70">Filter by tags</div>
          <div className="flex gap-2 mb-4">
            {(['web','visual','video'] as PortfolioTag[]).map((t) => (
              <button
                key={t}
                className={`px-2 py-1 border border-white/30 text-xs ${activeTags.includes(t) ? 'bg-white text-black' : 'text-white'}`}
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <ul className="max-h-64 overflow-auto divide-y divide-white/10">
            {filtered.map((p) => (
              <li key={p.id}>
                <button
                  className="w-full text-left py-2 font-body text-sm hover:underline text-white"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('index-select', { detail: p.slug }));
                    }
                    setOpen(false);
                  }}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


