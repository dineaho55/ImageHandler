import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { IImage } from '../interfaces/interfaces';
import { SVG_NAMESPACE, DRAWING_AREA_SELECTOR } from '../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class RendererService {
  private renderer: Renderer2;
  private drawingElement: SVGElement;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
   }

  addDrawing(drawing: IImage): SVGElement {
    let drawingRef: SVGElement;
    if (drawing.svgType === 'image') {
      drawingRef = this.createImage() as SVGImageElement;
      this.appendSVG(drawingRef);
      this.setImageAttributes(drawing);
    } else  {
      drawingRef = this.createDrawing();
      this.appendSVG(drawingRef);
      // this.setDrawingAttributes(drawingAttributes);
    }

    return drawingRef;
  }

  createImage(): SVGImageElement {
    this.drawingElement = this.renderer.createElement('image', SVG_NAMESPACE) as SVGImageElement;
    return this.drawingElement as SVGImageElement;
  }

  createDrawing(): SVGElement {
    return;
  }

  private appendSVG(child: SVGElement): void {
    this.renderer.appendChild(this.renderer.selectRootElement(DRAWING_AREA_SELECTOR, true), child);
  }

  private setImageAttributes(svgImage: IImage): void {
    this.renderer.setAttribute(this.drawingElement, 'id', svgImage.id.toString());
    this.renderer.setAttribute(this.drawingElement, 'href', svgImage.href.toString());
    this.renderer.setAttribute(this.drawingElement, 'x', svgImage.x.toString());
    this.renderer.setAttribute(this.drawingElement, 'y', svgImage.y.toString());
    // this.renderer.setAttribute(this.drawingElement, 'height', svgImage.height.toString());
    // this.renderer.setAttribute(this.drawingElement, 'width', svgImage.width.toString());
    this.renderer.setAttribute(this.drawingElement, 'decoding', svgImage.decoding.toString());
    this.renderer.setAttribute(this.drawingElement, 'preserveAspectRatio', svgImage.preserveAspectRatio.toString());
  }

}
