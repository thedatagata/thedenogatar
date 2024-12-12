// islands/Mermaid.tsx
import { useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface MermaidProps {
  chart: string;
  config?: Record<string, unknown>;
}

export default function Mermaid({ chart, config = {} }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const elementRef = useRef<HTMLDivElement>(null);
  const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!IS_BROWSER) return;

    const initialize = async () => {
      try {
        // Dynamic import of mermaid
        const mermaid = (await import("https://cdn.skypack.dev/mermaid@10.6.1")).default;

        // Configure mermaid with brand colors
        const defaultConfig = {
          theme: "base",
          themeVariables: {
            // Primary Brand Color (#6bb869) - Used for nodes, arrows, and important elements
            primaryColor: "#6bb869",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#6bb869",
            
            // Secondary Brand Color (#3a3c37) - Used for backgrounds and containers
            secondaryColor: "#3a3c37",
            tertiaryColor: "#2d2f2a", // Slightly darker variant for depth
            
            // Text and Line Colors
            fontFamily: "system-ui, sans-serif",
            lineColor: "#6bb869",
            textColor: "#ffffff",
            
            // Node Styles
            nodeBorder: "#6bb869",
            nodeTextColor: "#ffffff",
            
            // Background Colors
            background: "#3a3c37",
            mainBkg: "#3a3c37",
            
            // Contrast Colors for Better Readability
            labelTextColor: "#ffffff",
            edgeLabelBackground: "#2d2f2a",
            
            // State Diagram Specific Colors
            labelBoxBkgColor: "#3a3c37",
            labelBoxBorderColor: "#6bb869",
            
            // Notes and Special Elements
            noteBkgColor: "#2d2f2a",
            noteTextColor: "#ffffff",
            noteBorderColor: "#6bb869",

            // Flowchart Specific
            clusterBkg: "#2d2f2a",
            clusterBorder: "#6bb869",
            
            // Emphasis
            activeTaskBorderColor: "#ffffff",
            activeTaskBkgColor: "#6bb869",
            
            // Axis and Grid (for charts)
            gridColor: "#4a4c47",
            
            // Special States
            errorBkgColor: "#cc3333",
            errorTextColor: "#ffffff"
          },
          flowchart: {
            curve: "basis",
            padding: 20
          }
        };

        mermaid.initialize({
          ...defaultConfig,
          ...config,
          startOnLoad: false,
          securityLevel: "strict"
        });

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError("");
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
        setSvg("");
      }
    };

    initialize();
  }, [chart, config, id]);

  if (error) {
    return (
      <div class="p-4 text-red-500 bg-red-100 rounded">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      class="mermaid-diagram overflow-auto"
      style={{
        background: "#3a3c37",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}