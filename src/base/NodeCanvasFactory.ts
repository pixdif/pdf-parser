import type { Canvas } from '@napi-rs/canvas';

export interface NodeCanvas {
	canvas: Canvas;
	context: CanvasRenderingContext2D;
}

export interface NodeCanvasFactory {
	create(width: number, height: number): NodeCanvas;
}
