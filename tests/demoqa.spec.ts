import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
    await context.tracing.start({snapshots : true, screenshots: true});
    await page.goto('https://demoqa.com');
    viewport: null;
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
    await page.locator("div:nth-child(3) div:nth-child(1) div:nth-child(3) h5:nth-child(1)").click();
    await page.locator("//div[@class='element-list collapse show'] //li[@id='item-2']").click(); 
    const HeadingText = await page.frameLocator('#frame1').locator("#sampleHeading");
    await expect(HeadingText).toContainText('This is a sample page');
    const HeadingText2 = await page.frameLocator('#frame2').locator("#sampleHeading");
    await expect(HeadingText2).toContainText('This is a sample page');
  });

  test('Window Handling', async({page, context})=> {
    await page.mouse.down();
    await page.locator("div:nth-child(3) div:nth-child(1) div:nth-child(3) h5:nth-child(1)").click();
    await page.locator('"Browser Windows"').click();
    const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          await page.click("#tabButton")
      ])
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("sample");
    const WindowMsg =  newPage.locator('#sampleHeading'); 
    await expect(WindowMsg).toContainText('sample');  
  });