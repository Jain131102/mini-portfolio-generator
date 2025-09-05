import { GeneratedFiles } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewWindowProps {
  files: GeneratedFiles;
  isDark: boolean;
}

export function PreviewWindow({ files, isDark }: PreviewWindowProps) {
  // Create a blob URL for the preview
  const createPreviewUrl = () => {
    const blob = new Blob([files.indexHtml], { type: 'text/html' });
    return URL.createObjectURL(blob);
  };

  return (
    <Card className="h-full shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <iframe
          src={createPreviewUrl()}
          className="w-full h-full border-0 rounded-b-lg"
          title="Portfolio Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </CardContent>
    </Card>
  );
}