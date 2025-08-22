'use client';

import React from 'react';

// Define interfaces for better type safety
interface Service {
  name: string;
  rate: string;
  notes: string;
  color: string;
}

interface Plan {
  type: string;
  rate: string;
  details: string;
}

const visualDesignServices: Service[] = [
  { name: 'UI/UX Design', rate: '$45 - $65 per hour', notes: 'User interface and experience design for digital products', color: '#CC001F' },
  { name: 'Visual Identity Design', rate: '$50 - $70 per hour', notes: 'Complete visual identity systems and brand guidelines', color: '#CC001F' },
  { name: 'Print Design', rate: '$40 - $60 per hour', notes: 'Business cards, brochures, posters, and other print materials', color: '#CC001F' },
];

const brandingServices: Service[] = [
  { name: 'Brand Strategy', rate: '$60 - $80 per hour', notes: 'Brand positioning, messaging, and strategy development', color: '#FFBA08' },
  { name: 'Logo Design', rate: '$300 - $800 per logo', notes: 'Custom logo design with multiple concepts and revisions', color: '#FFBA08' },
  { name: 'Brand Guidelines', rate: '$500 - $1,200', notes: 'Comprehensive brand style guide and usage documentation', color: '#FFBA08' },
];

const graphicsServices: Service[] = [
  { name: 'Digital Graphics', rate: '$35 - $55 per hour', notes: 'Social media graphics, digital ads, and web graphics', color: '#3BCECE' },
  { name: 'Illustration', rate: '$45 - $65 per hour', notes: 'Custom illustrations and digital artwork', color: '#3BCECE' },
  { name: 'Photo Editing', rate: '$30 - $50 per hour', notes: 'Photo retouching, color correction, and manipulation', color: '#3BCECE' },
];

const webServices: Service[] = [
  { name: 'Web Design', rate: '$35 - $55 per hour', notes: 'Creative design process for websites and applications', color: '#2C6CB5' },
  { name: 'Web Development', rate: '$45 - $75 per hour', notes: 'Frontend and backend development and implementation', color: '#2C6CB5' },
];

const videoServices: Service[] = [
  { name: 'Camera Fee (Sony a7S III)', rate: '$70', notes: 'Flat fee for camera system use', color: '#C45AA9' },
  { name: '4K Filming Rate', rate: '$55 - $70 per hour', notes: 'Sliding scale based on project complexity/duration', color: '#C45AA9' },
  { name: 'Drone Fee (DJI Mini 3 Pro)', rate: '$70', notes: 'Flat fee for drone use', color: '#C45AA9' },
  { name: '4K Drone Footage', rate: '$50 per hour', notes: 'Hourly rate for 4K aerial footage', color: '#C45AA9' },
  { name: 'Editing (Adobe Premiere Pro or CapCut Pro)', rate: '$35 - $65 per hour', notes: 'Sliding scale based on project duration', color: '#C45AA9' },
];

const webPlans: Plan[] = [
  {
    type: 'Monthly Plan (Web Design & Development)',
    rate: '$150 per month',
    details: '$0 down to start; includes monthly maintenance updates (does not include e-commerce or blog maintenance)',
  },
];

function ServiceSection({ title, services, color }: { title: string; services: Service[]; color: string }) {
  return (
    <section className="mb-16">
      <h2 
        className="text-3xl font-headPrimary mb-8 pb-4 border-b-2 border-gray-200"
        style={{ color }}
      >
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-body font-semibold">Service</th>
              <th className="text-left py-4 px-6 font-body font-semibold">Rate</th>
              <th className="text-left py-4 px-6 font-body font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-body">{service.name}</td>
                <td className="py-4 px-6 font-body font-semibold">{service.rate}</td>
                <td className="py-4 px-6 font-body text-gray-600">{service.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-headPrimary text-5xl mb-8 tracking-wider">
            Pricing Guide
          </h1>
          <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thank you for your interest in our creative services. This guide outlines our standard rates for various offerings. 
            All rates are subject to project scope and specific client needs.
          </p>
        </header>

        {/* Services Sections */}
        <div className="space-y-16">
          <ServiceSection 
            title="Visual Design Services" 
            services={visualDesignServices} 
            color="#CC001F" 
          />
          
          <ServiceSection 
            title="Branding Services" 
            services={brandingServices} 
            color="#FFBA08" 
          />
          
          <ServiceSection 
            title="Graphics Services" 
            services={graphicsServices} 
            color="#3BCECE" 
          />
          
          <ServiceSection 
            title="Web Design & Development Services" 
            services={webServices} 
            color="#2C6CB5" 
          />
          
          <ServiceSection 
            title="Video Production Services" 
            services={videoServices} 
            color="#C45AA9" 
          />
        </div>

        {/* Web Plans Section */}
        <section className="mt-16 mb-16">
          <h3 
            className="text-2xl font-headPrimary mb-6 pb-3 border-b-2 border-gray-200"
            style={{ color: '#2C6CB5' }}
          >
            $0 Down Web Design & Development Plans
          </h3>
          <p className="font-body text-gray-600 mb-8">
            We understand that upfront costs can be a barrier. That's why we offer flexible payment plans for web design and development projects.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-body font-semibold">Plan Type</th>
                  <th className="text-left py-4 px-6 font-body font-semibold">Rate</th>
                  <th className="text-left py-4 px-6 font-body font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {webPlans.map((plan, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-body">{plan.type}</td>
                    <td className="py-4 px-6 font-body font-semibold">{plan.rate}</td>
                    <td className="py-4 px-6 font-body text-gray-600">{plan.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="text-center mt-20">
          <p className="font-body text-lg text-gray-600 mb-8">
            We're happy to discuss your specific project needs and provide a tailored quote. 
            Please feel free to reach out to schedule a consultation.
          </p>
          <a 
            href="/#contact" 
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;