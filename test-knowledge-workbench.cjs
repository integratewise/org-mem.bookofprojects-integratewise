const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing Knowledge Workbench...\n');
  
  // Navigate to site
  await page.goto('https://spine-org.pages.dev/', { waitUntil: 'networkidle' });
  
  // Check title
  const title = await page.title();
  console.log(`✓ Title: ${title}`);
  
  // Check for key elements
  const checks = [
    { selector: 'text=IntegrateWise', name: 'IntegrateWise brand' },
    { selector: 'text=One Surface', name: 'One Surface header' },
    { selector: 'text=Governance', name: 'Governance nav' },
    { selector: 'text=Intake', name: 'Intake nav' },
    { selector: 'text=Triage', name: 'Triage nav' },
    { selector: 'text=Internal Docs', name: 'Internal Docs nav' },
    { selector: 'text=Public Docs', name: 'Public Docs nav' },
    { selector: 'text=Operations', name: 'Operations nav' },
    { selector: 'text=Evolution', name: 'Evolution nav' },
    { selector: 'text=All Documents', name: 'All Documents header' },
    { selector: 'text=Locked', name: 'Locked stat' },
    { selector: 'text=Drafted', name: 'Drafted stat' },
    { selector: 'text=In Progress', name: 'In Progress stat' },
    { selector: 'text=Pending', name: 'Pending stat' },
  ];
  
  for (const check of checks) {
    try {
      const element = await page.locator(check.selector).first();
      const isVisible = await element.isVisible();
      if (isVisible) {
        console.log(`✓ ${check.name} — visible`);
      } else {
        console.log(`✗ ${check.name} — not visible`);
      }
    } catch (error) {
      console.log(`✗ ${check.name} — not found`);
    }
  }
  
  // Check for document cards
  const docCards = await page.locator('[style*="border-radius: 12px"]').count();
  console.log(`\n✓ Document cards found: ${docCards}`);
  
  // Take screenshot
  await page.screenshot({ path: '/Users/nirmal/Github/org-mem.bookofprojects-integratewise/test-screenshot.png', fullPage: true });
  console.log('\n✓ Screenshot saved: test-screenshot.png');
  
  await browser.close();
  console.log('\n✓ Test complete');
})();
