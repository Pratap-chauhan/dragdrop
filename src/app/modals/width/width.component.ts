import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-width',
  templateUrl: './width.component.html',
  styleUrls: ['./width.component.css']
})
export class WidthComponent implements OnInit {

  food: string;

  constructor(
    public dialogRef: MatDialogRef<WidthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close({
      food: this.food
    });
  }

}
