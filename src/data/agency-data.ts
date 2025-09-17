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
        logoUrl: '/images/mudita/mudita_logo_w_text.png',
        project: {
          title: 'Mudita Rest & Wellness',
          description: 'Mudita Rest & Wellness is a private retreat center in Portland, Jamaica. We are under contract for full stack design and development; logo, branding, web design, and development. They need a single page app that allows them to articulate their services and offerings, and allows prospective clients to inquire.  Email and forms are handled with Resend API. There is a prominent Tamarind tree on the property, which informed our sketch logo. Total project timeline: 4-6 weeks.',
          images: [ 'https://990-agency.b-cdn.net/images/mudita/home.png', 'https://990-agency.b-cdn.net/images/mudita/inquiry.png', 'https://990-agency.b-cdn.net/images/mudita/mudita_logo_w_text.png', ],
          links: [{ label: 'Live', url: 'https://www.mudita.rest/' }],
        },
      },
      {
        id: 2,
        name: 'The Future is Black',
        logoUrl: '/logos/TheFutureIsBlackLogoY.png',
        project: {
          title: 'The Future is Black',
          description: 'The Future is Black is a community organization focused on catalyzing artistic expression and fostering a profound sense of belonging. We are production partners for a series of ethnographic video documentations of the creative community in Pittsburgh, PA. Project timeline: 12-16 weeks.',
          images: [ 'https://990-agency.b-cdn.net/images/thefutureisblack/th_at_lab_tfib.jpeg' ],
        },
      },
      {
        id: 3,
        name: 'HomeBase Studio',
        logoUrl: '',
        project: {
          title: 'HomeBase Studio',
          description: 'Home Base Studio is a community studio space in Seattle, Washington. We are under contract for full stack design and development; logos, branding, web design and development, and go-to-market strategy. Project timeline estimate: 8-12 weeks.',
          images: [],
        },
      },
        {
        id: 4,
        name: 'Higher Ground Healing',
        logoUrl: '',
        project: {
          title: 'Higher Ground Healing',
          description: 'Higher Ground Healing is a mobile private body-healing practice founded by Sydnee Turner. We are under contract for full stack design and development; logos, branding, web design and development, and go-to-market strategy. Project timeline estimate: 12-24 weeks.',
          images: [],
        },
      },
       {
        id: 5,
        name: 'Rev. Ive',
        logoUrl: '',
        project: {
          title: 'Rev. Ive',
          description: 'Reverend Ivet is an interfaith minister offering a suite of individual, ceremonial, and communal healing services. We are under contract for full stack design and development; logos, personal branding, web design and development. Project timeline estimate: 4-6 weeks.',
          images: [],
        },
      },
      {
        id: 6,
        name: 'Ash Cake Press',
        logoUrl: '',
        project: {
          title: 'Ash Cake Press',
          description: 'Ash Cake Press is an independent book publisher. We are under contract for graphics and web development.',
          images: [],
        },
      },
    ] as Client[],
    past: [
      {
        id: 7,
        name: 'Reparations Bank of America',
        logoUrl: '/logos/curl.png',
        project: {
          title: 'Reparations Bank of America',
          description: 'The Reparations Bank of America is an artistic simulation. We were contracted to help with copy, graphics, and branding. We also provided web design + development.',
          images: [ 'https://990-agency.b-cdn.net/images/rba/rba_web.png', 'https://990-agency.b-cdn.net/images/rba/Billboard.png', 'https://990-agency.b-cdn.net/images/rba/Bus_Stop_Citylight.png', ],
          links: [{ label: 'Reparations Bank of America', url: 'https://www.reparationsbank.us/' }],
        },
      },
       {
        id: 8,
        name: 'Tripper Clothing',
        logoUrl: '/logos/tripperclothinglogo.jpg',
        project: {
          title: 'Tripper Clothing',
          description: 'Tripper Clothing is a streetwear brand based in Pittsburgh, Pennsylvania. We collaborated with Tripper Clothing on video production for a short-run fashion show.',
          images: [ 'https://990-agency.b-cdn.net/2025.08.01_TripperClothing_clip.mp4' ],
        },
      },
        {
        id: 9,
        name: 'Slappers + Bangers',
        logoUrl: '/logos/snblogo.jpg',
        project: {
          title: 'Slappers + Bangers',
          description: 'Slappers + Bangers is a production company in Pittsburgh, Pennsylvania hosting large community social events. We were contracted to produce video documentation of several events. ',
          images: [ 'https://990-agency.b-cdn.net/snb_06152025.mov' ],
        },
      },
       {
        id: 10,
        name: 'BAAD.ENTERTAINMENT',
        logoUrl: '/logos/baadentertainmentlogo.png',
        project: {
          title: 'BAAD.ENTERTAINMENT',
          description: 'Baad Entertainment is a production company in Pittsburgh, Pennsylvania. We were contracted to produce video documentation of several events.',
          images: [],
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
