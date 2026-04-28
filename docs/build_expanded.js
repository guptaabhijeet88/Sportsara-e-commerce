const puppeteer = require('puppeteer');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Load chapter content from separate file
const { getChaptersHTML } = require('./chapters_content.js');

async function build() {
  console.log('=== SportSara Black Book - Expanded Edition (80 Pages) ===\n');

  // Step 1: Extract first 6 pages from original PDF
  console.log('[1/4] Extracting front matter (pages 1-6) from original PDF...');
  const originalPdf = fs.readFileSync(path.join(__dirname, 'final-year-black-book_project_80pages.pdf'));
  const origDoc = await PDFDocument.load(originalPdf);
  const frontMatterDoc = await PDFDocument.create();
  const frontPages = await frontMatterDoc.copyPages(origDoc, [0, 1, 2, 3, 4, 5]);
  frontPages.forEach(p => frontMatterDoc.addPage(p));
  const frontMatterBytes = await frontMatterDoc.save();
  console.log('   ✓ Front matter extracted (6 pages)\n');

  // Step 2: Generate expanded chapter HTML
  console.log('[2/4] Generating expanded chapter content...');
  const chaptersHTML = getChaptersHTML();

  // Step 3: Convert HTML to PDF using Puppeteer
  console.log('[3/4] Converting chapters to PDF with Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const fullHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4;
    margin: 0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13pt;
    line-height: 1.8;
    color: #000;
    background: #fff;
  }
  img {
    max-width: 100%;
    height: auto;
  }

  /* ================================================
     EACH .page section = one dedicated page.
     Content stays together, never splits.
     Matches the reference PDF structure exactly.
     ================================================ */
  .page {
    page-break-after: always;
    position: relative;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .page:last-child {
    page-break-after: auto;
  }

  /* Screenshot pages */
  .screenshot-page {
    page-break-before: always;
    page-break-after: always;
    page-break-inside: avoid;
  }

  /* Chapter title */
  h1.chapter-title {
    font-size: 18pt;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 24pt;
    letter-spacing: 1px;
  }

  h2 {
    font-size: 14pt;
    font-weight: bold;
    margin-top: 18pt;
    margin-bottom: 10pt;
  }
  h3 {
    font-size: 13pt;
    font-weight: bold;
    margin-top: 14pt;
    margin-bottom: 8pt;
  }
  p {
    text-align: justify;
    margin-bottom: 10pt;
    text-indent: 0;
  }
  ul, ol {
    margin-left: 20pt;
    margin-bottom: 10pt;
  }
  li {
    margin-bottom: 4pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16pt 0;
    font-size: 12pt;
  }
  table th, table td {
    border: 1px solid #000;
    padding: 10pt 12pt;
    text-align: left;
    vertical-align: middle;
  }
  table th {
    background: #e8e8e8;
    font-weight: bold;
    text-align: center;
  }
  .toc-table th, .toc-table td {
    padding: 16pt 12pt;
  }
  .code-block {
    font-family: 'Courier New', monospace;
    font-size: 10pt;
    background: #fdfdfd;
    border: 1px solid #ccc;
    padding: 12pt;
    margin: 12pt 0;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 4px;
  }
  .indent { margin-left: 20pt; }
  .bold { font-weight: bold; }
  .center { text-align: center; }
  .mt-1 { margin-top: 12pt; }
  .mt-2 { margin-top: 24pt; }
  .mb-1 { margin-bottom: 12pt; }
  .mb-2 { margin-bottom: 24pt; }
</style>
</head>
<body>
${chaptersHTML}
</body>
</html>`;

  // Write temp HTML so images load with proper file:// paths
  const tempHtmlPath = path.join(__dirname, '_temp_build.html');
  fs.writeFileSync(tempHtmlPath, fullHTML);
  await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 30000 });
  const chaptersPdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '25mm', right: '25mm', bottom: '30mm', left: '30mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:11pt;font-family:Times New Roman,serif;color:#333;padding-top:5px;"><span class="pageNumber"></span></div>',
  });
  await browser.close();
  console.log('   ✓ Chapters PDF generated\n');

  // Step 4: Merge front matter + chapters
  console.log('[4/4] Merging front matter + expanded chapters...');
  const finalDoc = await PDFDocument.create();

  // Add front matter
  const fmDoc = await PDFDocument.load(frontMatterBytes);
  const fmPages = await finalDoc.copyPages(fmDoc, fmDoc.getPageIndices());
  fmPages.forEach(p => finalDoc.addPage(p));

  // Add chapters
  const chDoc = await PDFDocument.load(chaptersPdfBuffer);
  const chPages = await finalDoc.copyPages(chDoc, chDoc.getPageIndices());
  chPages.forEach(p => finalDoc.addPage(p));

  const finalBytes = await finalDoc.save();
  const outputPath = path.join(__dirname, 'final-year-black-book_project_professional.pdf');
  fs.writeFileSync(outputPath, finalBytes);

  const totalPages = finalDoc.getPageCount();
  console.log(`   ✓ Final PDF saved: ${outputPath}`);
  console.log(`   ✓ Total pages: ${totalPages}`);
  console.log(`\n=== BUILD COMPLETE ===`);

  if (totalPages < 78) {
    console.log(`\n⚠️  Warning: Only ${totalPages} pages generated. Target is 80.`);
  } else {
    console.log(`\n✅ Success! PDF has ${totalPages} pages (target: 80)`);
  }
}

build().catch(err => { console.error('BUILD ERROR:', err); process.exit(1); });
