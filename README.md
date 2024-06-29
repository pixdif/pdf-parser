# Pixdif PDF Parser
[![Build Status](https://github.com/pixdif/pdf-parser/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/pixdif/pdf-parser/actions?query=workflow%3ANode.js%20CI+branch%3Amain)
[![Npm Package](https://img.shields.io/npm/v/@pixdif/pdf-parser.svg)](https://npmjs.org/package/@pixdif/pdf-parser)

A PDF parser for [pixdif](https://github.com/pixdif/pixdif) to read PDF files and render each page into an image (PNG format), inspired by [pdf.js](https://github.com/mozilla/pdf.js) and [node-canvas](https://github.com/Automattic/node-canvas).

You can install it as a [pixdif](https://github.com/pixdif/pixdif) plugin, or just use it to convert PDF files into images so that any other frameworks can compare or consume them, such as [Playwright](https://playwright.dev), [WebDriver.IO](https://webdriver.io) or [Allure Report](https://allurereport.org).

## License

[MIT](http://opensource.org/licenses/MIT)

## Installation

```sh
npm install @pixdif/pdf-parser
```

## Example

```ts
import { finished } from 'stream/promises';

const parser = new PdfParser('test/sample/shape.pdf');
await parser.open();

const pageNum = await parser.getPageNum();

for (let i = 0; i < pageNum; i++) {
	const page = await parser.getPage(0);
	console.log(page.getTitle());
	const output = fs.createWriteStream(`output/Page ${i + 1} - ${page.getTitle()}.png`);
	const image = await page.render();
	image.pipe(output);
	await finished(output);
}

await parser.close();
```
