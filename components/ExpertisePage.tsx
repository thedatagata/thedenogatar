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
    <div class="min-h-screen bg-white text-gray-800">
      <Head>
        <title>{title} | Your Company Name</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="space-y-12">
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold text-blue-600">{title}</h1>
            <p class="text-xl text-gray-600">{subtitle}</p>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-semibold text-blue-600 mb-4">{section.topic}</h2>
              
              <div class="space-y-6">
                <p class="text-gray-700">{section.description}</p>
                
                <div>
                  <h3 class="text-xl font-semibold mb-2">Importance to Business</h3>
                  <p class="text-gray-700">{section.importance}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold mb-2">Data Maturity Curve</h3>
                  <p class="text-gray-700">{section.maturityCurve}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold mb-2">Our Approach</h3>
                  <p class="text-gray-700">{section.approach}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold mb-2">Our Philosophy</h3>
                  <p class="text-gray-700">{section.philosophy}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold mb-2">Stories</h3>
                  <ul class="list-disc list-inside space-y-2">
                    {section.stories.map((story, storyIdx) => (
                      <li key={storyIdx} class="text-gray-700">{story}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}