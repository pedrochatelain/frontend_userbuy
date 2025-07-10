import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-image-modal',
  imports: [ MatIcon ],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})
export class ImageModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
    private dialog: MatDialog
  
  ) {}

  closeDialog() {
    this.dialog.closeAll()
  }

}
