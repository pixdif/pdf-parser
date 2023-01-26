import { Readable } from 'stream';
import { Page } from '@pixdif/parser';
import { PDFPageProxy } from 'pdfjs-dist';

import NodeCanvasFactory from './NodeCanvasFactory';

const canvasFactory = new NodeCanvasFactory();

export default class PdfPage extends Page {
	protected readonly title: string;

	protected readonly proxy: PDFPageProxy;

	constructor(title: string, proxy: PDFPageProxy) {
		super();
		this.title = title;
		this.proxy = proxy;
	}

	getTitle(): string {
		return this.title;
	}

	async getImage(): Promise<Readable> {
		const viewport = this.proxy.getViewport({ scale: 2 });
		const cvs = canvasFactory.create(viewport.width, viewport.height);
		const renderContext = {
			canvasContext: cvs.context,
			viewport,
			canvasFactory,
		};

		await this.proxy.render(renderContext).promise;
		return cvs.canvas.createPNGStream();
	}
}
