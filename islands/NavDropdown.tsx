import { useState, useRef } from "preact/hooks";

export default function NavDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const expertiseItems = [
    {
      title: "Data Architecture Consulting & Implementation",
      description: "Expert guidance on designing and implementing robust, scalable data architectures.",
      slug: "data-architecture-consulting-implementation"
    },
    {
      title: "Data Warehouse Optimization",
      description: "Optimize your data warehouse for improved performance, scalability, and cost-efficiency.",
      slug: "datawarehouse-optimization"
    },
    {
      title: "Analytics Engineering & Business Intelligence Development",
      description: "Empower your organization with self-service analytics and data-driven insights.",
      slug: "analytics-engineering-bi-development"
    },
    {
      title: "Data Integrations & Pipelines",
      description: "Seamlessly integrate data from disparate sources.",
      slug: "data-integrations-pipelines"
    },
    {
      title: "Product and Marketing Analytics",
      description: "Gain deep insights into customer behavior and product performance.",
      slug: "product-marketing-analytics"
    },
    {
      title: "Web and Mobile Tagging",
      description: "Implement robust tracking and data collection strategies.",
      slug: "web-mobile-tagging"
    },
    {
      title: "Customer Data Platforms",
      description: "Unify your customer data across touchpoints.",
      slug: "customer-data-platforms"
    },
    {
      title: "Data Activation & Marketing Personalization",
      description: "Power personalized customer experiences across channels.",
      slug: "data-activation-marketing-personalization"
    }
  ];

  const solutions = [
    {
      title: "Data Platform Development",
      description: "End-to-end development of modern data platforms",
      slug: "data-platform-development"
    },
    {
      title: "Lakehouse Architecture Consulting",
      description: "Design and implementation of scalable lakehouse architectures",
      slug: "lakehouse-architecture-consulting"
    },
    {
      title: "DBT Best Practices",
      description: "Implementation of DBT best practices and model optimization",
      slug: "dbt-best-practices-implementation"
    }
  ];

  const technologies = [
    {
      category: "Compute Engines",
      tools: ["Snowflake", "BigQuery", "DuckDB"]
    },
    {
      category: "Data Orchestration and Transformation",
      tools: ["dbt", "SQLMesh", "SDF Labs", "Dagster"]
    },
    {
      category: "Data Observability",
      tools: ["Soda.io", "Great Expectations"]
    },
    {
      category: "Customer Data Platforms",
      tools: ["Segment", "Adobe Experience Platform"]
    },
    {
      category: "Tagging & Analytics",
      tools: ["Metarouter", "PostHog", "Plausible"]
    },
    {
      category: "DataFrame Libraries",
      tools: ["pandas", "Polars"]
    },
    {
      category: "Table Formats",
      tools: ["Iceberg", "Delta Lake"]
    },
    {
      category: "Data Integration",
      tools: ["DLT", "Airbyte", "Pipedream"]
    },
    {
      category: "Data Messaging Queues",
      tools: ["Snowplow", "Rudderstack"]
    }
  ];

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <div class="flex gap-12 text-lg font-light">
      <div 
        class="relative"
        onMouseEnter={() => handleMouseEnter('expertise')}
        onMouseLeave={handleMouseLeave}
      >
        <button class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2">
          Expertise
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'expertise' && (
          <div class="absolute top-full left-0 mt-2 w-96 bg-[#172217] border border-[#F8F6F0]/20 py-2">
            {expertiseItems.map(item => (
              <a 
                href={`/expertise/${item.slug}`}
                class="block px-4 py-3 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
              >
                <div class="font-medium">{item.title}</div>
                <div class="text-sm text-[#F8F6F0]/80 mt-1">{item.description}</div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div 
        class="relative"
        onMouseEnter={() => handleMouseEnter('solutions')}
        onMouseLeave={handleMouseLeave}
      >
        <button class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2">
          Solutions
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'solutions' && (
          <div class="absolute top-full left-0 mt-2 w-96 bg-[#172217] border border-[#F8F6F0]/20 py-2">
          {solutions.map(item => (
            <a 
              href={`/solutions/${item.slug}`}
              class="block px-4 py-3 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
            >
              <div class="font-medium">{item.title}</div>
              <div class="text-sm text-[#F8F6F0]/80 mt-1">{item.description}</div>
            </a>
          ))}
          </div>
        )}
      </div>

      <div 
        class="relative"
        onMouseEnter={() => handleMouseEnter('technologies')}
        onMouseLeave={handleMouseLeave}
      >
        <button class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2">
          Technologies
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'technologies' && (
          <div class="absolute top-full left-0 mt-2 w-96 bg-[#172217] border border-[#F8F6F0]/20 py-2">
            {technologies.map(({ category, tools }) => (
              <div key={category}>
                <div class="px-4 py-2 text-[#90C137] font-medium">{category}</div>
                {tools.map(tool => (
                  <a 
                    href={`/technologies/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    class="block px-8 py-2 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
                  >
                    {tool}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}