import { Component, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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

  constructor(private userService: UserService, private snackbar: MatSnackBar) {}

  ngOnInit():void {
    this.userId = this.data.id_user;
  }
  
  depositMoney(): void {
    this.userService.depositMoney(this.userId!, this.deposit!).subscribe({
      next: (response) => {
        this.userService.depositAdded.emit(response.response.balances);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        this.snackbar.open("Deposit successfully made", "Close", config)
      },
      error: (error) => {
        console.error('Error:', error);
        
      },
    });
  }

  onEnter(input: HTMLInputElement) {
    input.blur(); // Remove focus to hide the keyboard
  }

}