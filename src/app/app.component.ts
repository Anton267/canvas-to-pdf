import { Component, HostListener, ViewChild } from '@angular/core';

import { ResizedEvent } from 'angular-resize-event';

import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  width: number;
  height: number;
  x: number;
  y: number;

  src: string;
  canvasSrc: string;

  @ViewChild('canvas', { static: true }) canvas;
  @ViewChild('container', { static: true }) container;

  onResized(event: ResizedEvent) {
    this.width = event.newWidth;
    this.height = event.newHeight;
    this.clearCanvas();
  }

  onDragEnded(event): void {
    this.x = event.source.getFreeDragPosition().x;
    this.y = event.source.getFreeDragPosition().y;
  }

  onDragStart(): void {
    this.clearCanvas();
  }

  cutImg() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    let img = document.getElementById("img") as HTMLImageElement;
    let imgContainer = document.getElementById("imgContainer") as HTMLDivElement;

    let pic = new Image();

    pic.width = this.width - 20;
    pic.height = this.height - 20;

    let x = -this.x || 0;
    let y = -this.y || 0;

    let left = imgContainer.offsetLeft + 5 - x - this.container.nativeElement.offsetLeft - 300;
    let top = imgContainer.offsetTop + 5 - y - this.container.nativeElement.offsetTop - 100;

    pic.onload = () => {
      ctx.clearRect(0, 0, 200, 200);
      ctx.drawImage(pic, left, top, pic.width, pic.height);
      this.canvasSrc = this.canvas.nativeElement.toDataURL();
      this.savePdf()
    }
    pic.src = img.src;
  }

  @HostListener('dragenter') dragenter() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.container.nativeElement.addEventListener(eventName, this.preventDefaults, false)
    })
  }

  loadImg(event) {
    let reader = new FileReader();

    if (event.type == 'drop') {
      let dt = event.dataTransfer
      reader.readAsDataURL(dt.files[0]);
    } else {
      let inp = document.getElementById("inp") as HTMLInputElement;
      reader.readAsDataURL(inp.files[0]);
    }
    reader.onload = event => {
      this.src = event.target.result.toString()
    }
    this.src = '';
    this.clearCanvas();
  }

  private clearCanvas() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    this.canvasSrc = '';
    ctx.clearRect(0, 0, 200, 200);
  }

  private savePdf() {
    let doc = new jsPDF();
    doc.addImage(this.canvasSrc, 'JPEG', 0, 0, 100, 100)
    doc.save('img.pdf')
  }

  private preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }


}
