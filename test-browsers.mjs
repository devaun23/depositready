import { chromium, webkit } from 'playwright';

const baseUrl = process.argv[2] || 'http://localhost:3000';

async function testMobileBrowser(browserType, name) {
  console.log(`\n📱 Testing ${name} (mobile)...`);
  const browser = await browserType.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page = await context.newPage();

  try {
    // Test 1: Landing page - Check My Deadline button visibility
    console.log(`  Testing landing page...`);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const mobileCtaVisible = await page.locator('div.fixed.bottom-0 button:has-text("Check My Deadline")').isVisible();
    console.log(`  ✅ Mobile CTA visible: ${mobileCtaVisible}`);

    await page.screenshot({ path: `.playwright-mcp/test-${name.toLowerCase()}-landing.png` });

    // Test 2: Wizard page - Mobile button and phone fields
    console.log(`  Testing wizard...`);
    await page.goto(`${baseUrl}/florida/wizard`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check mobile Check Deadline button in wizard
    const wizardMobileBtn = await page.locator('div.fixed.bottom-0 button:has-text("Check My Deadline")').isVisible();
    console.log(`  ✅ Wizard mobile CTA visible: ${wizardMobileBtn}`);

    await page.screenshot({ path: `.playwright-mcp/test-${name.toLowerCase()}-wizard.png`, fullPage: true });

    console.log(`✅ ${name} mobile tests passed`);
  } catch (error) {
    console.error(`❌ ${name} error:`, error.message);
    await page.screenshot({ path: `.playwright-mcp/test-${name.toLowerCase()}-error.png` });
  } finally {
    await browser.close();
  }
}

console.log(`Testing URL: ${baseUrl}`);
console.log('Running mobile browser tests...\n');

await Promise.all([
  testMobileBrowser(chromium, 'Chromium'),
  testMobileBrowser(webkit, 'Safari'),
]);

console.log('\n✨ Done! Check .playwright-mcp/ for screenshots');
