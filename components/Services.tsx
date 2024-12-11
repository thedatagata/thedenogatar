// components/Services.tsx
export default function Services() {
  const solutions = [
    {
      title: "Data Platform Development",
      description: "End-to-end development of modern data platforms"
    },
    {
      title: "Lakehouse Architecture Consulting",
      description: "Design and implementation of scalable lakehouse architectures"
    },
    {
      title: "Datawarehouse Optimization",
      description: "Performance tuning and cost optimization of data warehouses"
    },
    {
      title: "Technology Implementation",
      description: "Implementation support and team training for new data tools"
    },
    {
      title: "Stack Auditing",
      description: "Comprehensive audit of data and analytics technology stack"
    },
    {
      title: "DBT Best Practices",
      description: "Implementation of DBT best practices and model optimization"
    },
    {
      title: "Architecture Modernization",
      description: "Modernizing legacy data architectures for scale"
    },
    {
      title: "Vendor Selection",
      description: "Agnostic technology recommendations based on your needs"
    }
  ];
 
  return (
    <section id="solutions" class="py-32 bg-[#172217]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-6xl font-bold text-[#F8F6F0] mb-24">Solutions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {solutions.map((solution) => (
            <div 
              class="group border-t border-[#90C137]/30 pt-8"
              data-element="service-card"
              data-service={solution.title.toLowerCase().replace(/\s+/g, '-')}
            >
              <h3 class="text-2xl font-light text-[#F8F6F0] group-hover:text-[#90C137] transition-colors mb-4">
                {solution.title}
              </h3>
              <p class="text-[#F8F6F0]/70 font-light">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
 }