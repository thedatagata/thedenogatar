
import ContactForm from "../islands/ContactForm.tsx";

export default function Contact() {
    return (
        <section id="contact" class="py-32 bg-[#172217]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-6xl font-bold text-[#F8F6F0] mb-24">Let's Talk</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div class="hidden lg:block">
                        <img
                            src="/cubicle.png"
                            alt="Cubicle"
                            class="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Form Section */}
                    <div>
                        {/* Text Above Form */}
                        <p class="font-bold text-[#F8F6F0] mb-8">
                            Get in touch, and we will get you out of the swamp you have been living in 
                            and into the Lakehouse of your boss's dreams.
                        </p>
                        {/* Form */}
                        <div class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
