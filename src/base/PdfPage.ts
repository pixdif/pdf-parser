import type { Readable } from 'stream';
import { Page } from '@pixdif/parser';
import type { PDFPageProxy } from '../util/pdfjs.js';

import NodeCanvasFactory from './NodeCanvasFactory.js';

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

	// eslint-disable-next-line class-methods-use-this
	isCached(): boolean {
		return false;
	}

	async render(): Promise<Readable> {
		const viewport = this.proxy.getViewport({ scale: 2 });
		const cvs = canvasFactory.create(viewport.width, viewport.height);
		const renderContext = {
			canvasContext: cvs.context as unknown as CanvasRenderingContext2D,
			viewport,
			canvasFactory,
		};

		await this.proxy.render(renderContext).promise;
		return cvs.canvas.createPNGStream();
	}
}
