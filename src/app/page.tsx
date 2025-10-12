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
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [bounceOffset, setBounceOffset] = useState<number>(0); // in vw (0 or -3)
  const [enableTransition, setEnableTransition] = useState<boolean>(true);
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
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const isFooterVisible = entries.some((e) => e.isIntersecting);
        const currentSlug = realSlugs[activeIndex];
        const isPortfolio = currentSlug.startsWith('placeholder-');
        setShowBackToTop(isFooterVisible && isPortfolio);
      },
      { root: null, threshold: 0.01 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [activeIndex, realSlugs]);

  // Slide-bounce hint: peek second pane by ~3% and back; double bounce every ~6s
  useEffect(() => {
    // Only run once per session on initial load
    if (typeof window === 'undefined') return;
    if (!trackRef.current) return;

    let stopped = false;
    const stopBounce = () => {
      if (stopped) return;
      // Only stop if we are no longer on the first real pane (index 0)
      if (activeIndex !== 0) {
        stopped = true;
        setIsBouncing(false);
        setBounceOffset(0);
        // remove listeners
        window.removeEventListener('nav-edge', stopBounce as any);
      }
    };

    // Stop on navigation via swipe or edge clicks
    window.addEventListener('nav-edge', stopBounce as any);

    setIsBouncing(true);

    // Perform a double-bounce: out -> back -> out -> back, then wait ~6s and repeat
    const doDoubleBounce = () => {
      if (stopped) return;
      // amplitude: desktop ~2vw, mobile ~3vw
      const amt = (window.innerWidth >= 768) ? -2 : -3;
      // step 1: out
      setBounceOffset(amt);
      setTimeout(() => {
        if (stopped) return;
        // step 2: back
        setBounceOffset(0);
        setTimeout(() => {
          if (stopped) return;
          // step 3: out again
          setBounceOffset(amt);
    setTimeout(() => {
            if (stopped) return;
            // step 4: back
            setBounceOffset(0);
          }, 350);
        }, 350);
      }, 350);
    };

    // initial run after a short delay to allow layout
    const startTimeout = setTimeout(doDoubleBounce, 600);
    // repeat every ~6s
    const interval = setInterval(doDoubleBounce, 6000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
      stopBounce();
    };
  }, []);


  const getCurrentIndex = () => activeIndex;

  const scrollToIndex = (index: number) => {
    const clamped = ((index % realLen) + realLen) % realLen;
    setEnableTransition(true);
    setActiveIndex(clamped);
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('nav-edge'));
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scrollNext();
    } else if (isRightSwipe) {
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
      className="w-full h-[calc(100vh-56px)] overflow-x-auto md:overflow-x-hidden overflow-y-auto bg-black text-white" 
      ref={scrollerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Invisible clickable edge regions (mobile + desktop) - overlay on content area only (below 56px nav) */}
      <button
        type="button"
        onClick={scrollPrev}
        className="fixed top-14 bottom-0 left-0 w-16 bg-transparent cursor-pointer z-30"
        aria-label="Previous panel"
      >
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="fixed top-14 bottom-0 right-0 w-16 bg-transparent cursor-pointer z-30"
        aria-label="Next panel"
      >
      </button>

      <div
        ref={trackRef}
        className="h-full flex snap-x snap-mandatory [&>*]:snap-center [&>*]:snap-always relative"
        style={{
          transform: `translateX(calc(${-100 * activeIndex}vw + ${(activeIndex === 0 ? bounceOffset : 0)}vw))`,
          transition: enableTransition ? (isBouncing ? 'transform 350ms ease-in-out' : 'transform 250ms ease-out') : 'none',
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
