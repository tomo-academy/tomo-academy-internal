# Exported ID Cards

This folder contains all the exported ID cards for printing physical cards.

## Folder Structure

```
exported-id-cards/
├── png/                    # PNG images of all ID cards
│   ├── Name_front.png     # Front side of card
│   ├── Name_back.png      # Back side of card
│   └── ...
├── pdf/                    # PDF files for printing
│   ├── Name.pdf           # Individual card (front + back)
│   └── All_Cards.pdf      # All cards in one file
└── README.md              # This file
```

## How to Export ID Cards

### Method 1: Using the Web Interface (Easiest)

1. Navigate to the Team page in your browser
2. **For individual cards**: Hover over any card and click the download button
3. **For all cards**: Click "Export ID Cards" button in the header and choose your option:
   - PNG Files - Separate front and back images for each person
   - Combined PDF - All cards in one PDF file
   - Individual PDFs - Separate PDF for each person

### Method 2: Using the Generation Script (Automated)

1. Make sure your development server is running: `npm run dev`
2. Install puppeteer (if not already): `npm install puppeteer`
3. Run the script: `node scripts/generate-id-cards.js`
4. Find the exported cards in the `exported-id-cards` folder

## Printing Specifications

- **Card Size**: 85.6mm × 53.98mm (standard credit card size)
- **Resolution**: 3x scale (960×600 pixels) for high quality printing
- **Format**: PNG for individual images, PDF for professional printing
- **Material Recommendation**: PVC card stock (CR80 size)

## Tips for Professional Printing

1. **Use PDF format** for best quality with professional printers
2. **Print on PVC cards** for durability
3. **Consider lamination** for extra protection
4. **Add magnetic stripe or RFID** on the back if needed
5. **Test print one card** before printing the entire batch

## Note

The `exported-id-cards` folder is gitignored to avoid committing large binary files to the repository.
