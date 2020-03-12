import { Component } from '@angular/core';

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



  onResized(event: ResizedEvent) {
    this.width = event.newWidth;
    this.height = event.newHeight;
  }
 

  public onDragEnded(event): void {
    this.x = event.source.getFreeDragPosition().x;
    this.y = event.source.getFreeDragPosition().y;
  }

  cutImg() {

    var example = document.getElementById("example") as HTMLCanvasElement,
      ctx = example.getContext('2d');

    var img = document.getElementById("img") as HTMLImageElement;
    var cont = document.getElementById("imgContainer") as HTMLDivElement;
    var ex = document.getElementById("example-boundary") as HTMLDivElement;

    let pic = new Image();

    pic.width = this.width - 20;
    pic.height = this.height - 20;

    let x = -this.x || 0;
    let y = -this.y || 0;

    let left = cont.offsetLeft + 11 - x - ex.offsetLeft -300;
    let top = cont.offsetTop + 11 - y - ex.offsetTop -100;
   
    pic.onload = () => {
      ctx.clearRect(0, 0, 200, 200);
      ctx.drawImage(pic, left, top, pic.width, pic.height);
      this.canvasSrc = example.toDataURL();
    }
    pic.src = img.src;

  }
  

  savePdf() {
    var doc = new jsPDF();
    var example = document.getElementById("example") as HTMLCanvasElement,
      ctx = example.getContext('2d');
    doc.addImage(this.canvasSrc, 'JPEG',  0, 0, 100, 100)
    doc.save('a4.pdf')
  }


  loadImg() {
    this.src = '';
    var inp = document.getElementById("inp") as HTMLInputElement;
    var reader = new FileReader();
    reader.readAsDataURL(inp.files[0]);
    reader.onload = event => {
      this.src = event.target.result.toString()
    }
  }


}
