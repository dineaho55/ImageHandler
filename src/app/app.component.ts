import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RendererService } from '../app/renderer-service/renderer.service';
import { IImage } from '../app/interfaces/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  htmlCollection: HTMLCollection;
  imageEltRef: SVGImageElement;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imgheight: number;
  imgwidth: number;
  imgradial: number;

  constructor(private rendererService: RendererService) { }

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

  ngAfterViewInit(): void {
    // this.htmlCollection = this.canvas.nativeElement;
  }

  exportImage(): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = '../assets/australie.bmp';
    image.onload = () => {
      context.drawImage(image, 0, 0);

      const a = document.createElement('a');
      a.download = 'australieExported.bmp';
      a.href = canvas.toDataURL('image/bmp');
      a.click();
    };
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  fileChangeEvent(fileInput: any): boolean {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const allowedTypes = ['image/png',
                            'image/jpeg',
                            'application/msword',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'image/jpg',
                            'image/jpeg',
                            'application/pdf',
                            'image/png',
                            'application/vnd.ms-excel',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            ];
      const MAX_HEIGHT = 15200;
      const MAX_WIDTH = 25600;

      if (fileInput.target.files[0].size > MAX_SIZE) {
          this.imageError =
              'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';

          return false;
      }

      if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imgheight = (rs.currentTarget as any)['height'];
          this.imgwidth  = (rs.currentTarget as any)['width'];
          this.imgradial = Math.min(this.imgheight / 2, this.imgwidth / 2) * .82;

          console.log(this.imgwidth, this.imgheight, this.imgradial);

          if (this.imgheight > MAX_HEIGHT && this.imgwidth > MAX_WIDTH) {
            this.imageError =
              'Maximum dimentions allowed ' +
              MAX_HEIGHT +
              '*' +
              MAX_WIDTH +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
