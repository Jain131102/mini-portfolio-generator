import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeneratedFiles } from "@/types/portfolio";
import { downloadPortfolioZip } from "@/lib/zip-exporter";
import { useToast } from "@/hooks/use-toast";

interface ZipExporterProps {
  files: GeneratedFiles;
  portfolioName: string;
}

export function ZipExporter({ files, portfolioName }: ZipExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const success = await downloadPortfolioZip(files, portfolioName);
      
      if (success) {
        toast({
          title: "Portfolio exported successfully!",
          description: "Your portfolio files have been downloaded as a ZIP file.",
        });
      } else {
        throw new Error("Export failed");
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error creating your portfolio ZIP file.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 gradient-primary text-white hover:shadow-glow transition-smooth"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? "Exporting..." : "Download ZIP"}
    </Button>
  );
}