import { Readable } from 'stream';
import { Page } from '@pixdif/parser';
import type { PDFDocumentProxy, PDFPageProxy } from '../util/pdfjs.js';
import type { NodeCanvasFactory } from './NodeCanvasFactory.js';

export default class PdfPage extends Page {
	constructor(
		protected readonly document: PDFDocumentProxy,
		protected readonly title: string,
		protected readonly proxy: PDFPageProxy,
	) {
		super();
	}

	getTitle(): string {
		return this.title;
	}

	isCached(): boolean {
		return false;
	}

	async render(): Promise<Readable> {
		const canvasFactory = this.document.canvasFactory as NodeCanvasFactory;
		const viewport = this.proxy.getViewport({ scale: 2 });
		const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
		const renderContext = {
			canvasContext: context,
			viewport,
		};
		await this.proxy.render(renderContext).promise;
		return Readable.fromWeb(canvas.encodeStream('png'));
	}
}
