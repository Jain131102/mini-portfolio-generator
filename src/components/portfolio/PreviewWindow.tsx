import { GeneratedFiles } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewWindowProps {
  files: GeneratedFiles;
  isDark: boolean;
}

function buildSrcDoc(rawHtml: string, isDark: boolean) {
  // Ensure a <head> exists
  let html = rawHtml.replace(
    /<html([^>]*)>(?![\s\S]*<\/head>)/i,
    "<html$1><head></head>"
  );

  // Add meta color-scheme and baseline readable colors for both modes
  const headInject = `
    <meta name="color-scheme" content="light dark">
    <style>
      :root { color-scheme: light dark; }
      body { background: #ffffff; color: #0f172a; }
      .dark body { background: #0b0f19; color: #e5e7eb; }
    </style>
  `;
  html = html.replace(/<head([^>]*)>/i, `<head$1>${headInject}`);

  // Add .dark to <html> when dark mode is on
  if (isDark) {
    html = html.replace(/<html([^>]*)class=(['"])([^'"]*)\2/i, (m, a, q, c) => `<html${a}class=${q}${c} dark${q}`)
               .replace(/<html((?![^>]*class=)[^>]*)>/i, `<html$1 class="dark">`);
  }

  return html;
}

export function PreviewWindow({ files, isDark }: PreviewWindowProps) {
  return (
    <Card className="h-full shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary-200 dark:to-primary-400">
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <iframe
          srcDoc={buildSrcDoc(files.indexHtml, isDark)}
          className="w-full h-full border-0 rounded-b-lg"
          title="Portfolio Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </CardContent>
    </Card>
  );
}
