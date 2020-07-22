import { Component , HostListener} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WidthComponent } from './modals/width/width.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dragdrop';
  activeId = null;
  height: number;
  width: number;
  boxes = [];
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (this.activeId) {
      this.changePosition(event.key.toLowerCase());
    }
  }
  constructor(public dialog: MatDialog) {

  }
  boxClick(id) {
    if (this.activeId) {
      const lastBoxData = this.boxes.find((item) => item.id === this.activeId);
      lastBoxData.background = 'white';
    }
    const boxData = this.boxes.find((item) => item.id === id);
    boxData.background = 'yellow';
    this.activeId = id;
  }
  changePosition(key) {
    const boxData = this.boxes.find((item) => item.id === this.activeId);
    const {height , width} = boxData.dimension;
    const {boxheight , boxwidth} = this.splitBoxDimension(height, width);
    switch (key) {
      case 'a':
        if (boxData.position.x - 50 < 0) {
          break;
        }
        boxData.position = { x: boxData.position.x - 50, y: boxData.position.y };
        break;
      case 'd':
        if (boxData.position.x + 50 > 700 - Number(boxwidth)) {
          break;
        }
        boxData.position = { x: boxData.position.x + 50, y: boxData.position.y };
        break;
      case 'w':
        if (boxData.position.y - 50 < 0) {
          break;
        }
        boxData.position = { x: boxData.position.x, y: boxData.position.y - 50 };
        break;
      case 's':
        if (boxData.position.y + 50 > 600 - Number(boxheight)) {
          break;
        }
        boxData.position = { x: boxData.position.x, y: boxData.position.y + 50 };
        break;
      case 'backspace':
        this.deleteBox();
        break;
      case 'delete' :
        this.deleteBox();
        break;
    }
  }
  splitBoxDimension(height , width) {
    const boxheight = height.split('p')[0];
    const boxwidth = width.split('p')[0];
    return {boxheight , boxwidth};
  }
  deleteBox() {
    const boxIndex = this.boxes.findIndex((item) => item.id === this.activeId);
    this.boxes.splice(boxIndex , 1);
    this.activeId = null;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(WidthComponent, {
      width: '500px',
      data: {height : this.height , width : this.width}
    });
    dialogRef.afterClosed().subscribe(result => {
      const { height , width } = result;
      this.generateBox(height , width);
    });
  }
  generateBox(height , width) {
    const id = this.boxes.length + 1;
    this.boxes.push({
      id,
      name: 'I can only be dragged up/down',
      status: true,
      position: {
        x: 0, y: 0
      },
      background : 'white',
      dimension : {
        height : `${height}px`,
        width : `${width}px`
      }
    });
  }
}
