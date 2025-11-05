import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DownloadButtonProps {
  imageUrl?: string;
  fileName?: string;
}

const DownloadButton = ({ imageUrl, fileName = "activity-photo.jpg" }: DownloadButtonProps) => {
  const handleDownload = async () => {
    if (!imageUrl) {
      toast.error("No image available to download");
      return;
    }

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Photo downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download photo");
      console.error("Download error:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleDownload}
    >
      <Download className="w-4 h-4" />
      Download Photo
    </Button>
  );
};

export default DownloadButton;
