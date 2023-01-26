import fs from 'fs';

import PdfParser from '../src';

describe('Simple PDF File', () => {
	const parser = new PdfParser('test/sample/shape.pdf');

	it('opens a PDF file', async () => {
		await parser.open();
	});

	it('reads number of pages', async () => {
		const pageNum = await parser.getPageNum();
		expect(pageNum).toBe(1);
	});

	it('has no outline', async () => {
		const outline = await parser.getOutline();
		expect(outline).toHaveLength(0);
	});

	it('reads a page', async () => {
		const page = await parser.getPage(0);
		const output = fs.createWriteStream('output/shape.png');
		const image = await page?.getImage();
		image?.pipe(output);
		await new Promise((resolve) => {
			output.once('finish', resolve);
		});
	});

	it('closes a PDF file', async () => {
		await parser.close();
	});
});

describe('PDF Outline', () => {
	const parser = new PdfParser('test/sample/outline.pdf');

	beforeAll(async () => {
		await parser.open();
	});

	afterAll(async () => {
		await parser.close();
	});

	it('reads number of pages', async () => {
		const pageNum = await parser.getPageNum();
		expect(pageNum).toBe(2);
	});

	it('has outline', async () => {
		const outline = await parser.getOutline();
		expect(outline).toHaveLength(2);
		expect(outline).toBeTruthy();
	});
});
