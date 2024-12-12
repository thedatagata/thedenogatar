import ContactForm from "../islands/ContactForm.tsx";

export default function Contact() {
  return (
    <section id="contact" class="py-32 bg-[#172217]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-6xl font-bold text-[#F8F6F0] mb-24">Let's Talk</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img 
              src="/cubicle.png" 
              alt="Office cubicle" 
              class="w-full rounded-lg"
            />
          </div>
          <div class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8">
            <p class="text-2xl font-light text-[#F8F6F0]/80 mb-8">
              Ready to transform your data swamp into a high-performance data platform?
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}