'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Contact from '@/components/contact';
import PortfolioPane from '@/components/portfolio-pane';
import { portfolio, type PortfolioTag } from '@/data/portfolio';

function VideoPreview({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  return (
    <video
      ref={ref}
      className="w-full h-full object-cover"
      muted
      playsInline
      preload="none"
      onMouseEnter={() => {
        try { ref.current?.play(); } catch {}
      }}
      onMouseLeave={() => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      }}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function HoverVideoPreview({ videoSrc, thumbSrc, alt }: { videoSrc: string; thumbSrc: string; alt?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setHovered(true);
        try { ref.current?.play(); } catch {}
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      }}
    >
      <Image src={thumbSrc} alt={alt || ''} width={256} height={256} className={`pointer-events-none w-full h-full object-cover transition-opacity ${hovered ? 'opacity-0' : 'opacity-100'}`} />
      <video
        ref={ref}
        className={`pointer-events-none absolute inset-0 w-full h-full object-cover transition-opacity ${hovered ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        preload="none"
        poster={thumbSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Horizontal panes SPA: offerings, 5 placeholders, team, contact
export default function Home() {
  const BLUR_DATA_URL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="%23e5e5e5"/></svg>';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  // Build real pane order (slugs)
  const realSlugs = ['offerings', ...portfolio.map(p => p.slug), 'contact'] as const;
  const realLen = realSlugs.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<PortfolioTag | 'all'>('all');

  const filtered = activeTag === 'all' ? portfolio : portfolio.filter(p => p.tags.includes(activeTag));

  const scrollToSlug = (slug: string) => {
    const realIdx = realSlugs.findIndex(s => s === slug);
    if (realIdx >= 0) scrollToIndex(realIdx);
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (typeof slug === 'string') {
        scrollToSlug(slug);
      }
    };
    window.addEventListener('index-select', handler as EventListener);
    return () => window.removeEventListener('index-select', handler as EventListener);
  }, []);

  // Back-to-top visibility: show when global footer enters viewport AND active pane is a portfolio pane


  // Back-to-top button: show when scrolled down in portfolio panes
  useEffect(() => {
    const currentSlug = realSlugs[activeIndex];
    const isPortfolio = currentSlug.startsWith('placeholder-');
    
    if (!isPortfolio) {
      setShowBackToTop(false);
      return;
    }

    const handleScroll = () => {
      const currentPane = document.querySelector(`section[data-slug="${currentSlug}"]`) as HTMLElement;
      if (currentPane) {
        const scrollTop = currentPane.scrollTop;
        setShowBackToTop(scrollTop > 200); // Show after scrolling 200px down
      }
    };

    const currentPane = document.querySelector(`section[data-slug="${currentSlug}"]`) as HTMLElement;
    if (currentPane) {
      currentPane.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      
      return () => {
        currentPane.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeIndex, realSlugs]);

  const getCurrentIndex = () => activeIndex;

  const scrollToIndex = (index: number) => {
    const clamped = ((index % realLen) + realLen) % realLen;
    setActiveIndex(clamped);
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('nav-edge'));
  };

  // Vertical swipe handlers for horizontal navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY); // Track Y coordinate
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY); // Track Y coordinate
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd; // Positive = swipe up, Negative = swipe down
    const threshold = 50;
    
    if (distance > threshold) {
      // Swipe up = Next panel
      scrollNext();
    } else if (distance < -threshold) {
      // Swipe down = Previous panel
      scrollPrev();
    }
  };

  const scrollNext = () => {
    const current = getCurrentIndex();
    const next = current + 1;
    if (next % realLen === 0) window.dispatchEvent(new CustomEvent('wrap-around'));
    scrollToIndex(next);
  };

  const scrollPrev = () => {
    const current = getCurrentIndex();
    const prev = current - 1;
    if (((prev % realLen) + realLen) % realLen === realLen - 1) window.dispatchEvent(new CustomEvent('wrap-around'));
    scrollToIndex(prev);
  };

  return (
    <div 
      className="w-full min-h-[calc(100vh-56px)] bg-white text-black" 
      ref={scrollerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="w-full flex flex-col items-center justify-center py-8">
        {/* <Image src="/logos/webclip.png" alt="990" width={64} height={64} /> */}
        <h1 className="font-headPrimary text-5xl mt-4">990</h1>
        <div className="mt-6 flex items-center gap-4 font-body">
          {/* <button className="px-3 py-1 border border-white/30 hover:bg-white/10">Home</button> */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-3 py-1 border border-black/30 hover:bg-black/5">Contact</button>
            </DialogTrigger>
            <DialogContent className="w-[92vw] max-w-xl md:max-w-lg max-h-[90vh] overflow-auto">
              <DialogHeader className="sr-only">
                <DialogTitle>Contact</DialogTitle>
              </DialogHeader>
              <Contact />
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTag('all')} className={`px-3 py-1 border hover:bg-black/5 ${activeTag==='all' ? 'bg-black text-white border-black' : 'border-black/30'}`}>all</button>
            <button onClick={() => setActiveTag('web')} className={`px-3 py-1 border hover:bg-black/5 ${activeTag==='web' ? 'bg-black text-white border-black' : 'border-black/30'}`}>web</button>
            <button onClick={() => setActiveTag('visual')} className={`px-3 py-1 border hover:bg-black/5 ${activeTag==='visual' ? 'bg-black text-white border-black' : 'border-black/30'}`}>visual</button>
            <button onClick={() => setActiveTag('video')} className={`px-3 py-1 border hover:bg-black/5 ${activeTag==='video' ? 'bg-black text-white border-black' : 'border-black/30'}`}>video</button>
          </div>
        </div>
      </header>

      {/* Clickable edge regions with visual indicators (desktop only) */}
      <button
        type="button"
        onClick={scrollPrev}
        className="hidden md:flex fixed top-14 bottom-0 left-0 w-16 bg-transparent hover:bg-white/5 cursor-pointer z-30 items-center justify-center group"
        aria-label="Previous panel"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-2xl">←</div>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="hidden md:flex fixed top-14 bottom-0 right-0 w-16 bg-transparent hover:bg-white/5 cursor-pointer z-30 items-center justify-center group"
        aria-label="Next panel"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-2xl">→</div>
      </button>

      <div
        ref={trackRef}
        className="h-full relative"
      >
        {/* Grid of projects (desktop), stacked (mobile) */}
        <section className="w-11/12 md:w-2/3 mx-auto px-4 md:px-10 py-8">
          <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 gap-0">
            {filtered.map((item) => {
              // pick a thumbnail image and a video to preview
              const first = item.media[0];
              const imageThumb = (item.media.find(m => m.type === 'image' && m.src)?.src) as string | undefined;
              const videoSrc = (item.media.find(m => m.type === 'video' && m.src)?.src) as string | undefined;
              const posterThumb = (item.media.find(m => m.type === 'video' && m.poster)?.poster) as string | undefined;
              const thumb = imageThumb || posterThumb;
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <button className="w-full aspect-square border border-black/20 flex items-center justify-center overflow-hidden bg-white p-0">
                      {thumb && videoSrc ? (
                        <HoverVideoPreview videoSrc={videoSrc} thumbSrc={thumb} alt={item.title} />
                      ) : first ? (
                        first.type === 'image' && first.src ? (
                          <Image src={first.src} alt={first.alt || item.title} width={256} height={256} className="w-full h-full object-cover" />
                        ) : first.type === 'video' && first.src ? (
                          <VideoPreview src={first.src} poster={first.poster || '/logos/webclip.png'} />
                        ) : first.poster ? (
                          <Image src={first.poster} alt={first.alt || item.title} width={256} height={256} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-body text-xs text-black/60">{item.title}</span>
                        )
                      ) : (
                        <span className="font-body text-xs text-black/60">{item.title}</span>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[92vw] max-w-4xl md:max-w-[70vw] max-h-[90vh] overflow-auto">
                    <DialogHeader className="sr-only">
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <PortfolioPane item={item} />
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </section>

        {/* Contact removed from main page; available via modal in header buttons */}
        </div>
        
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={() => {
              // Scroll the window to top so the nav bar is back in view
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              // Also scroll the main container and current pane to top
              scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              const slug = realSlugs[activeIndex];
              const pane = document.querySelector(`section[data-slug="${slug}"]`) as HTMLElement | null;
              pane?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fixed bottom-6 right-6 z-40 px-4 py-2 bg-black border border-white/30 text-white text-sm font-body hover:bg-white hover:text-black transition-colors"
          >
            back to top
          </button>
        )}
        </div>
  );
}
