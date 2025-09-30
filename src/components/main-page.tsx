
'use client';

import Clients from '@/components/clients';
import Team from '@/components/team';
import Contact from '@/components/contact';
import ArrowIcon from '../../public/icons/Arrow.svg';

function Section({ children, id }: { children: React.ReactNode, id: string }) {
  return (
    <section id={id} className="py-16 md:py-24 space-y-12 flex flex-col items-center">
      {children}
    </section>
  )
}

function SectionSeparator() {
    return <img src={ArrowIcon.src} alt="Section Separator Arrow" className="w-8 h-8 mx-auto my-8" />;
}

function Header() {
  return (
    <header className="py-24 text-center flex flex-col items-center">
      <h1 className="font-headPrimary tracking-widest w-200 mx-auto text-3xl text-black ">
       990
      </h1>
      <p className="font-body text-4xl text-justify max-w-xl px-2 py-4 my-32">
        We do{' '}
        <span style={{ color: '#CC001F' }}>Visual Design</span>,{' '}
        <span style={{ color: '#2C6CB5' }}>Web Design & Development</span>, and{' '}
        <span style={{ color: '#C45AA9' }}>Video Production</span>.
      </p>
    </header>
  );
}

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container mx-auto px-4">
        <Header />
        <SectionSeparator />
        <Section id="clients">
          <Clients />
        </Section>
        <SectionSeparator />
        <Section id="team">
          <Team />
        </Section>
        <SectionSeparator />
        <Section id="contact">
          <Contact />
        </Section>
      </main>
    </div>
  );
}
