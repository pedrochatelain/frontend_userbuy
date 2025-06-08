import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DialogDepositMoneyComponent } from '../dialog-deposit-money/dialog-deposit-money.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet',
  imports: [ MatButtonModule, CommonModule ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  balances = ""
  dialog = inject(MatDialog);

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit():void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchBalances()
    // Listen for productAdded events
    this.userService.depositAdded.subscribe((deposit: any) => {
      console.log("deposit", deposit)
      this.balances = deposit; // Add new product to the list
    });
  }

  fetchBalances(): void {
    let idUser = this.route.snapshot.paramMap.get('id_user');
    this.userService.getBalances(idUser!).subscribe({
      next: (response) => {
        this.balances = response.balances;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.balances = error;
      }
    });
  }

  openDialog() {
    let userId = this.route.snapshot.paramMap.get('id_user');
    this.dialog.open(DialogDepositMoneyComponent, {
      data: { id_user: userId }
    });
  }

}
