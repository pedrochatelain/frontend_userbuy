import { Component, inject } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';

@Component({
  selector: 'app-dialog-deposit-money',
  imports: [
    MatDialogTitle,
    MatDialogContent, 
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-deposit-money.component.html',
  styleUrl: './dialog-deposit-money.component.css'
})
export class DialogDepositMoneyComponent {
  data = inject(MAT_DIALOG_DATA);
  deposit:number | null = null
  userId: string | null = null;
  readonly dialogRef = inject(MatDialogRef<DialogDepositMoneyComponent>);

  constructor(private userService: UserService, private snackbarService: SnackbarService) {}

  ngOnInit():void {
    this.userId = this.data.id_user;
  }
  
  depositMoney(): void {
    this.userService.updatingDeposit.emit(true);
    this.dialogRef.close();
    this.userService.depositMoney(this.userId!, this.deposit!).subscribe({
      next: (response) => {
        this.userService.depositAdded.emit(response.response.balances);
        this.snackbarService.displaySuccess("Deposit successfully made")
        this.userService.updatingDeposit.emit(false);
      },
      error: (error) => {
        this.snackbarService.displayError(error.error.error)
        this.userService.updatingDeposit.emit(false);
      },
    });
  }

  onEnter(input: HTMLInputElement) {
    input.blur(); // Remove focus to hide the keyboard
  }

}