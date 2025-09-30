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
        className="w-full h-auto border border-white/20"
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
      >
        <source src={media.src} type="video/mp4" />
      </video>
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


