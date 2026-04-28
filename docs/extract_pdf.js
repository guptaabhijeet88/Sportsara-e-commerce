const fs = require('fs');
const path = require('path');

async function main() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  
  const data = new Uint8Array(fs.readFileSync('final-year-black-book_project.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  console.log('TOTAL PAGES:', doc.numPages);
  console.log('---TEXT START---');
  
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    console.log(`\n=== PAGE ${i} ===`);
    console.log(text);
  }
  
  console.log('\n---TEXT END---');
}

main().catch(console.error);
