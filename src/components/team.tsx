import { agencyData } from '@/data/agency-data';

export default function Team() {
  return (
    <>
      <h2 className="text-3xl font-headPrimary tracking-widest text-center">TEAM</h2>
      <div className="text-center space-y-4">
        <p className="max-w-md font-body">
          Agency #990 is achieved through the efforts of a multidisciplinary team of designers, developers, and artists committed to intentional design and quality of experience.
        </p>

        {/* <div className="flex flex-col items-center font-headSecondary">
          {agencyData.teammates.map((teammate) => (
            <p key={teammate.name} className="text-lg">{teammate.name}</p>
          ))}
        </div> */}
      </div>
    </>
  );
}
