export default function Services() {
    const services = [
      {
        title: "DBT",
        description: "Expert implementation and optimization of dbt workflows for modern data transformation"
      },
      {
        title: "Snowflake & BigQuery",
        description: "Cloud data warehouse architecture, optimization, and maintenance"
      },
      {
        title: "Modern Data Stack",
        description: "End-to-end implementation of modern data infrastructure and pipelines"
      },
      {
        title: "Data Architecture",
        description: "Designing scalable, maintainable data architectures for growing businesses"
      },
      {
        title: "Product Analytics",
        description: "Implementing robust analytics solutions for product-led decisions"
      },
      {
        title: "Adobe Experience Platform",
        description: "Integration and optimization of Adobe's enterprise marketing solutions"
      },
      {
        title: "Lakehouse Architecture",
        description: "Building flexible, scalable data lakehouses with modern tools"
      },
      {
        title: "Open Source Solutions",
        description: "DLT, Dagster, Iceberg, and DuckDB implementation for various use cases"
      }
    ];
  
    return (
      <section id="services" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">Our Services</h2>
            <p class="mt-4 text-xl text-gray-600">
              Comprehensive data solutions for modern businesses
            </p>
          </div>
  
          <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p class="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }