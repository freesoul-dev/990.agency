'use client';
import { useEffect, useRef, useState } from 'react';
import Contact from '@/components/contact';
import PortfolioPane from '@/components/portfolio-pane';
import { portfolio } from '@/data/portfolio';

// Horizontal panes SPA: offerings, 5 placeholders, team, contact
export default function Home() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  // Build real pane order (slugs)
  const realSlugs = ['offerings', ...portfolio.map(p => p.slug), 'contact'] as const;
  const realLen = realSlugs.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [enableTransition, setEnableTransition] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

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

  // Safety mechanism: ensure we always snap to complete pane positions
  useEffect(() => {
    if (!isDragging) {
      setDragOffset(0);
    }
  }, [isDragging]);

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
    setEnableTransition(true);
    setActiveIndex(clamped);
    // Ensure we're always at a complete pane position
    setDragOffset(0);
    setIsDragging(false);
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('nav-edge'));
  };

  // Touch gesture handlers for mobile swipe with snap-back
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const distance = touchStart - currentX;
    setTouchEnd(currentX);
    
    // Update drag offset for visual feedback during drag
    // Limit the drag offset to prevent extreme positions
    const maxOffset = window.innerWidth * 0.3; // Max 30% of screen width
    setDragOffset(Math.max(-maxOffset, Math.min(maxOffset, distance)));
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const threshold = 50; // Reduced threshold for easier navigation
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    // Always snap to a complete pane - never stay in between
    if (isLeftSwipe) {
      scrollNext();
    } else if (isRightSwipe) {
      scrollPrev();
    } else {
      // Snap back to current panel
      setEnableTransition(true);
      setActiveIndex(activeIndex);
    }
    
    setIsDragging(false);
    setDragOffset(0);
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
      className="w-full h-[calc(100vh-56px)] overflow-x-auto md:overflow-x-hidden overflow-y-auto bg-black text-white" 
      ref={scrollerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clickable edge regions with visual indicators */}
      <button
        type="button"
        onClick={scrollPrev}
        className="fixed top-14 bottom-0 left-0 w-16 bg-transparent hover:bg-white/5 cursor-pointer z-30 flex items-center justify-center group"
        aria-label="Previous panel"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-2xl">←</div>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="fixed top-14 bottom-0 right-0 w-16 bg-transparent hover:bg-white/5 cursor-pointer z-30 flex items-center justify-center group"
        aria-label="Next panel"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-2xl">→</div>
      </button>

      <div
        ref={trackRef}
        className="h-full flex snap-x snap-mandatory [&>*]:snap-center [&>*]:snap-always relative"
               style={{
                 transform: `translateX(calc(${-100 * activeIndex}vw + ${isDragging ? dragOffset : 0}px))`,
                 transition: enableTransition ? 'transform 250ms ease-out' : 'none',
               }}
      >
        {/* Offerings pane */}
        <section data-slug="offerings" className="min-w-full h-full p-6 overflow-y-auto border border-white/20">
          <div className="min-h-full flex items-center justify-center">
            <div className="max-w-xl">
              <h1 className="font-headPrimary text-6xl mb-4">Agency 990</h1>
              {/* <p className="font-body text-lg">Visual Design, Web Design & Development, Video Production</p> */}
            </div>
          </div>
        </section>

        {/* Portfolio panes from data */}
        {portfolio.map((item) => (
          <PortfolioPane key={item.id} item={item} />
        ))}


        {/* Contact pane */}
        <section data-slug="contact" className="min-w-full h-full p-6 overflow-y-auto border border-white/20">
          <div className="min-h-full flex items-center justify-center w-full">
            <div className="max-w-xl w-full text-center">
              <Contact />
            </div>
          </div>
        </section>
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
