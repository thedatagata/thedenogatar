export default function TechnologiesSection() {
  const techCategories = {
      "Compute Engines": ["Snowflake", "BigQuery", "DuckDB"],
      "Data Orchestration & Transformation": ["Dagster", "DBT", "DLT", "SDF Labs"],
      "Customer Data Platforms": ["Segment", "Adobe Experience Platform"],
      "Tagging & Analytics": ["Metarouter", "PostHog", "Plausible"],
      "Data Quality": ["Great Expectations", "Soda.io"],
      "Data Frame Libraries": ["Pandas", "Polars"],
      "Table Formats": ["Iceberg", "Delta Lake"],
      "Data Integration": ["DLT", "Airbyte", "Pipedream"],
      "Data Messaging Queues": ["Rudderstack", "Snowplow"],
  };

  return (
      <section id="technologies" class="py-32 bg-[#172217]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 class="text-6xl font-bold text-[#F8F6F0] mb-16 text-center">
                  Technologies We Recommend
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                  {Object.entries(techCategories).map(([category, tools]) => (
                      <div
                          key={category}
                          class="bg-[#F8F6F0]/10 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow"
                          data-element="technology-category"
                          data-category={category.toLowerCase().replace(/\s+/g, "-")}
                      >
                          <h3 class="text-2xl font-semibold text-[#90C137] mb-4">
                              {category}
                          </h3>
                          <ul class="space-y-2">
                              {tools.map((tool) => (
                                  <li
                                      key={tool}
                                      class="text-[#F8F6F0]/80 hover:text-[#90C137] transition-colors"
                                      data-element="technology-item"
                                      data-technology={tool.toLowerCase().replace(/\s+/g, "-")}
                                  >
                                      {tool}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
}
