import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";

export default function Contact() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Contact Us</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </main>
  );
}
