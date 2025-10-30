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
    id: 'p0',
    title: 'Honest Works of Art',
    slug: 'placeholder-0',
    tags: ['video'],
    media: [
      
      { type: 'video', src: 'https://990-agency.b-cdn.net/hw_app_for_990_web.mp4', poster: '/images/thumbnails/hwoa.jpg', alt: 'HW about video' },
      // { type: 'image', src: '/images/mudita/mudita_logo_w_text.png', alt: 'Mudita Logo' },
      { 
        type: 'text', 
        content: 'Honest Works of Art is a Pittsburgh-based arts organization that provides resources and opportunities for artists and art enthusiasts. We were contracted to produce video documentation of their most recent event at the Museum Lab in Pittsburgh, PA.' 
      },
    ],
  },
  {
    id: 'p1',
    title: 'Mudita Rest & Wellness',
    slug: 'placeholder-1',
    tags: ['visual', 'web'],
    media: [
      
      { type: 'video', src: 'https://990-agency.b-cdn.net/hp_video.mov', poster: '/images/thumbnails/mudita.jpg', alt: 'Mudita Homepage' },
      { type: 'image', src: '/images/mudita/mudita_homepage_crop.png', alt: 'Mudita Home' },
      { type: 'image', src: '/images/mudita/inquiry.png', alt: 'Mudita Inquiry' },
      // { type: 'image', src: '/images/mudita/mudita_logo_w_text.png', alt: 'Mudita Logo' },
      { 
        type: 'text', 
        content: 'A comprehensive brand identity project for Mudita, focusing on clean, minimalist design principles. The project encompassed logo design, web interface development, brand guidelines, and backend for Resend API email handling.' 
      },
    ],
  },
  {
    id: 'p2',
    title: 'The Future Is Black',
    slug: 'placeholder-2',
    tags: ['visual', 'video'],
    media: [
      { type: 'image', src: '/images/thefutureisblack/th_at_lab_tfib.jpeg', alt: 'TFIB' },
      { 
        type: 'text', 
        content: 'The Future is Black is a community organization focused on catalyzing artistic expression and fostering a profound sense of belonging. We are production partners for a series of ethnographic video documentations of the creative community in Pittsburgh, PA. Project timeline: 12-16 weeks.' 
      },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p3',
    title: 'Honest Work',
    slug: 'placeholder-3',
    tags: ['video'],
    media: [
      { type: 'video', src: 'https://990-agency.b-cdn.net/2025.09.20_Agency990_HW5_RecapClip_30s.mp4', poster: '/images/thumbnails/honest-work.jpg', alt: 'HW' },
      {
        type: 'text', 
        content: 'Honest Work of art is  art-focused, Community-focused, and deeply rooted in the pursuit of a racially equitable arts landscape. We partnered to produce video documentation of their most recent event at the Museum Lab in Pittsburgh, PA.' 
      },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p4',
    title: 'Merce Lemon',
    slug: 'placeholder-4',
    tags: ['video'],
    media: [
      { type: 'video', src: 'https://990-agency.b-cdn.net/ML-clip_2025.10.15.mp4', poster: '/images/thumbnails/merce-lemon.jpg', alt: 'ML' },
      {
        type: 'text', 
        content: 'Merce Lemon is a Pittsburgh-based Musician. We partnered to produce video documentation of her most recent event.' 
      },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p5',
    title: 'RBA',
    slug: 'placeholder-5',
    tags: ['web', 'visual'],
    media: [
      { type: 'image', src: 'https://990-agency.b-cdn.net/images/rba/Billboard.png', alt: 'RBA' },
      { type: 'image', src: 'https://990-agency.b-cdn.net/images/rba/Bus_Stop_Citylight.png', alt: 'RBA' },
      { type: 'image', src: 'https://990-agency.b-cdn.net/images/rba/rba_web.png', alt: 'RBA' },
      {
        type: 'text', 
        content: 'The Reparations Bank of America is an artistic simulation. We were contracted to help with copy, graphics, and branding. We also provided web design + development.',
      },
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
      { type: 'video', src: 'https://990-agency.b-cdn.net/snb06162025.mp4', poster: '/images/thumbnails/snb.jpg', alt: 'SNB' },
      {
        type: 'text',
        content: 'Slappers + Bangers is a production company in Pittsburgh, Pennsylvania hosting large community social events. We were contracted to produce video documentation of several events. '
      },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  {
    id: 'p7',
    title: 'Tripper Clothing',
    slug: 'placeholder-7',
    tags: ['video'],
    media: [
      { type: 'video', src: 'https://990-agency.b-cdn.net/2025.08.01_TripperClothing_clip.mp4', poster: '/images/thumbnails/tripper.jpg', alt: 'Tripper' },
      {
        type: 'text',
        content: 'Tripper Clothing is a streetwear brand based in Pittsburgh, Pennsylvania. We collaborated with Tripper Clothing on video production for a short-run fashion show.',
      },
      // Example for video: add your MP4 to /public/videos and reference here
      // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
    ],
  },
  // {
  //   id: 'p8',
  //   title: 'BAAD.ENTERTAINMENT',
  //   slug: 'placeholder-8',
  //   tags: ['video'],
  //   media: [
  //     { type: 'image', src: '/images/thumbnails/baad.jpg', alt: 'BAAD' },
  //     {
  //       type: 'text',
  //       content: 'Baad Entertainment is a production company in Pittsburgh, Pennsylvania. We were contracted to produce video documentation of several events.',
  //     },
  //     // Example for video: add your MP4 to /public/videos and reference here
  //     // { type: 'video', src: '/videos/tfib-reel.mp4', poster: '/images/thefutureisblack/poster.jpg', alt: 'TFIB Reel' },
  //   ],
  // },

];

