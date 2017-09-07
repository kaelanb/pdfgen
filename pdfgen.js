'use strict';

const puppeteer = require('puppeteer');

var link = process.argv[2];
var fname = process.argv[3];
console.log(link);

(async() => {

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(link, {waitUntil: 'networkidle'});

await page.pdf({
  path: fname + '.pdf',
  format: 'letter'
});

browser.close();

})();