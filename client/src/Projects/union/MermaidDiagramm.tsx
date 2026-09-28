import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
});



export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!containerRef.current) return;

      try {
        setError(null);

        const id = `mermaid-${crypto.randomUUID()}`;

        const { svg, bindFunctions } = await mermaid.render(id, chart);

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;

        bindFunctions?.(containerRef.current);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to render Mermaid diagram",
          );
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="mermaid-error">
        {error}
      </pre>
    );
  }

  return <div ref={containerRef} />;
}