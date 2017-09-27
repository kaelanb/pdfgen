#! /usr/local/bin/node

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

const url = process.argv[2];
const fname = process.argv[3];

if(url === undefined || fname === undefined){
   console.log("Incorrect usage/format. Correct format is:\n npm run pdfgen https://www.google.com <filename>");
   process.exit(1);
}

const dir = './pdfs';

if(!fs.existsSync(dir)){
   console.log(`Creating folder ${dir}...`);
   fs.mkdirSync(dir);
   console.log('Done');
}

console.log("generating pdf for " + url);

(async() => {

   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(url, {waitUntil: 'networkidle'});
   await page.pdf({
	  	path: 'pdfs/' + fname + '.pdf',
	 	format: 'letter'
   });
   console.log(fname + ".pdf has been created inside folder:" + dir);

browser.close();

})();
