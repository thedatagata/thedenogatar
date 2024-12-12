// components/ExpertisePage.tsx
import { Head } from "$fresh/runtime.ts";

interface ExpertiseSection {
  topic: string;
  description: string;
  importance: string;
  maturityCurve: string;
  approach: string;
  philosophy: string;
  stories: string[];
}

export interface ExpertisePageProps {
  title: string;
  description: string;
  subtitle: string;
  sections: ExpertiseSection[];
}

export default function ExpertisePage({ title, description, subtitle, sections }: ExpertisePageProps) {
  return (
    <div class="min-h-screen bg-[#172217]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-4xl mx-auto px-4 py-24">
        <article class="space-y-16">
          <header class="text-center space-y-6">
            <h1 class="text-6xl font-bold text-[#F8F6F0]">{title}</h1>
            <p class="text-2xl font-light text-[#90C137]">{subtitle}</p>
            <p class="text-xl text-[#F8F6F0]/80">{description}</p>
          </header>

          {sections.map((section, idx) => (
            <section key={idx} class="space-y-8">
              <h2 class="text-3xl font-semibold text-[#90C137]">{section.topic}</h2>
              
              <div class="prose prose-invert prose-green max-w-none">
                <p class="text-lg text-[#F8F6F0]/80">{section.description}</p>
                
                <div class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8 my-8">
                  <h3 class="text-2xl font-medium text-[#90C137] mb-4">Why It Matters</h3>
                  <p class="text-[#F8F6F0]/90">{section.importance}</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 class="text-xl font-medium text-[#90C137] mb-4">Our Approach</h3>
                    <p class="text-[#F8F6F0]/80">{section.approach}</p>
                  </div>
                  <div>
                    <h3 class="text-xl font-medium text-[#90C137] mb-4">Our Philosophy</h3>
                    <p class="text-[#F8F6F0]/80">{section.philosophy}</p>
                  </div>
                </div>

                <div class="mt-12">
                  <h3 class="text-2xl font-medium text-[#90C137] mb-6">Success Stories</h3>
                  <div class="grid gap-4">
                    {section.stories.map((story, storyIdx) => (
                      <div key={storyIdx} class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-6">
                        <p class="text-[#F8F6F0]/90">{story}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}