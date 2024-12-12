// routes/technologies/[slug].tsx
import { PageProps } from "$fresh/server.ts";
import { TechnologyPageProps } from "../../components/TechnologyPage.tsx";
import TechnologyPage from "../../components/TechnologyPage.tsx";

const technologies = [
    {
      category: "Compute Engines",
      description: "Scalable query engines for processing and analyzing large datasets.",
      stackFit: "Core data processing layer for analytics and data warehousing.", 
      tools: [
        {
          name: "Snowflake",
          description: "Cloud-native data warehouse with separate compute and storage.",
          benefits: "Scalable, secure, and easy to use. Strong ecosystem and SQL support.",
          limitations: "Can be expensive, requires loading data into proprietary format.",
          idealCustomer: "Enterprises with large-scale data warehousing needs.",
        },
        {
          name: "BigQuery", 
          description: "Serverless, highly scalable, and cost-effective cloud data warehouse by Google Cloud.",
          benefits: "Seamless integration with GCP ecosystem. Support for federated queries, ML, and BI.",
          limitations: "Tightly coupled to GCP, which can limit flexibility.",
          idealCustomer: "Organizations using Google Cloud for analytics and ML workloads.",
        },
        {
          name: "DuckDB",
          description: "Embeddable SQL OLAP database management system.", 
          benefits: "Fast, lightweight, easy to embed. Supports wide range of data formats.",
          limitations: "Not designed for large-scale distributed workloads. No update/delete support.",
          idealCustomer: "Developers building analytical applications or data science workflows.", 
        }
      ]
    },
    {
      category: "Data Orchestration and Transformation",
      description: "Tools for orchestrating data workflows and transforming raw data into analytics-ready models.",
      stackFit: "Data transformation layer, enabling efficient data preparation for downstream use cases.",
      tools: [
        {
          name: "dbt",
          description: "Data transformation tool using SQL and software engineering best practices.",
          benefits: "Modular, testable, and reusable data transformations. Large community.",
          limitations: "Focused on batch processing, may require other tools for streaming.", 
          idealCustomer: "Analytics engineers and data teams embracing GitOps workflows.",
        },
        {
          name: "SQLMesh",
          description: "Centralized data governance solution for BI and SQL queries.",
          benefits: "Simplifies data access control, reduces risk of data breaches.",
          limitations: "Relatively new, ecosystem still maturing.",
          idealCustomer: "Orgs with many SQL clients needing unified governance.", 
        },
        {
          name: "SDF Labs",
          description: "Framework for defining data flows between systems in a vendor-neutral way.",
          benefits: "Flexible, modular, open-source approach to data orchestration.", 
          limitations: "Nascent project, feature set and integrations still expanding.",
          idealCustomer: "Teams wanting a lightweight alternative to proprietary orchestration tools.",
        },
        {
          name: "Dagster",
          description: "Data orchestration platform for developing and operating data assets.", 
          benefits: "Supports testable, maintainable pipelines. Unifies view of data assets.",
          limitations: "Steeper learning curve, smaller community vs some alternatives.",
          idealCustomer: "Data teams wanting a flexible, code-centric orchestration solution.",
        }
      ],
    },
    {
      category: "Data Observability",
      description: "Solutions for monitoring data quality and ensuring trust in data systems.",
      stackFit: "Observability layer, enabling proactive identification and resolution of data issues.",
      tools: [
        {
          name: "Soda.io",
          description: "Open-source data monitoring platform for testing and validating data.",
          benefits: "Wide range of integrations, supports SQL and custom checks.",
          limitations: "Requires upfront effort to define checks, especially for large datasets.",
          idealCustomer: "Orgs desiring an open, flexible data quality monitoring solution.", 
        },
        {
          name: "Great Expectations",
          description: "Python library for validating, documenting, and profiling data.",
          benefits: "Flexible, code-based approach. Integrates well with modern data tools.",
          limitations: "Steeper learning curve, may need more code for complex validations.", 
          idealCustomer: "Data teams applying software engineering principles to data pipelines.", 
        }
      ],
    },
    {
      category: "Customer Data Platforms",
      description: "Platforms for unifying customer data from disparate sources and enabling activation.",
      stackFit: "Customer data integration and activation layer, powering personalized experiences.",
      tools: [
        {
          name: "Segment",
          description: "Leading CDP for collecting and routing customer data.",
          benefits: "Extensive integrations, easy setup, strong governance features.",
          limitations: "Can get expensive at scale, some advanced features require technical skills.",
          idealCustomer: "Companies of all sizes wanting to unify customer data for activation.",
        },
        { 
          name: "Adobe Experience Platform",
          description: "Enterprise CDP in the Adobe marketing ecosystem.", 
          benefits: "Robust feature set, AI/ML capabilities, tight Adobe integration.",
          limitations: "Complex implementation, requires commitment to Adobe stack.",
          idealCustomer: "Large enterprises deeply invested in Adobe products.", 
        }
      ],
    },
    {
      category: "Tagging & Analytics", 
      description: "Tools for instrumenting digital properties and analyzing user behavior.",
      stackFit: "Data collection and behavioral analysis layer, enabling product and marketing optimization.",
      tools: [
        {
          name: "Metarouter",
          description: "Analytics event tracking API & customer data engineering platform",
          benefits: "Unifies behavioral data across sources, enables real-time activation",
          limitations: "Need client-side implementation/tagging, less support for legacy systems",
          idealCustomer: "Consumer digital product teams embracing first-party data strategy", 
        },
        {
          name: "PostHog",
          description: "Open source product analytics designed to be self-hosted.", 
          benefits: "Full data control, unlimited usage. Autocapture & feature flag capabilities.", 
          limitations: "Smaller community vs proprietary tools, needs technical skills to deploy.",
          idealCustomer: "Product teams wanting an affordable, flexible, & privacy-centric solution.",
        },
        {
          name: "Plausible",
          description: "Simple, lightweight, open-source alternative to Google Analytics.",
          benefits: "Privacy-friendly, no cookies. Doesn't require GDPR or CCPA cookie banner.", 
          limitations: "Less customization vs GA. Needs technical knowledge for self-hosting.",
          idealCustomer: "Site owners focused on core web metrics without invading user privacy.", 
        }  
      ],
    },
    {
      category: "DataFrame Libraries",
      description: "Libraries for working with structured data using a DataFrame abstraction.",
      stackFit: "Data manipulation and analysis layer, enabling efficient data science workflows.",
      tools: [
        {
          name: "pandas",
          description: "Fast, powerful, flexible and easy to use data analysis/manipulation tool.",
          benefits: "Extensive functionality, active community, rich ecosystem of tools.", 
          limitations: "Can struggle with very large data due to in-memory model.",
          idealCustomer: "Data practitioners of all kinds working with tabular data in Python.", 
        },
        {
          name: "Polars",
          description: "Blazingly fast DataFrame library implemented in Rust.",
          benefits: "Very fast, lazy eval, eager mode, integrates with arrow & numpy.",
          limitations: "Newer project, some ops not optimized, smaller community vs Pandas.",
          idealCustomer: "Data teams needing high-performance, pandas-like lib for larger data.",
        }
      ],
    },
    {
      category: "Table Formats", 
      description: "Open table formats for storing and managing large analytical datasets.",
      stackFit: "Data storage layer, enabling interoperability and efficiency in data lakes/lakehouses.",
      tools: [
        {
          name: "Iceberg",
          description: "Open table format for huge analytic datasets in data lakes.",
          benefits: "Schema evolution, ACID compliance, improves query perf & mgmt.", 
          limitations: "Emerging standard, requires compatible processing engines.",
          idealCustomer: "Orgs with huge data lakes needing reliability & optimization.", 
        },
        {
          name: "Delta Lake",
          description: "Open data lake storage layer enabling ACID compliance & scalable metadata.",
          benefits: "Improved reliability, performance, & mgmt. Tight Spark integration.", 
          limitations: "Orig built for Spark, support for other engines still maturing.",
          idealCustomer: "Databricks users & data teams adopting lakehouse architecture.",
        }
      ],
    },
    {
      category: "Data Integration",
      description: "Platforms for building and managing data pipelines between systems.",
      stackFit: "Data ingestion and movement layer, connecting data sources to destinations.",
      tools: [
        {
          name: "DLT",
          description: "Serverless change data capture (CDC) for ingesting DB changes into BigQuery.",
          benefits: "Fully managed, schema evolution support, backfill capabilities.",
          limitations: "BigQuery & GCP specific, SQL transformations only, no task dependencies.", 
          idealCustomer: "BigQuery users needing to ingest changed DB records in near-real time.",
        },
        {
          name: "Airbyte",
          description: "Open-source data integration platform for ELT.",
          benefits: "Extensive connector library, flexible deployment, transformations via DBT.",
          limitations: "Requires more technical skill vs GUI-based ETL tools.",
          idealCustomer: "Data teams looking for an extensible open-source ELT solution.", 
        },
        {
          name: "Pipedream",
          description: "Low-code integration platform for connecting APIs, apps & data sources.",
          benefits: "Large marketplace of templates/actions, easy to use, generous free tier.",
          limitations: "Less tailored to analytical use cases vs other data integration tools.",
          idealCustomer: "Engineers needing to quickly automate workflows across cloud apps & APIs.", 
        }
      ],
    },
    {  
      category: "Data Messaging Queues",
      description: "Platforms for streaming events and messages between systems in real-time.",
      stackFit: "Real-time data transport layer, enabling event-driven architectures.", 
      tools: [
        {
          name: "Snowplow",
          description: "Platform for creating data streams from web, mobile & server-side events.",
          benefits: "Flexible instrumentation, hosted or on-prem, data quality tools.",
          limitations: "Needs upfront tracking design, less real-time vs some alternatives.",
          idealCustomer: "Orgs collecting large volumes of event data for real-time applications.",
        },
        {
          name: "Rudderstack",
          description: "Open-source CDP that sends data to all your other tools",  
          benefits: "Multitude of integrations, enterprise-ready features, hosted & on-prem options",
          limitations: "More complicated pricing model vs competitors, less plug & play",
          idealCustomer: "Enterprises that need cross-platform data integration & compliance",
        }
      ],
    }
  ]

  export default function TechnologiesRoute({ params }: PageProps) {
    const { slug } = params as { slug: string };
  
    // Find the category that matches the slug
    const category = technologies.find(tech => 
      tech.category.toLowerCase().replace(/\s+/g, '-') === slug
    );
  
    if (!category) {
      return <div>Technology category not found</div>;
    }
  
    // Create the props for the TechnologyPage component
    const technologyPageProps: TechnologyPageProps = {
      title: category.category,
      description: category.description,
      stackFit: category.stackFit,
      sections: [
        {
          category: category.category,
          tools: category.tools,
        },
      ],
    };
  
    return <TechnologyPage {...technologyPageProps} />;
  }