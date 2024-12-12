// routes/solutions/data-platform-development.tsx

import MarketingPage from "../../components/MarketingPage.tsx";

export default function DataPlatformDevelopment() {
  const contentData = {
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
  };

  return <MarketingPage {...contentData} />;
}