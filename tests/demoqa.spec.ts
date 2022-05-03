import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
    await context.tracing.start({snapshots : true, screenshots: true});
    await page.goto('https://demoqa.com');
  });

test.afterEach(async({page, context}) => {
    await context.tracing.stop({ path: "BasicTrace"});
});


test('Assertion', async ({ page, context }) => {
  await page.locator('text=Elements').click();
  await page.locator('div[class="element-list collapse show"] li[id="item-5"] span[class="text"]').click();
  await page.locator('#unauthorized').click();
  const LinkResponse = page.locator('#linkResponse'); 
  await expect(LinkResponse).toContainText('Link has responded with staus 401');
});

test('FrameTest', async({page, context}) => {
    await page.mouse.down();
    await page.locator('body > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)').click();
    await page.locator('div[class="element-list collapse show"] li[id="item-2"] span[class="text"]').click(); 
    const HeadingText = await page.frameLocator('#frame1').locator("#sampleHeading");
    await expect(HeadingText).toContainText('This is a sample page');
  });