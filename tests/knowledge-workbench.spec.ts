import { test, expect } from '@playwright/test';

test.describe('Knowledge Workbench', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://spine-org.pages.dev/', { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load the page', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('IntegrateWise');
  });

  test('should display sidebar navigation', async ({ page }) => {
    // Check for surface navigation buttons using exact text
    await expect(page.getByRole('button', { name: '📋 Governance 95 documents' })).toBeVisible();
    await expect(page.getByRole('button', { name: '📥 Intake Folder Monitor' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🤖 Triage Notebook LLM' })).toBeVisible();
    await expect(page.getByRole('button', { name: '📄 Internal Docs Team knowledge' })).toBeVisible();
    await expect(page.getByRole('button', { name: '🌐 Public Docs External users' })).toBeVisible();
    await expect(page.getByRole('button', { name: '⚙️ Operations KPIs & systems' })).toBeVisible();
    await expect(page.getByRole('button', { name: '📈 Evolution Timeline' })).toBeVisible();
  });

  test('should display governance stats', async ({ page }) => {
    // Check for stat cards
    await expect(page.getByText('Locked', { exact: true })).toBeVisible();
    await expect(page.getByText('Drafted', { exact: true })).toBeVisible();
    await expect(page.getByText('In Progress', { exact: true })).toBeVisible();
    await expect(page.getByText('Pending', { exact: true })).toBeVisible();
  });

  test('should display document cards', async ({ page }) => {
    // Check for document cards
    const cards = page.locator('[style*="border-radius: 12px"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to intake view', async ({ page }) => {
    await page.getByRole('button', { name: '📥 Intake Folder Monitor' }).click();
    await expect(page.getByText('Intake from Downloads')).toBeVisible();
  });

  test('should navigate to triage view', async ({ page }) => {
    await page.getByRole('button', { name: '🤖 Triage Notebook LLM' }).click();
    await expect(page.getByText('Triage Queue — Notebook LLM')).toBeVisible();
  });

  test('should navigate to internal docs view', async ({ page }) => {
    await page.getByRole('button', { name: '📄 Internal Docs Team knowledge' }).click();
    await expect(page.getByText('Architecture & Engineering')).toBeVisible();
  });

  test('should navigate to public docs view', async ({ page }) => {
    await page.getByRole('button', { name: '🌐 Public Docs External users' }).click();
    await expect(page.getByText('Sanitized subset for external users')).toBeVisible();
  });

  test('should navigate to operations view', async ({ page }) => {
    await page.getByRole('button', { name: '⚙️ Operations KPIs & systems' }).click();
    await expect(page.getByText('Connected systems, KPIs, execution status')).toBeVisible();
  });

  test('should navigate to evolution view', async ({ page }) => {
    await page.getByRole('button', { name: '📈 Evolution Timeline' }).click();
    await expect(page.getByText('Continuity manifest showing how IntegrateWise evolved')).toBeVisible();
  });

  test('should display connected surfaces', async ({ page }) => {
    await expect(page.getByRole('link', { name: '📁 Folder Monitor local' })).toBeVisible();
    await expect(page.getByRole('link', { name: '🧠 Spine (Supabase) live' })).toBeVisible();
  });

  test('should open document detail panel', async ({ page }) => {
    // Wait for document cards to load
    await page.waitForSelector('h4', { timeout: 10000 });
    
    // Click on the first document card (Product Overview) - use h4 selector
    await page.locator('h4:text("Product Overview")').click();
    
    // Wait for detail panel to appear
    await page.waitForTimeout(1000);
    
    // Check detail panel is visible (using text content)
    await expect(page.getByText('Content', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible();
  });

  test('should search documents', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search..."]');
    await searchInput.fill('Product');
    
    // Check that search results are filtered
    const cards = page.locator('[style*="border-radius: 12px"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
