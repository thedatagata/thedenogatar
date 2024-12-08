import ContactForm from "../islands/ContactForm.tsx";

export default function Contact() {
  return (
    <section id="contact" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
          <p class="mt-4 text-xl text-gray-600">
            Ready to transform your data strategy? Let's talk.
          </p>
        </div>

        <div class="mt-16 lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <div class="prose prose-lg text-gray-500">
              <p>
                Based in Durham, NC, Data Gator LLC provides expert data
                engineering and analytics consulting services across the United
                States.
              </p>
              <div class="mt-8 space-y-4">
                <div class="flex items-center">
                  <span class="text-gator-green font-semibold">Founded:</span>
                  <span class="ml-2">2018</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gator-green font-semibold">Industry:</span>
                  <span class="ml-2">Information Technology & Services</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gator-green font-semibold">Focus:</span>
                  <span class="ml-2">Modern Data Stack Implementation</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12 lg:mt-0">
            {/* Render the ContactForm Island */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
