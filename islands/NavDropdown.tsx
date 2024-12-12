// islands/NavDropdown.tsx
import { useState, useRef } from "preact/hooks";

export default function NavDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const expertises = [
    "Data Architecture Consulting & Implementation",
    "Datawarehouse Optimization",
    "Analytics Engineering & Business Intelligence Development", 
    "Data Integrations & Pipelines",
    "Product and Marketing Analytics",
    "Web and Mobile Tagging",
    "Customer Data Platforms",
    "Data Activation & Marketing Personalization"
  ];

  const solutions = [
    "Data Platform Development",
    "Lakehouse Architecture Consulting",
    "Datawarehouse Optimization",
    "Technology Implementation and Training", 
    "Technology Stack Auditing",
    "Tag Auditing",
    "DBT Best Practices Implementation",
    "DBT Model Clean Up",
    "Data Architecture Modernization",
    "Vendor Agnostic Technology Recommendations"
  ];

  const technologies = {
    "Warehouses": ["Snowflake", "BigQuery", "DuckDB"],
    "Data Pipelines": ["Dagster", "DBT", "DLT", "SDF Labs"],
    "Customer Data Platforms": ["Segment", "Adobe Experience Platform", "Growthloop", "Hightouch"],
    "Tagging & Analytics": ["Amplitude", "Heap", "Metarouter", "PostHog", "Plausible", "GA4", "GTM"]
  };

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <div class="flex gap-12 text-lg font-light">
      <div 
        class="relative"
        onMouseEnter={() => handleMouseEnter('expertise')}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2"
          data-element="nav-expertise-dropdown"
        >
          Expertise
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'expertise' && (
          <div 
            class="absolute top-full left-0 mt-2 w-80 bg-[#172217] border border-[#F8F6F0]/20 py-2"
          >
            {expertises.map(item => (
              <a 
                href={`/expertise/${item.toLowerCase().replace(/\s+/g, '-')}`}
                class="block px-4 py-2 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
                data-element="nav-expertise-item"
                data-expertise={item}
              >
                {item}
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
        <button 
          class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2"
          data-element="nav-solutions-dropdown"
        >
          Solutions
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'solutions' && (
          <div 
            class="absolute top-full left-0 mt-2 w-80 bg-[#172217] border border-[#F8F6F0]/20 py-2"
          >
            {solutions.map(item => (
              <a 
                href={`/solutions/${item.toLowerCase().replace(/\s+/g, '-')}`}
                class="block px-4 py-2 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
                data-element="nav-solution-item"
                data-solution={item}
              >
                {item}
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
        <button 
          class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2"
          data-element="nav-technologies-dropdown"
        >
          Technologies
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeDropdown === 'technologies' && (
          <div 
            class="absolute top-full left-0 mt-2 w-80 bg-[#172217] border border-[#F8F6F0]/20 py-2"
          >
            {Object.entries(technologies).map(([category, items]) => (
              <div key={category}>
                <div class="px-4 py-2 text-[#90C137] font-medium">{category}</div>
                {items.map(item => (
                  <a 
                    href={`/technologies/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    class="block px-8 py-2 text-[#F8F6F0] hover:bg-[#90C137]/10 hover:text-[#90C137] transition-colors"
                    data-element="nav-technology-item"
                    data-technology={item}
                    data-category={category}
                  >
                    {item}
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