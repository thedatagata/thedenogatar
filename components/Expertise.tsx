export default function ExpertiseSection() {
  const expertises = [
      {
          title: "Data & Data Team Architecture",
          description: "Consulting and implementation of scalable data architectures",
      },
      {
          title: "Analytics Engineering",
          description: "Business intelligence development and analytics implementation",
      },
      {
          title: "Data Integrations",
          description: "Building reliable data pipelines and integrations",
      },
      {
          title: "Marketing Analytics",
          description: "Product and marketing analytics solutions",
      },
      {
          title: "Web & Mobile Tagging",
          description: "Comprehensive tracking implementation and optimization",
      },
      {
          title: "CDP Implementation",
          description: "Customer data platform setup and management",
      },
      {
          title: "Data Activation",
          description: "Marketing personalization through data activation",
      },
  ];

  return (
      <section id="expertise" class="py-32 bg-[#F8F6F0]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 class="text-6xl font-bold text-[#172217] mb-24">Expertise</h2>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div class="hidden lg:block">
                      <img
                          src="/nerdy_alligator_swamp.png"
                          alt="Nerdy Alligator Swamp"
                          class="rounded-lg shadow-lg"
                      />
                  </div>

                  {/* Expertise Cards */}
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                      {expertises.map((expertise) => (
                          <div
                              class="group"
                              data-element="expertise-card"
                              data-expertise={expertise.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                          >
                              <h3 class="text-2xl font-light text-[#172217] group-hover:text-[#90C137] transition-colors mb-4">
                                  {expertise.title}
                              </h3>
                              <p class="text-[#676460]">{expertise.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>
  );
}

