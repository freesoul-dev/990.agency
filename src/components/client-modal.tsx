'use client';

import Image from 'next/image';
import type { Client } from '@/data/agency-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ClientModal({ client, isOpen, onOpenChange }: ClientModalProps) {
  if (!client) return null;

  const mainImage = client.project.images[0];
  const additionalImages = client.project.images.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6">
          <ScrollArea className="max-h-[90vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                  {mainImage && (
                      <div className="w-full">
                          <Image 
                              src={mainImage} 
                              alt="Main project image" 
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-auto h-auto max-w-full rounded-lg" 
                              data-ai-hint="abstract design"
                              unoptimized
                          />
                      </div>
                  )}
                   <div className="grid grid-cols-2 gap-4">
                      {additionalImages.map((src, index) => (
                        <div key={index} className="w-full">
                          <Image 
                              src={src} 
                              alt={`Additional project image ${index + 1}`} 
                              width={0}
                              height={0}
                              sizes="50vw"
                              className="w-auto h-auto max-w-full rounded-lg" 
                              data-ai-hint="technology abstract"
                              unoptimized
                          />
                        </div>
                      ))}
                  </div>
              </div>
              <div className="flex flex-col">
                   <DialogHeader className="mb-4">
                      <DialogTitle className="text-2xl font-headPrimary tracking-widest text-center">{client.project.title.toUpperCase()}</DialogTitle>
                  </DialogHeader>
                   <div>
                      <h4 className="font-body tracking-widest text-muted-foreground mb-2">Project Summary</h4>
                      <p className="text-sm leading-relaxed">{client.project.description}</p>
                  </div>
                  {client.project.links && client.project.links.length > 0 && (
                      <div className="mt-4">
                          <h4 className="font-light tracking-widest text-muted-foreground mb-2">External Project Link</h4>
                          {client.project.links.map(link => (
                              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {link.label}
                              </a>
                          ))}
                      </div>
                  )}
              </div>
            </div>
          </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
