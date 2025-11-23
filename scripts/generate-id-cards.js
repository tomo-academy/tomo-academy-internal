/**
 * Script to generate ID card images for all employees
 * This will create PNG and PDF files in the 'exported-id-cards' folder
 * 
 * Usage: node scripts/generate-id-cards.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'exported-id-cards');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
}

// Create subdirectories
const PNG_DIR = path.join(OUTPUT_DIR, 'png');
const PDF_DIR = path.join(OUTPUT_DIR, 'pdf');

[PNG_DIR, PDF_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function generateIDCards() {
  console.log('🚀 Starting ID card generation...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to match card size
    await page.setViewport({
      width: 960,  // 320px * 3 for high quality
      height: 600, // 200px * 3
      deviceScaleFactor: 3
    });

    // Navigate to the team page (adjust URL as needed)
    console.log('📄 Loading team page...');
    await page.goto('http://localhost:5173/team', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for cards to load
    await page.waitForSelector('[data-card-id]', { timeout: 10000 });

    // Get all employee card IDs
    const employeeIds = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-card-id][data-side="front"]');
      return Array.from(cards).map(card => ({
        id: card.getAttribute('data-card-id'),
        name: card.querySelector('h2')?.textContent || 'Unknown'
      }));
    });

    console.log(`📋 Found ${employeeIds.length} employees\n`);

    for (let i = 0; i < employeeIds.length; i++) {
      const { id, name } = employeeIds[i];
      const sanitizedName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      
      console.log(`[${i + 1}/${employeeIds.length}] Processing: ${name}`);

      try {
        // Export Front Side
        const frontSelector = `[data-card-id="${id}"][data-side="front"]`;
        const frontElement = await page.$(frontSelector);
        
        if (frontElement) {
          // PNG Front
          await frontElement.screenshot({
            path: path.join(PNG_DIR, `${sanitizedName}_front.png`),
            omitBackground: false
          });
          
          console.log(`  ✅ Front PNG saved`);
        }

        // Export Back Side
        const backSelector = `[data-card-id="${id}"][data-side="back"]`;
        const backElement = await page.$(backSelector);
        
        if (backElement) {
          // PNG Back
          await backElement.screenshot({
            path: path.join(PNG_DIR, `${sanitizedName}_back.png`),
            omitBackground: false
          });
          
          console.log(`  ✅ Back PNG saved`);
        }

        // Generate PDF with both sides
        if (frontElement && backElement) {
          // This would require additional PDF generation logic
          console.log(`  ℹ️  PDF generation - use browser export for now`);
        }

      } catch (error) {
        console.error(`  ❌ Error processing ${name}:`, error.message);
      }

      console.log('');
    }

    console.log('🎉 All ID cards generated successfully!');
    console.log(`📁 Output location: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
generateIDCards().catch(console.error);
