'use strict';

const puppeteer = require('puppeteer');
const process = require('process');
const userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112 Safari/537.36';

async function search(...args) {

    var blockRequests = ['Image','Other','Font'];
    let browserArgs = [
        '--incognito',
        '--disable-2d-canvas-clip-aa',
        '--disable-databases',
        '--disable-new-profile-management',
        '--user-agent="${userAgent}"',
        '--disable-pepper-3d',
        '--window-size=1440,900'
    ]
    if(args[2]) { browserArgs.push(`--proxy-server=${args[2]}`) }

    const browser = await puppeteer.launch({ args: browserArgs });
    const page = await browser.newPage();

    page.on('console', (...args) => console.log(...args));
    await page.setRequestInterceptionEnabled(true);
    page.on('request', request => {
        if (blockRequests.includes(request.resourceType)) {
            request.abort();
        } else {
            request.continue();
        }
    });

    const g_url = `https://www.google.com/search?q=${args[0]}&num=100&start=0`
    await page.goto(g_url, {waitUntil: 'networkidle'});
    await page.waitForSelector('#search h3 a');

    /** Evaluate page and get search results **/
    const links = await page.evaluate(require('./evaluate'))

    /** filter for url, but, this can be any type of string **/
    const containsUrl = links.filter( v => {
        if(v.url.includes(args[1])) {
            return v
        } else {
            return null
        }
    })

    browser.close();
    return containsUrl
};

module.exports = search
