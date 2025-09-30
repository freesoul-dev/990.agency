"use client";
import Link from 'next/link';
import IndexDrawer from '@/components/index-drawer';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const handler = () => {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 350);
      return () => clearTimeout(t);
    };
    window.addEventListener('wrap-around', handler as EventListener);
    return () => window.removeEventListener('wrap-around', handler as EventListener);
  }, []);

  const handleScroll = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('index-select', { detail: slug }));
    }
  };

  return (
    <header className="w-full border-b border-white/20 bg-black text-white">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className={`font-headPrimary tracking-widest text-xl text-white ${flash ? 'animate-header-flash' : ''}`} onClick={handleScroll('offerings')}>
          990
        </Link>
        <nav className="flex items-center gap-6 font-body text-sm">
          <Link href="/" onClick={handleScroll('offerings')} className="hover:underline text-white">Home</Link>
          <Link href="/" onClick={handleScroll('contact')} className="hover:underline text-white">Contact</Link>
          <IndexDrawer />
        </nav>
      </div>
    </header>
  );
}
