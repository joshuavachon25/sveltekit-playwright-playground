import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

export async function get({url}){
    let code = 200, fileData, erreur
    const uriParams = new URLSearchParams(url.search)
    const pageURL = uriParams.get("url")
    const pause = uriParams.get("pause")

    try {
        const browser = await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        })
        const page = await browser.newPage({
            viewport: {
                width: 1920,
                height: 1080
            }
        });

        await page.goto(pageURL)
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(pause * 1000)
        const data = await page.screenshot({
            type: "png"
        })
        await browser.close()
        fileData = "data:image/png;base64," + data.toString('base64')
        code = 200
    }catch(e)  {
        code = 500
        erreur = e.message
    }

    return{
        status: code,
        body: { image: fileData || erreur}
    }
}


/*(async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example.png` });
    await browser.close();
})();*/