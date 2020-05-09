import { Component } from '@angular/core';
import { RendererService } from '../app/renderer-service/renderer.service';
import { IImage } from '../app/interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-handler';
  imageEltRef: SVGImageElement;

  constructor(private rendererService: RendererService) {

  }


  addImage(): void {
    const imageTest: IImage = {
      id: 'image',
      svgType: 'image',
      href: '../assets/australie.bmp',
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      decoding: 'auto',
      preserveAspectRatio: 'none'

    };
    this.imageEltRef = this.rendererService.addDrawing(imageTest) as SVGImageElement;
    /* this.imageEltRef.setAttribute('id', 'image');
    this.imageEltRef.setAttribute('x', '100');
    this.imageEltRef.setAttribute('y', '100');
    this.imageEltRef.setAttribute('href', '../../../assets/australie-2.svg');
    // this.imageEltRef.setAttribute('width', '200');
    // this.imageEltRef.setAttribute('height', '200');
    // this.imageEltRef.setAttribute('stroke-width', '10');
    // this.imageEltRef.setAttribute('stroke', 'green');
    this.imageEltRef.setAttribute('decoding', 'auto');
    this.imageEltRef.setAttribute('preserveAspectRatio', 'none'); */
  }
}
