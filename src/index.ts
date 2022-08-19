import { Readable } from 'stream';
import Parser from '@pixdif/parser';

export default class PdfParser extends Parser {
	open(): Promise<number> {
		throw new Error('Method not implemented.');
	}

	getName(index: number): Promise<string> {
		throw new Error('Method not implemented.');
	}

	getImage(index: number): Promise<Readable> {
		throw new Error('Method not implemented.');
	}
}
