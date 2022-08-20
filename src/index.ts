import { Readable } from 'stream';
import Parser from '@pixdif/parser';
import {
	getDocument,
	PDFDocumentProxy,
	PDFPageProxy,
} from './util/pdfjs';

import NodeCanvasFactory from './base/NodeCanvasFactory';

const canvasFactory = new NodeCanvasFactory();

async function convertPdfPage(page: PDFPageProxy): Promise<Readable> {
	const viewport = page.getViewport({ scale: 2 });
	const cvs = canvasFactory.create(viewport.width, viewport.height);
	const renderContext = {
		canvasContext: cvs.context,
		viewport,
		canvasFactory,
	};

	await page.render(renderContext).promise;
	return cvs.canvas.createPNGStream();
}

export default class PdfParser extends Parser {
	protected document?: PDFDocumentProxy;

	async open(): Promise<number> {
		if (!this.document) {
			this.document = await getDocument(this.filePath).promise;
		}
		return this.document.numPages;
	}

	async getName(index: number): Promise<string> {
		if (!this.document) {
			throw new Error('The PDF document is not open yet.');
		}
		return String(index);
	}

	async getImage(index: number): Promise<Readable> {
		if (!this.document) {
			throw new Error('The PDF document is not open yet.');
		}
		const page = await this.document.getPage(index);
		const image = await convertPdfPage(page);
		return image;
	}
}
