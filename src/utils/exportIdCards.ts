import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface Employee {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  location: string;
  [key: string]: any;
}

export const exportSingleCardAsPNG = async (
  cardElement: HTMLElement,
  fileName: string,
  side: 'front' | 'back'
): Promise<void> => {
  try {
    // Clone the element to avoid modifying the original
    const clone = cardElement.cloneNode(true) as HTMLElement;
    
    // Remove any transforms and fix positioning for export
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.backfaceVisibility = 'visible';
    
    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '320px';
    container.style.height = '200px';
    document.body.appendChild(container);
    container.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 3,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      width: 320,
      height: 200,
    });

    // Clean up
    document.body.removeChild(container);

    const link = document.createElement('a');
    link.download = `${fileName}_${side}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error exporting card as PNG:', error);
    throw error;
  }
};

export const exportSingleCardAsPDF = async (
  frontElement: HTMLElement,
  backElement: HTMLElement,
  fileName: string
): Promise<void> => {
  try {
    // Clone elements to avoid modifying originals
    const frontClone = frontElement.cloneNode(true) as HTMLElement;
    const backClone = backElement.cloneNode(true) as HTMLElement;
    
    // Remove transforms for both
    [frontClone, backClone].forEach(clone => {
      clone.style.transform = 'none';
      clone.style.position = 'relative';
      clone.style.backfaceVisibility = 'visible';
    });
    
    // Create temporary containers
    const frontContainer = document.createElement('div');
    frontContainer.style.position = 'absolute';
    frontContainer.style.left = '-9999px';
    frontContainer.style.width = '320px';
    frontContainer.style.height = '200px';
    document.body.appendChild(frontContainer);
    frontContainer.appendChild(frontClone);

    const backContainer = document.createElement('div');
    backContainer.style.position = 'absolute';
    backContainer.style.left = '-9999px';
    backContainer.style.width = '320px';
    backContainer.style.height = '200px';
    document.body.appendChild(backContainer);
    backContainer.appendChild(backClone);

    // Capture both sides
    const frontCanvas = await html2canvas(frontClone, {
      scale: 3,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      width: 320,
      height: 200,
    });

    const backCanvas = await html2canvas(backClone, {
      scale: 3,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      width: 320,
      height: 200,
    });

    // Clean up
    document.body.removeChild(frontContainer);
    document.body.removeChild(backContainer);

    // Create PDF (credit card size: 85.6mm x 53.98mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98],
    });

    // Add front side
    const frontImgData = frontCanvas.toDataURL('image/png');
    pdf.addImage(frontImgData, 'PNG', 0, 0, 85.6, 53.98);

    // Add back side on new page
    pdf.addPage();
    const backImgData = backCanvas.toDataURL('image/png');
    pdf.addImage(backImgData, 'PNG', 0, 0, 85.6, 53.98);

    // Save PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error exporting card as PDF:', error);
    throw error;
  }
};

export const exportAllCardsAsPNG = async (employees: Employee[]): Promise<void> => {
  try {
    for (const employee of employees) {
      const frontCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="front"]`) as HTMLElement;
      const backCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="back"]`) as HTMLElement;

      if (frontCard && backCard) {
        const fileName = `${employee.name.replace(/\s+/g, '_')}_${employee.employeeId}`;
        
        // Export front
        await exportSingleCardAsPNG(frontCard, fileName, 'front');
        
        // Small delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Export back
        await exportSingleCardAsPNG(backCard, fileName, 'back');
        
        // Small delay between employees
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  } catch (error) {
    console.error('Error exporting all cards as PNG:', error);
    throw error;
  }
};

export const exportAllCardsAsPDF = async (employees: Employee[]): Promise<void> => {
  try {
    // Create a single PDF with all cards
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98],
    });

    let firstPage = true;

    for (const employee of employees) {
      const frontCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="front"]`) as HTMLElement;
      const backCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="back"]`) as HTMLElement;

      if (frontCard && backCard) {
        // Clone elements
        const frontClone = frontCard.cloneNode(true) as HTMLElement;
        const backClone = backCard.cloneNode(true) as HTMLElement;
        
        // Remove transforms
        [frontClone, backClone].forEach(clone => {
          clone.style.transform = 'none';
          clone.style.position = 'relative';
          clone.style.backfaceVisibility = 'visible';
        });
        
        // Create temporary containers
        const frontContainer = document.createElement('div');
        frontContainer.style.position = 'absolute';
        frontContainer.style.left = '-9999px';
        frontContainer.style.width = '320px';
        frontContainer.style.height = '200px';
        document.body.appendChild(frontContainer);
        frontContainer.appendChild(frontClone);

        const backContainer = document.createElement('div');
        backContainer.style.position = 'absolute';
        backContainer.style.left = '-9999px';
        backContainer.style.width = '320px';
        backContainer.style.height = '200px';
        document.body.appendChild(backContainer);
        backContainer.appendChild(backClone);

        // Capture both sides
        const frontCanvas = await html2canvas(frontClone, {
          scale: 3,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
          width: 320,
          height: 200,
        });

        const backCanvas = await html2canvas(backClone, {
          scale: 3,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
          width: 320,
          height: 200,
        });

        // Clean up
        document.body.removeChild(frontContainer);
        document.body.removeChild(backContainer);

        // Add front side
        if (!firstPage) {
          pdf.addPage();
        }
        firstPage = false;

        const frontImgData = frontCanvas.toDataURL('image/png');
        pdf.addImage(frontImgData, 'PNG', 0, 0, 85.6, 53.98);

        // Add back side
        pdf.addPage();
        const backImgData = backCanvas.toDataURL('image/png');
        pdf.addImage(backImgData, 'PNG', 0, 0, 85.6, 53.98);

        // Small delay between employees
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Save the combined PDF
    pdf.save(`TOMO_Academy_All_ID_Cards.pdf`);
  } catch (error) {
    console.error('Error exporting all cards as PDF:', error);
    throw error;
  }
};

export const exportIndividualPDFs = async (employees: Employee[]): Promise<void> => {
  try {
    for (const employee of employees) {
      const frontCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="front"]`) as HTMLElement;
      const backCard = document.querySelector(`[data-card-id="${employee.id}"][data-side="back"]`) as HTMLElement;

      if (frontCard && backCard) {
        const fileName = `${employee.name.replace(/\s+/g, '_')}_${employee.employeeId}`;
        await exportSingleCardAsPDF(frontCard, backCard, fileName);
        
        // Small delay between employees
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  } catch (error) {
    console.error('Error exporting individual PDFs:', error);
    throw error;
  }
};
