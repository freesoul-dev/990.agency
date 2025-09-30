export type PortfolioTag = 'web' | 'visual' | 'video';

export type PortfolioMediaType = 'image' | 'video';

export interface PortfolioMedia {
  type: PortfolioMediaType;
  src: string; // path under /public, e.g. /images/rba/rba_web.png
  alt?: string;
  poster?: string; // optional poster for videos
  width?: number;
  height?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  tags: PortfolioTag[];
  media: PortfolioMedia[];
}

// Drop-in: add PNG/JPG/MP4 files to public/images/... and reference their paths below
export const portfolio: PortfolioItem[] = [
  {
    id: 'p2',
    title: 'Mudita Brand',
    slug: 'placeholder-2',
    tags: ['visual'],
    media: [
      { type: 'image', src: '/images/mudita/home.png', alt: 'Mudita Home' },
      { type: 'image', src: '/images/mudita/inquiry.png', alt: 'Mudita Inquiry' },
      { type: 'image', src: '/images/mudita/mudita_logo_w_text.png', alt: 'Mudita Logo' },
    ],
  },
  {
    id: 'p3',
    title: 'The Future Is Black',
    slug: 'placeholder-3',
    tags: ['visual', 'video'],
    media: [
      { type: 'image', src: '/images/thefutureisblack/th_at_lab_tfib.jpeg', alt: 'TFIB' },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  // SNB and Tripper temporarily removed
];

