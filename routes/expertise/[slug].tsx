import { PageProps } from "$fresh/server.ts";
import { ExpertisePageProps } from "../../components/ExpertisePage.tsx";
import ExpertisePage from "../../components/ExpertisePage.tsx";

const expertiseContent: Record<string, ExpertisePageProps> = {
    "data-architecture-consulting-implementation": {
      title: "Data Architecture Consulting & Implementation",
      description: "Expert guidance on designing and implementing robust, scalable data architectures.",
      subtitle: "Build a solid foundation for your data-driven initiatives",
      sections: [
        {
          topic: "Data Architecture Assessment",
          description: "Comprehensive assessment of your current data architecture to identify gaps and opportunities for improvement.",
          importance: "A well-designed data architecture is critical for enabling data-driven decision making and unlocking the full value of your data assets.",
          maturityCurve: "As organizations mature, their data architecture evolves from siloed systems to integrated, scalable platforms that support diverse use cases.",
          approach: "Our approach focuses on understanding your business objectives and designing a data architecture that aligns with your goals and constraints.",
          philosophy: "We believe that a data architecture should be designed with flexibility, scalability, and maintainability in mind.",
          stories: [
            "Helped a client modernize their data architecture, resulting in improved data quality and faster time-to-insights.",
            "Designed a scalable data platform that enabled a client to efficiently ingest, process, and analyze large volumes of data."
          ]
        }
      ]
    },
    "datawarehouse-optimization": {
      title: "Data Warehouse Optimization",
      description: "Optimize your data warehouse for improved performance, scalability, and cost-efficiency.",
      subtitle: "Unlock the full potential of your data warehouse",
      sections: [
        {
          topic: "Performance Tuning",
          description: "Identify and address performance bottlenecks in your data warehouse to improve query speed and concurrency.",
          importance: "An optimized data warehouse enables faster analytics and reporting, leading to more timely data-driven decisions.",
          maturityCurve: "As data volumes and complexity grow, data warehouse optimization becomes increasingly important to maintain performance and manage costs.", 
          approach: "Our approach involves a thorough analysis of your workloads, schema design, and infrastructure to identify optimization opportunities.",
          philosophy: "We believe that a well-optimized data warehouse is essential for delivering a high-quality analytics experience to your users.",
          stories: [
            "Optimized a client's data warehouse, reducing average query times by 60% and enabling real-time reporting.",
            "Helped a client reduce their data warehouse costs by 40% through workload optimization and infrastructure rightsizing."  
          ]
        }
      ]
    },
    "analytics-engineering-bi-development": {
      title: "Analytics Engineering & Business Intelligence Development",
      description: "Empower your organization with self-service analytics and data-driven insights.",
      subtitle: "Transform raw data into actionable intelligence",
      sections: [
        {
          topic: "Data Modeling",
          description: "Design and implement efficient, reusable data models that support your analytics and reporting requirements.",
          importance: "Well-designed data models form the foundation for reliable, consistent, and performant analytics and BI solutions.",
          maturityCurve: "As analytics needs evolve, data models must adapt to support new use cases and incorporate best practices for scalability and maintainability.",
          approach: "Our approach emphasizes close collaboration with business stakeholders to ensure data models align with real-world analytics requirements.",
          philosophy: "We believe that data models should strike a balance between performance, simplicity, and flexibility to support a wide range of analytics use cases.",
          stories: [
            "Developed a comprehensive data model that enabled self-service analytics for a client's marketing team, reducing time-to-insight by 80%.",
            "Redesigned a client's data model to improve query performance by 10x and support advanced analytics use cases."
          ]  
        }
      ]
    },
    "data-integrations-pipelines": {
      title: "Data Integrations & Pipelines",
      description: "Seamlessly integrate data from disparate sources to fuel your analytics and data-driven applications.",
      subtitle: "Break down data silos and enable data-driven innovation",
      sections: [
        {
          topic: "Data Integration Strategy",
          description: "Develop a comprehensive data integration strategy that aligns with your business objectives and technical requirements.",
          importance: "A well-defined data integration strategy ensures that your data pipelines are reliable, scalable, and deliver value to the business.",
          maturityCurve: "As data volumes and variety increase, data integration strategies must evolve to incorporate new technologies and best practices for real-time, high-volume data processing.",
          approach: "Our approach focuses on understanding your data landscape, identifying integration challenges, and designing a tailored solution that meets your needs.",
          philosophy: "We believe that data integration should be approached holistically, considering factors such as data quality, security, governance, and performance.",
          stories: [
            "Implemented a real-time data integration pipeline that enabled a client to make faster, more informed decisions based on up-to-date information.",
            "Developed a data integration solution that combined data from multiple siloed systems, providing a unified view of customer interactions."
          ]
        }  
      ]
    },
    "product-marketing-analytics": {
      title: "Product and Marketing Analytics",
      description: "Gain deep insights into customer behavior and product performance to drive growth and innovation.",
      subtitle: "Leverage data to optimize your product and marketing strategies", 
      sections: [
        {
          topic: "Customer Analytics",
          description: "Analyze customer behavior and preferences to inform product development, marketing campaigns, and personalization efforts.",
          importance: "Understanding your customers is essential for delivering targeted, relevant experiences that drive engagement, retention, and revenue.",
          maturityCurve: "As organizations become more customer-centric, advanced analytics techniques like machine learning and predictive modeling become increasingly important for gaining a competitive edge.",
          approach: "Our approach combines deep domain expertise with cutting-edge analytics tools and techniques to uncover actionable insights from your customer data.",
          philosophy: "We believe that customer analytics should be a continuous, iterative process that informs decision-making across the organization.",
          stories: [
            "Helped a client increase customer lifetime value by 25% through targeted personalization and retention campaigns informed by advanced analytics.",
            "Developed a customer segmentation model that enabled a client to tailor product offerings and marketing messages to specific customer groups."
          ]
        }
      ]  
    },
    "web-mobile-tagging": {
      title:  "Web and Mobile Tagging",
      description: "Implement robust tracking and data collection strategies to capture valuable insights from your digital properties.",
      subtitle: "Unlock the power of your digital data",
      sections: [
        {
          topic: "Tagging Strategy",
          description: "Develop a comprehensive tagging strategy that aligns with your business objectives and analytics requirements.",
          importance: "A well-designed tagging strategy ensures that you are capturing the right data to answer critical business questions and drive optimization efforts.", 
          maturityCurve: "As digital touchpoints multiply and customer journeys become more complex, tagging strategies must adapt to capture a complete, unified view of the customer experience.",
          approach: "Our approach emphasizes close collaboration with stakeholders to understand key business questions, design an appropriate tagging framework, and ensure data quality and consistency.",
          philosophy: "We believe that a tagging strategy should be designed with flexibility and scalability in mind to accommodate evolving business needs and new technologies.",
          stories: [
            "Implemented an enhanced tagging strategy for a client's ecommerce site, resulting in a 30% increase in actionable insights and a 10% boost in conversion rates.",
            "Developed a mobile app tracking solution that provided visibility into key user behaviors and informed product optimization decisions."  
          ]
        }
      ]
    },
    "customer-data-platforms": {
      title: "Customer Data Platforms",
      description: "Unify your customer data from across touchpoints to enable personalized, omnichannel experiences.",
      subtitle: "Create a single, actionable view of your customers",
      sections: [
        {
          topic: "CDP Strategy",
          description: "Develop a customer data platform strategy that aligns with your business objectives and technology landscape.",
          importance: "A well-designed CDP strategy enables you to break down data silos, create rich customer profiles, and activate data across channels to deliver superior customer experiences.",
          maturityCurve: "As customer expectations for personalized experiences grow, CDPs become an essential tool for organizations looking to compete on the basis of customer-centricity.",
          approach: "Our approach focuses on understanding your unique customer data challenges and designing a CDP solution that integrates seamlessly with your existing technology stack.",
          philosophy: "We believe that a CDP should be designed with data quality, governance, and activation in mind to ensure that you can trust and leverage your customer data with confidence.",
          stories: [
            "Implemented a CDP solution that unified customer data from 10+ sources, enabling a client to deliver personalized experiences across channels and increase CLTV by 20%.",
            "Developed a CDP strategy that empowered a client's marketing team to launch targeted campaigns in real-time based on customer behaviors and preferences."
          ]
        }
      ] 
    },
    "data-activation-marketing-personalization": {
      title: "Data Activation & Marketing Personalization",
      description: "Leverage your data assets to power personalized, engaging customer experiences across channels.",
      subtitle: "Bring your data to life and delight your customers",  
      sections: [
        {
          topic: "Personalization Strategy",
          description: "Develop a comprehensive personalization strategy that leverages your unique data assets and aligns with your business objectives.",
          importance: "Personalization is a key driver of customer engagement, loyalty, and lifetime value in today's hyper-competitive digital landscape.",
          maturityCurve: "As personalization technologies and customer expectations evolve, organizations must continually advance their strategies to stay ahead of the curve.",
          approach: "Our approach combines deep expertise in data science, marketing technology, and creative strategy to design and execute personalization programs that deliver measurable results.",
          philosophy: "We believe that effective personalization requires a balance of art and science, leveraging data-driven insights to inform creative experiences that resonate with customers.",
          stories: [
            "Developed a personalization program for a client that increased email open rates by 40% and click-through rates by 25% through dynamic content optimization.",
            "Implemented a real-time personalization engine that delivered tailored product recommendations across a client's website and mobile app, increasing conversion rates by 15%."
          ]
        }
      ]
    }
  };

export default function ExpertiseRoute({ params }: PageProps) {
const { slug } = params as { slug: string };
if (typeof slug !== "string" || !(slug in expertiseContent)) {
    return <div>Expertise not found</div>;
}

const content = expertiseContent[slug as keyof typeof expertiseContent];

if (!content) {
    return <div>Expertise not found</div>;
}

return <ExpertisePage {...content} />;
}