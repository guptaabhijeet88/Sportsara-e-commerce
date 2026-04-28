const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const SCREENS = [
  { name: '01_home', url: 'http://localhost:3000/', title: 'Home Screen', wait: 4000 },
  { name: '02_shop', url: 'http://localhost:3000/shop', title: 'Shop Screen', wait: 4000 },
  { name: '03_login', url: 'http://localhost:3000/login', title: 'Login Screen', wait: 2000 },
  { name: '04_register', url: 'http://localhost:3000/register', title: 'Register Screen', wait: 2000 },
  { name: '05_forgot', url: 'http://localhost:3000/forgot-password', title: 'Forgot Password', wait: 2000 },
  { name: '06_cart', url: 'http://localhost:3000/cart', title: 'Cart Screen', wait: 2000 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1366, height: 768 } });
  const page = await browser.newPage();

  for (const s of SCREENS) {
    console.log(`Capturing: ${s.title}...`);
    await page.goto(s.url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    await new Promise(r => setTimeout(r, s.wait));
    await page.screenshot({ path: path.join(dir, `${s.name}.png`), fullPage: false });
  }

  // Product detail
  try {
    await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 3000));
    const link = await page.evaluate(() => {
      const a = document.querySelectorAll('a[href*="/product/"]');
      return a.length > 0 ? a[0].href : null;
    });
    if (link) {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000));
      await page.screenshot({ path: path.join(dir, '07_product_detail.png'), fullPage: false });
      console.log('Captured: Product Detail');
    }
  } catch (e) { console.log('Skip product:', e.message); }

  console.log('All screenshots done!');
  await browser.close();
})();
