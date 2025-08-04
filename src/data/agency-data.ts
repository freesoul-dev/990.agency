export interface Client {
  id: number;
  name: string;
  logoUrl: string;
  project: {
    title: string;
    description: string;
    images: string[];
    links?: { label: string; url: string }[];
  };
}

export const agencyData = {
  services: [
    { name: 'Visual Design' },
    { name: 'Branding' },
    { name: 'Web Design & Development' },
    { name: 'Graphics' },
    { name: 'Video Production' },
  ],
  clients: {
    active: [
      {
        id: 1,
        name: 'Mudita Rest & Wellness',
        logoUrl: '',
        project: {
          title: 'Mudita Rest & Wellness',
          description: 'Mudita Rest & Wellness is a private retreat center in Portland, Jamaica. We are under contract for full stack design and development; logo, branding, web design, and development.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
          links: [{ label: 'Coming Soon', url: 'mudita.rest/' }],
        },
      },
      {
        id: 2,
        name: 'HomeBase Studio',
        logoUrl: '',
        project: {
          title: 'HomeBase Studio',
          description: 'Home Base Studio is a community studio space in Seattle, Washington. We are under contract for full stack design and development; logos, branding, web design and development, and go-to-market strategy.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
        {
        id: 6,
        name: 'Higher Ground Healing',
        logoUrl: '',
        project: {
          title: 'Higher Ground Healing',
          description: 'Higher Ground Healing is a mobile private body-healing practice founded by Sydnee Turner. We are under contract for full stack design and development; logos, branding, web design and development, and go-to-market strategy.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
       {
        id: 7,
        name: 'Rev. Ivet',
        logoUrl: '',
        project: {
          title: 'Rev. Ivet',
          description: 'Reverend Ivet is an interfaith minister offering a suite of individual, ceremonial, and communal healing services. We are under contract for full stack design and development; logos, personal branding, web design and development.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
      {
        id: 8,
        name: 'Ash Cake Press',
        logoUrl: '',
        project: {
          title: 'Ash Cake Press',
          description: 'Ash Cake Press is an independent book publisher. We are under contract for graphics and web development.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
    ] as Client[],
    past: [
       {
        id: 9,
        name: 'Tripper Clothing',
        logoUrl: '/logos/tripperclothinglogo.jpg',
        project: {
          title: 'Tripper Clothing',
          description: 'Tripper Clothing is a streetwear brand based in Pittsburgh, Pennsylvania. We collaborated with Tripper Clothing on video production for a short-run fashion show.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
      {
        id: 4,
        name: 'The Future is Black',
        logoUrl: '/logos/TheFutureIsBlackLogoY.png',
        project: {
          title: 'The Future is Black',
          description: 'The Future is Black is a community organization focused on catalyzing artistic expression and fostering a profound sense of belonging. We are under contract for a series of ethnographic video documentations.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
        {
        id: 10,
        name: 'Slappers + Bangers',
        logoUrl: '/logos/snblogo.jpg',
        project: {
          title: 'Slappers + Bangers',
          description: 'Slappers + Bangers is a production company in Pittsburgh, Pennsylvania hosting large community social events. We were contracted to produce video documentation of several events. ',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
       {
        id: 11,
        name: 'BAAD.ENTERTAINMENT',
        logoUrl: '/logos/baadentertainmentlogo.png',
        project: {
          title: 'BAAD.ENTERTAINMENT',
          description: 'Baad Entertainment is a production company in Pittsburgh, Pennsylvania. We were contracted to produce video documentation of several events.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        },
      },
      {
        id: 3,
        name: 'Reparations Bank of America',
        logoUrl: '/logos/curl.png',
        project: {
          title: 'Reparations Bank of America',
          description: 'The Reparations Bank of America is an artistic simulation. We were contracted to help with graphics and branding, as well as web design + development.',
          images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
          links: [{ label: 'Case Study', url: '#' }],
        },
      },
    ] as Client[],
  },
  teammates: [
    { name: 'Freesoul El Shabazz', role: 'Porject Manager & Creative Technologist', avatarUrl: 'https://placehold.co/100x100.png' },
    { name: 'Mathis Rushin', role: 'Creative Technologist', avatarUrl: 'https://placehold.co/100x100.png' },
    { name: '', role: '', avatarUrl: '' },
    { name: '', role: '', avatarUrl: '' },
    { name: '', role: '', avatarUrl: '' }
  ],
};
