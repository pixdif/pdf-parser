import { Parser, Outline } from '@pixdif/parser';

import PdfOutline from './base/PdfOutline.js';
import PdfPage from './base/PdfPage.js';
import {
	getDocument,
	type PDFDocumentProxy,
} from './util/pdfjs.js';

interface RawOutline {
	title: string;
	dest: string | unknown[] | null;
	count?: number;
	items?: RawOutline[];
}

export default class PdfParser extends Parser {
	protected document?: PDFDocumentProxy;

	protected override async openFile(): Promise<void> {
		if (!this.document) {
			this.document = await getDocument(this.filePath).promise;
		}
	}

	protected override async closeFile(): Promise<void> {
		if (!this.document) {
			throw new Error('The PDF document is not open yet.');
		}
		await this.document.cleanup(false);
		await this.document.destroy();
		delete this.document;
	}

	override async getPageNum(): Promise<number> {
		if (this.document) {
			return this.document.numPages;
		}
		return 0;
	}

	override async getPage(index: number): Promise<PdfPage> {
		if (!this.document) {
			throw new Error('The PDF file is not open yet.');
		}
		if (index < 0 || index >= await this.getPageNum()) {
			throw new Error(`Invalid page index: ${index}`);
		}
		const pageIndex = index + 1;
		const page = await this.document.getPage(pageIndex);
		return new PdfPage(`Page ${pageIndex}`, page);
	}

	override async getOutline(): Promise<Outline[]> {
		const outline = await this.document?.getOutline();
		if (!outline) {
			return [];
		}
		return outline.map(this.wrapOutline);
	}

	private wrapOutline = ({
		title,
		items,
	}: RawOutline): PdfOutline => {
		const children = items?.length > 0 ? items.map(this.wrapOutline) : undefined;
		return new PdfOutline(this.document, {
			title,
			children,
			offset: 0,
			limit: 0,
		});
	};
}
