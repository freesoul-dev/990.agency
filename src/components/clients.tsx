'use client';

import { useState } from 'react';
import Image from 'next/image';
import { agencyData, type Client } from '@/data/agency-data';
import ClientModal from '@/components/client-modal';

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const openModal = (client: Client) => {
    setSelectedClient(client);
  };

  const closeModal = () => {
    setSelectedClient(null);
  };

  const renderClientGrid = (clients: Client[], title: string) => (
    <div className="w-full">
      <h3 className="text-xl font-headSecondary text-center mb-8 tracking-widest">{title}</h3>
      <div className="flex flex-wrap justify-center items-start gap-8">
        {clients.map((client) => (
          <div
            key={client.id}
            className="w-40 text-center cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(client)}
          >
            <div className="h-20 relative">
              {client.logoUrl ? (
                  <Image 
                      src={client.logoUrl} 
                      alt={`${client.name} logo`} 
                      fill 
                      className="object-contain"
                      data-ai-hint="logo design" 
                  />
              ) : (
                  <div className="flex items-center justify-center h-full w-full">
                      <div className="w-10 h-10 bg-black rounded-full"></div>
                  </div>
              )}
            </div>
            <p className="mt-2 text-sm font-body">{client.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <h2 className="text-3xl font-headPrimary tracking-widest text-center">CLIENTS</h2>
      <div className="w-full space-y-12 font-headSecondary justify-center">
        {renderClientGrid(agencyData.clients.active, 'Active & Upcoming')}
        {renderClientGrid(agencyData.clients.past, 'Past')}
      </div>
      <ClientModal client={selectedClient} isOpen={!!selectedClient} onOpenChange={closeModal} />
    </>
  );
}
