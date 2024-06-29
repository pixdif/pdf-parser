import { Outline, type OutlineProperties } from '@pixdif/parser';
import type { PDFDocumentProxy } from '../util/pdfjs.js';

import PdfPage from './PdfPage.js';

export interface PdfOutlineProperties extends OutlineProperties {
	title: string;
	offset: number;
	limit: number;
}

export default class PdfOutline extends Outline {
	protected readonly document: PDFDocumentProxy;

	protected readonly offset: number;

	protected readonly limit: number;

	constructor(document: PDFDocumentProxy, props: PdfOutlineProperties) {
		super(props.title, props);
		this.document = document;
		this.offset = props.offset;
		this.limit = props.limit;
	}

	async getPageNum(): Promise<number> {
		return this.limit - this.offset;
	}

	async getPage(index: number): Promise<PdfPage> {
		const pageIndex = this.offset + index;
		const page = await this.document.getPage(pageIndex);
		return new PdfPage(`Page ${pageIndex}`, page);
	}
}
