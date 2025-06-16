import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-error-adding-product',
imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './dialog-error-adding-product.component.html',
  styleUrl: './dialog-error-adding-product.component.css'
})
export class DialogErrorAddingProductComponent {
  data = inject(MAT_DIALOG_DATA);
  error: any;
  errorName: string = ""
  errorCategory: string = ""
  readonly dialogRef = inject(MatDialogRef<DialogErrorAddingProductComponent>);

  ngOnInit():void {
    this.error = this.data.error;
    this.errorName = this.error.error.issues?.name;
    this.errorCategory = this.error.error.issues?.category;

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
