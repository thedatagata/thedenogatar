import { Head } from "$fresh/runtime.ts";

interface TechnologySection {
  category: string;
  tools: {
    name: string;
    description: string;
    benefits: string;
    limitations: string;
    idealCustomer: string;
  }[];
}

export interface TechnologyPageProps {
  title: string;
  description: string;
  stackFit: string;
  sections: TechnologySection[];
}

export default function TechnologyPage({ title, description, stackFit, sections }: TechnologyPageProps) {
  return (
    <div class="min-h-screen bg-white text-gray-800">
      <Head>
        <title>{title} | Your Company Name</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="space-y-12">
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold text-blue-600">{title}</h1>
            <p class="text-xl text-gray-600">{description}</p>
            <p class="text-lg text-gray-700">{stackFit}</p>
          </div>
  
          {sections.map((section, idx) => (
            <div key={idx} class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-semibold text-blue-600 mb-4">{section.category}</h2>

              <div class="grid gap-6">
                {section.tools.map((tool, toolIdx) => (
                  <div key={toolIdx} class="border border-gray-200 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2">{tool.name}</h3>
                    <div class="space-y-2">
                      <p><span class="font-semibold">Description:</span> {tool.description}</p>
                      <p><span class="font-semibold">Benefits:</span> {tool.benefits}</p>                      
                      <p><span class="font-semibold">Limitations:</span> {tool.limitations}</p>
                      <p><span class="font-semibold">Ideal Customer:</span> {tool.idealCustomer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}