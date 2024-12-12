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
    <div class="min-h-screen bg-[#3a3c37] text-[#F8F6F0]">
      <Head>
        <title>{title} | Your Company Name</title>
        <meta name="description" content={description} />
      </Head>

      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="space-y-12">
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold">{title}</h1>
            <p class="text-xl opacity-80">{subtitle}</p>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} class="bg-[#172217] border border-[#F8F6F0]/20 rounded-lg p-6">
              <h2 class="text-2xl text-[#6bb869] mb-6">{section.title}</h2>
              
              {section.subsections && (
                <div class="grid gap-6">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx} class="space-y-2">
                      <h3 class="text-xl font-semibold">{sub.title}</h3>
                      <p class="opacity-80">{sub.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul class="grid gap-3">
                  {section.bullets.map((item, itemIdx) => (
                    <li key={itemIdx} class="flex items-start gap-3">
                      <span class="text-[#6bb869]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.splitSections && (
                <div class="grid md:grid-cols-2 gap-6">
                  {Object.entries(section.splitSections).map(([side, content], sideIdx) => (
                    <div key={sideIdx} class="space-y-4">
                      <h3 class="text-2xl text-[#6bb869]">{content.title}</h3>
                      {content.items.map((item, itemIdx) => (
                        <div key={itemIdx} class="space-y-2">
                          <h4 class="text-lg font-semibold">{item.title}</h4>
                          <p class="opacity-80">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}