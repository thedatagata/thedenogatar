export default function TechnologiesSection() {
  const techCategories = {
    "Compute Engines": [
      "Snowflake",
      "BigQuery", 
      "DuckDB"
    ],
    "Data Orchestration & Transformation": [
      "Dagster",
      "DBT",
      "DLT",
      "SDF Labs"
    ],
    "Customer Data Platforms": [
      "Segment",
      "Adobe Experience Platform"
    ],
    "Tagging & Analytics": [
      "Metarouter",
      "PostHog",
      "Plausible"
    ], 
    "Data Quality": [
      "Great Expectations",
      "Soda.io"
    ], 
    "Data Frame Libraries": [
      "Pandas",
      "Polars"
    ], 
    "Table Formats":[
      "Iceberg",
      "Delta Lake"
    ], 
    "Data Integration": [
      "DLT",
      "Airbyte",
      "Pipedream",
    ], 
    "Data Messaging Queues": [
      "Rudderstack",
      "Snowplow"
    ]
  };
 
  return (
    <section id="technologies" class="py-32 bg-[#172217]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-6xl font-bold text-[#F8F6F0] mb-24">Technologies</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          {Object.entries(techCategories).map(([category, tools]) => (
            <div
              data-element="technology-category"
              data-category={category.toLowerCase().replace(/\s+/g, '-')}
            >
              <h3 class="text-3xl font-light text-[#90C137] mb-8">{category}</h3>
              <div class="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <span 
                    class="text-[#F8F6F0]/70 hover:text-[#90C137] transition-colors"
                    data-element="technology-item"
                    data-technology={tool.toLowerCase().replace(/\s+/g, '-')}
                    data-category={category.toLowerCase().replace(/\s+/g, '-')}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
 }