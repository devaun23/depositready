import { chromium, webkit } from 'playwright';

const url = process.argv[2] || 'https://depositready.co/wizard';

async function testBrowser(browserType, name) {
  console.log(`\n📱 Testing ${name}...`);
  const browser = await browserType.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const filename = `.playwright-mcp/test-${name.toLowerCase()}.png`;
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`✅ ${name} screenshot saved: ${filename}`);
  } catch (error) {
    console.error(`❌ ${name} error:`, error.message);
  } finally {
    await browser.close();
  }
}

console.log(`Testing URL: ${url}`);
await Promise.all([
  testBrowser(chromium, 'Chromium'),
  testBrowser(webkit, 'Safari'),
]);
console.log('\n✨ Done! Check .playwright-mcp/ for screenshots');
