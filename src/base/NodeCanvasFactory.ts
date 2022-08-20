/* eslint-disable class-methods-use-this, no-param-reassign */

import cvs from 'canvas';

interface NodeCanvas {
	canvas: cvs.Canvas;
	context: cvs.CanvasRenderingContext2D;
}

export default class NodeCanvasFactory {
	create(width: number, height: number): NodeCanvas {
		const canvas = cvs.createCanvas(width, height);
		const context = canvas.getContext('2d');
		return {
			canvas,
			context,
		};
	}

	reset(canvasContext: NodeCanvas, width: number, height: number): void {
		const { canvas } = canvasContext;
		canvas.width = width;
		canvas.height = height;
	}

	destroy(cvs: NodeCanvas): void {
		cvs.canvas.width = 0;
		cvs.canvas.height = 0;
	}
}
