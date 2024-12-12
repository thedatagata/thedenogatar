// components/MarketingPage.tsx
import { Head } from "$fresh/runtime.ts";

interface ContentSection {
  title: string;
  subsections?: { title: string; content: string }[];
  bullets?: string[];
  splitSections?: {
    left: { title: string; items: { title: string; description: string }[] };
    right: { title: string; items: { title: string; description: string }[] };
  };
  diagram?: string;
}

export interface SolutionsPageProps {
  title: string;
  description: string;
  subtitle: string;
  sections: ContentSection[];
}

export default function SolutionsPage({ title, description, subtitle, sections }: SolutionsPageProps) {
  return (
    <div class="min-h-screen bg-[#172217]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-7xl mx-auto px-4 py-24">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h1 class="text-6xl font-bold text-[#F8F6F0] mb-6">{title}</h1>
          <p class="text-2xl font-light text-[#90C137] mb-8">{subtitle}</p>
          <p class="text-xl text-[#F8F6F0]/80">{description}</p>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} class="mb-20">
            <h2 class="text-3xl font-bold text-[#90C137] mb-12">{section.title}</h2>
            
            {section.subsections && (
              <div class="grid md:grid-cols-3 gap-8 mb-12">
                {section.subsections.map((subsection, subIdx) => (
                  <div key={subIdx} class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8">
                    <h3 class="text-xl font-semibold text-[#90C137] mb-4">{subsection.title}</h3>
                    <p class="text-[#F8F6F0]/80">{subsection.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            {section.bullets && (
              <div class="bg-[#F8F6F0]/5 backdrop-blur-sm rounded-lg p-8">
                <ul class="grid md:grid-cols-2 gap-4">
                  {section.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} class="flex items-start gap-4">
                      <span class="text-[#90C137]">•</span>
                      <span class="text-[#F8F6F0]/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}