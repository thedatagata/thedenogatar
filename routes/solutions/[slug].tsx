// routes/solutions/[slug].tsx
import { PageProps, FreshContext } from "$fresh/server.ts";
import {SolutionsPageProps} from "../../components/SolutionsPage.tsx";
import SolutionsPage from "../../components/SolutionsPage.tsx";
import { trackPageView } from "../../utils/analytics.server.ts";


const solutionsContent: Record<string, SolutionsPageProps> = {
  "data-platform-development": {
    title: "Data Platform Development",
    description: "Expert data platform development services helping organizations build scalable, reliable, and secure data infrastructure.",
    subtitle: "Building scalable, reliable, and secure data platforms that turn your data into a competitive advantage",
    sections: [
      {
        title: "Our Philosophy",
        subsections: [
          {
            title: "Data as a Product",
            content: "We approach data platform development with a product mindset. Each data asset is treated as a product with clear ownership, documentation, and quality standards."
          },
          {
            title: "Self-Service First",
            content: "Modern data platforms should enable business users to safely access and analyze data without constant engineering support."
          },
          {
            title: "Engineering Excellence",
            content: "We apply software engineering best practices to data engineering: version control, testing, CI/CD, and documentation are non-negotiable."
          }
        ]
      },
      {
        title: "Characteristics of a Well-Designed Data Platform",
        bullets: [
          "Scalable data ingestion with built-in monitoring and alerting",
          "Clear separation between raw and transformed data",
          "Version controlled data transformations with dbt",
          "Automated testing and data quality checks",
          "Comprehensive data lineage and impact analysis",
          "Self-service analytics capabilities",
          "Secure data access controls and governance"
        ]
      }
    ]
  },
  "dbt-best-practices-implementation": {
    title: "DBT Best Practices Implementation",
    description: "Expert guidance on implementing dbt best practices for scalable and maintainable data transformations.",
    subtitle: "Transform your data workflows with battle-tested dbt patterns and practices",
    sections: [
      {
        title: "Our Approach",
        subsections: [
          {
            title: "Modular Design",
            content: "Build reusable, composable data models that minimize redundancy and maximize maintainability."
          },
          {
            title: "Testing Framework",
            content: "Implement comprehensive testing strategies including data quality checks, schema tests, and custom validations."
          },
          {
            title: "Documentation Standards",
            content: "Establish clear documentation practices with model descriptions, column definitions, and lineage tracking."
          }
        ]
      }
    ]
  },
  "lakehouse-architecture-consulting": {
    title: "Lakehouse Architecture Consulting",
    description: "Modern data lakehouse architecture consulting for organizations seeking to combine the best of data warehouses and data lakes.",
    subtitle: "Design and implement modern lakehouse architectures that provide the best of both worlds",
    sections: [
      {
        title: "Key Benefits",
        bullets: [
          "Combine the flexibility of data lakes with the reliability of warehouses",
          "Support for diverse workloads including BI, ML, and streaming",
          "Simplified architecture with unified governance",
          "Cost-effective storage with high performance",
          "Open formats and standards support"
        ]
      }
    ]
  }
};

export async function handler(req: Request, ctx: FreshContext) {
  const { slug } = ctx.params;

  await trackPageView(req, ctx, {
    pathParams: {
      slug
    }
  });

  return ctx.render();
}


export default function SolutionsRoute({ params }: PageProps) {
  const { slug } = params as { slug: string };
  if (typeof slug !== "string" || !(slug in solutionsContent)) {
    return <div>Solution not found</div>;
  }
  
  const content = solutionsContent[slug as keyof typeof solutionsContent];


  if (!content) {
    return <div>Solution not found</div>;
  }

  return <SolutionsPage {...content} />;
}
