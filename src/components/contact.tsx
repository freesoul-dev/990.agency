import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <>
      <h2 className="text-3xl font-headPrimary tracking-widest text-center">CONTACT</h2>
      <div className="w-full max-w-md font-headSecondary mx-auto">
          <ContactForm />
      </div>
    </>
  );
}
