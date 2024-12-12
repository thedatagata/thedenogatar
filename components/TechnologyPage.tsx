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
    <div class="min-h-screen bg-[#172217]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-7xl mx-auto px-4 py-24">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h1 class="text-6xl font-bold text-[#F8F6F0] mb-6">{title}</h1>
          <p class="text-xl text-[#F8F6F0]/80 mb-6">{description}</p>
          <div class="inline-block bg-[#90C137]/10 px-4 py-2 rounded-full">
            <p class="text-lg font-medium text-[#90C137]">{stackFit}</p>
          </div>
        </div>

        <div class="grid gap-16">
          {sections.map((section) => (
            <div key={section.category}>
              <h2 class="text-3xl font-bold text-[#90C137] mb-8">{section.category}</h2>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.tools.map((tool) => (
                  <div key={tool.name} class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8 hover:bg-[#F8F6F0]/10 transition-colors">
                    <div class="flex items-center gap-4 mb-6">
                      <h3 class="text-2xl font-semibold text-[#90C137]">{tool.name}</h3>
                    </div>
                    <div class="space-y-6">
                      <p class="text-[#F8F6F0]/90">{tool.description}</p>
                      
                      <div class="space-y-4">
                        <div class="border-l-2 border-[#90C137] pl-4">
                          <h4 class="text-sm uppercase tracking-wider text-[#90C137] mb-2">Benefits</h4>
                          <p class="text-[#F8F6F0]/80">{tool.benefits}</p>
                        </div>

                        <div class="border-l-2 border-[#F8F6F0]/20 pl-4">
                          <h4 class="text-sm uppercase tracking-wider text-[#F8F6F0]/60 mb-2">Limitations</h4>
                          <p class="text-[#F8F6F0]/60">{tool.limitations}</p>
                        </div>

                        <div class="mt-6 pt-6 border-t border-[#F8F6F0]/10">
                          <h4 class="text-sm font-medium text-[#90C137] mb-2">Ideal For</h4>
                          <p class="text-[#F8F6F0]/80">{tool.idealCustomer}</p>
                        </div>
                      </div>
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