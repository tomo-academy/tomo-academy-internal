import { Button } from "@/components/ui/button";
import { Download, Folder, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  exportSingleCardAsPDF,
  type Employee,
} from "@/utils/exportIdCards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderAndCapture } from "@/utils/exportIdCards";

interface ExportAllCardsDialogProps {
  employees: Employee[];
}

export function ExportAllCardsDialog({ employees }: ExportAllCardsDialogProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const exportAllAsZip = async () => {
    if (employees.length === 0) return;

    setIsExporting(true);
    toast.loading(`Exporting ${employees.length} ID cards...`, { id: "export-zip" });

    try {
      const zip = new JSZip();
      const pngFolder = zip.folder("png");
      const pdfFolder = zip.folder("pdf");

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const sanitizedName = `${employee.name.replace(/\s+/g, '_')}_${employee.employeeId}`;
        
        toast.loading(`Processing ${employee.name} (${i + 1}/${employees.length})...`, { id: "export-zip" });

        // Export PNG images
        const frontCanvas = await renderAndCapture(employee, 'front');
        const backCanvas = await renderAndCapture(employee, 'back');

        // Convert canvas to blob
        const frontBlob = await new Promise<Blob>((resolve) => {
          frontCanvas.toBlob((blob) => resolve(blob!), 'image/png');
        });
        const backBlob = await new Promise<Blob>((resolve) => {
          backCanvas.toBlob((blob) => resolve(blob!), 'image/png');
        });

        // Add to zip
        pngFolder?.file(`${sanitizedName}_front.png`, frontBlob);
        pngFolder?.file(`${sanitizedName}_back.png`, backBlob);

        // Generate PDF and add to zip
        const pdf = await generatePDFBlob(employee);
        pdfFolder?.file(`${sanitizedName}.pdf`, pdf);

        // Small delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Generate the zip file
      toast.loading("Creating ZIP file...", { id: "export-zip" });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Save the zip file
      saveAs(zipBlob, "TOMO_Academy_ID_Cards.zip");

      toast.success(`Successfully exported ${employees.length} ID cards!`, { id: "export-zip" });
      setIsOpen(false);
    } catch (error) {
      console.error('Error exporting cards:', error);
      toast.error("Failed to export ID cards", { id: "export-zip" });
    } finally {
      setIsExporting(false);
    }
  };

  // Helper to generate PDF blob
  const generatePDFBlob = async (employee: Employee): Promise<Blob> => {
    const { jsPDF } = await import('jspdf');
    const frontCanvas = await renderAndCapture(employee, 'front');
    const backCanvas = await renderAndCapture(employee, 'back');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98],
    });

    const frontImgData = frontCanvas.toDataURL('image/png');
    pdf.addImage(frontImgData, 'PNG', 0, 0, 85.6, 53.98);

    pdf.addPage();
    const backImgData = backCanvas.toDataURL('image/png');
    pdf.addImage(backImgData, 'PNG', 0, 0, 85.6, 53.98);

    return pdf.output('blob');
  };

  if (employees.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
        >
          <Folder className="h-4 w-4" />
          Export All Cards
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export All ID Cards</DialogTitle>
          <DialogDescription>
            Download all {employees.length} ID cards as PNG and PDF files in a ZIP archive.
            This will create organized folders for easy printing.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">
            <h4 className="font-semibold text-sm mb-2">📦 ZIP Contents:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <code>png/</code> - {employees.length * 2} PNG images (front + back)</li>
              <li>• <code>pdf/</code> - {employees.length} PDF files (ready for printing)</li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h4 className="font-semibold text-sm mb-2">🖨️ Print Specifications:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Size: 85.6mm × 53.98mm (credit card)</li>
              <li>• Resolution: 960×600px (3x scale)</li>
              <li>• Format: PNG & PDF</li>
            </ul>
          </div>

          <Button
            onClick={exportAllAsZip}
            disabled={isExporting}
            className="w-full"
            size="lg"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exporting... Please wait
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download ZIP File ({employees.length} cards)
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
