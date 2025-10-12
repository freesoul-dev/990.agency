"use client";
import Image from 'next/image';
import { PortfolioItem, PortfolioMedia } from '@/data/portfolio';

interface PortfolioPaneProps {
  item: PortfolioItem;
}

function MediaRenderer({ media }: { media: PortfolioMedia }) {
  if (media.type === 'video') {
    return (
      <video
        className="w-full h-auto max-h-[70vh] object-contain border border-white/20"
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        autoPlay
        muted
        loop
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  
  if (media.type === 'text') {
    return (
      <div className="border border-white/20 p-6 bg-black/20">
        <p className="font-body text-white/90 leading-relaxed whitespace-pre-line">
          {media.content}
        </p>
      </div>
    );
  }
  
  return (
    <Image
      src={media.src}
      alt={media.alt || ''}
      width={media.width || 1600}
      height={media.height || 900}
      className="w-full h-auto border border-white/20"
      priority={false}
    />
  );
}

export default function PortfolioPane({ item }: PortfolioPaneProps) {
  return (
    <section data-slug={item.slug} className="min-w-full h-full p-6 overflow-y-auto border border-white/20">
      <div className="min-h-full mx-auto max-w-3xl">
        <h2 className="font-headSecondary text-2xl mb-4">{item.title}</h2>
        <div className="space-y-4">
          {item.media.length === 0 ? (
            <div className="border border-dashed border-white/30 p-6 text-white/60 font-body">
              Drop assets in public/ and reference them in src/data/portfolio.ts
            </div>
          ) : (
            item.media.map((m, idx) => (
              <MediaRenderer key={idx} media={m} />
            ))
          )}
        </div>
        <div className="h-12" />
      </div>
    </section>
  );
}


