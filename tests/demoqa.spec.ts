import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
    await context.tracing.start({snapshots : true, screenshots: true});
    await page.goto('https://demoqa.com');
  });

test.afterEach(async({page, context}) => {
    await context.tracing.stop({ path: "BasicTrace"});
});

test('Assertion', async ({ page, context }) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.locator('text=Elements').click();
  await page.locator('div[class="element-list collapse show"] li[id="item-5"] span[class="text"]').click();
  await page.locator('#unauthorized').click();
  const LinkResponse = page.locator('#linkResponse'); 
  await expect(LinkResponse).toContainText('Link has responded with staus 401');
});


test('FrameTest', async({page, context}) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('text=Alerts, Frame & Windows').click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('div[class="element-list collapse show"] li[id="item-2"] span[class="text"]').click(); 
    const HeadingText = await page.frameLocator('#frame1').locator("#sampleHeading");
    await expect(HeadingText).toContainText('This is a sample page');
    const HeadingText2 = await page.frameLocator('#frame2').locator("#sampleHeading");
    await expect(HeadingText2).toContainText('This is a sample page');
  });

  test('Window Handling', async({page, context})=> {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('text=Alerts, Frame & Windows').click();
    await page.locator("div[class='element-list collapse show'] li[id='item-0'] span[class='text']").click();
    const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          await page.click("#tabButton")
      ])
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain("sample");
    const TabMsg =  newPage.locator('#sampleHeading'); 
    await expect(TabMsg).toContainText('sample');  

    await page.bringToFront();
    const Heading = page.locator(".main-header");
    await expect(Heading).toContainText("Browser Windows");

    const [windowPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#windowButton")
    ])

    await windowPage.waitForLoadState();
    expect(windowPage.url()).toContain("sample");
    const WindowMsg =  windowPage.locator('#sampleHeading'); 
    await expect(WindowMsg).toContainText('sample'); 
    await windowPage.close();
    
    const [windowMsgPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#messageWindowButton")
    ])

    await windowPage.waitForLoadState();
  });


  test.skip('NestedFrames', async({page, context}) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('text=Alerts, Frame & Windows').click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('div[class="element-list collapse show"] li[id="item-3"] span[class="text"]').click(); 
    const HeadingText = await page.frameLocator('#frame1').locator("#sampleHeading");
    await expect(HeadingText).toContainText('This is a sample page');
    const HeadingText2 = await page.frameLocator('#frame2').locator("#sampleHeading");
    await expect(HeadingText2).toContainText('This is a sample page');
     
  });

  test('Handling Dialog', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('text=Alerts, Frame & Windows').click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('div[class="element-list collapse show"] li[id="item-4"] span[class="text"]').click(); 
    await page.locator('#showSmallModal').click();
    const DialogMsg = await page.locator('modal-body');
    await expect(page.locator('text=Small Modal')).toBeVisible();
    await expect(DialogMsg).toContainText('This is a small modal.');
  });

  
 

