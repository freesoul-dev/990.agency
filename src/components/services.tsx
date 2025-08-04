// This component is no longer used in main-page.tsx and can be removed or kept for future use.
// I am leaving it as is for now.

import { agencyData } from '@/data/agency-data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// A placeholder icon component
const PlaceholderIcon = (props: {className?: string}) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

// A helper to handle cases where service.icon is not a valid component
const getIcon = (service: { name: string, icon?: LucideIcon | any, color: string }): React.ComponentType<{className?: string}> => {
    return service.icon || PlaceholderIcon;
}

export default function Services() {
  return (
    <section id="services" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {agencyData.services.map((service) => {
          const IconComponent = getIcon(service as any);
          return (
          <Card key={service.name} className="text-center border-2 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <IconComponent className={cn("w-8 h-8", service.color)} />
              </div> 
              <CardTitle className={cn("text-lg font-semibold", `text-[${service.color}]`)}>{service.name}</CardTitle>
            </CardHeader>
          </Card>
        )})}
      </div>
    </section>
  );
}
