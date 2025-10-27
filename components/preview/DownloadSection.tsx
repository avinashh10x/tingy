import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadSectionProps {
  downloadUrl: string;
  filename: string;
}

export function DownloadSection({ downloadUrl, filename }: DownloadSectionProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3">
      <Button onClick={handleDownload} className="w-full" size="lg">
        <Download className="mr-2 h-5 w-5" />
        Download Compressed Image
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        File will be saved as: <span className="font-mono">{filename}</span>
      </p>
    </div>
  );
}
