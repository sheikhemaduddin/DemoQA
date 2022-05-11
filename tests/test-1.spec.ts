import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://demoqa.com/
  await page.goto('https://demoqa.com/');

  // Click text=Alerts, Frame & Windows
  await page.locator('text=Alerts, Frame & Windows').click();
  await expect(page).toHaveURL('https://demoqa.com/alertsWindows');

  // Click li:has-text("Modal Dialogs")
  await page.locator('li:has-text("Modal Dialogs")').click();
  await expect(page).toHaveURL('https://demoqa.com/modal-dialogs');

  // Click text=Small modal
  await page.locator('text=Small modal').click();

  // Click text=This is a small modal. It has very less content
  //await page.locator('text=This is a small modal. It has very less content').click();

  // Click #closeSmallModal
  await page.locator('#closeSmallModal').click();

});