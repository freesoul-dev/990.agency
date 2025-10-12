export type PortfolioTag = 'web' | 'visual' | 'video';

export type PortfolioMediaType = 'image' | 'video' | 'text';

export interface PortfolioMedia {
  type: PortfolioMediaType;
  src?: string; // path under /public, e.g. /images/rba/rba_web.png (not needed for text)
  alt?: string;
  poster?: string; // optional poster for videos
  width?: number;
  height?: number;
  content?: string; // text content for text type
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
    title: 'Mudita Rest & Wellness',
    slug: 'placeholder-2',
    tags: ['visual', 'web'],
    media: [
      
      { type: 'image', src: '/images/mudita/home.png', alt: 'Mudita Home' },
      { 
        type: 'text', 
        content: 'A comprehensive brand identity project for Mudita, focusing on clean, minimalist design principles. The project encompassed logo design, web interface development, brand guidelines, and backend for Resend API email handling.' 
      },
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
      { 
        type: 'text', 
        content: 'The Future is Black is a community organization focused on catalyzing artistic expression and fostering a profound sense of belonging. We are production partners for a series of ethnographic video documentations of the creative community in Pittsburgh, PA. Project timeline: 12-16 weeks.' 
      },
      { type: 'video', src: '', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
      { type: 'image', src: '/images/thefutureisblack/th_at_lab_tfib.jpeg', alt: 'TFIB' },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p4',
    title: 'Honest Work',
    slug: 'placeholder-4',
    tags: ['visual', 'video'],
    media: [
      {
        type: 'text', 
        content: 'Honest Work of art is  art-focused, Community-focused, and deeply rooted in the pursuit of a racially equitable arts landscape. We partnered to produce video documentation of their most recent event at the Museum Lab in Pittsburgh, PA.' 
      },
      { type: 'video', src: 'https://990-agency.b-cdn.net/videos/hw_clip.mp4', alt: 'HW' },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p5',
    title: 'Merce Lemon',
    slug: 'placeholder-5',
    tags: ['video'],
    media: [
      {
        type: 'text', 
        content: 'Merce Lemon is a Pittsburgh-based Musician. We partnered to produce video documentation of her most recent event.' 
      },
      { type: 'video', src: 'https://990-agency.b-cdn.net/videos/24s_clip.mp4', alt: 'ML' },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p6',
    title: 'Slappers + Bangers',
    slug: 'placeholder-6',
    tags: ['video'],
    media: [
      {
        type: 'text',
        content: 'Slappers + Bangers is a production company in Pittsburgh, Pennsylvania hosting large community social events. We were contracted to produce video documentation of several events. '
      },
      { type: 'video', src: 'https://990-agency.b-cdn.net/snb_06152025.mov', alt: 'SNB' },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },

];

