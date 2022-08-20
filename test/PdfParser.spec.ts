import fs from 'fs';

import PdfParser from '../src';

const parser = new PdfParser('test/sample/shape.pdf');

it('opens a PDF file', async () => {
	const pageNum = await parser.open();
	expect(pageNum).toBe(1);
});

it('reads a page', async () => {
	expect(await parser.getName(1)).toBe('1');
	const page = await parser.getImage(1);
	const output = fs.createWriteStream('output/shape.png');
	page.pipe(output);

	await new Promise((resolve) => {
		output.once('finish', resolve);
	});
});

it('closes a PDF file', async () => {
	await parser.close();
});
