import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DialogDepositMoneyComponent } from '../dialog-deposit-money/dialog-deposit-money.component';
import { MatDialog } from '@angular/material/dialog';
import { ScreenService } from '../../../../shared/services/screen.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-wallet',
  imports: [ MatButtonModule, CommonModule, MatProgressSpinner ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  balances = ""
  dialog = inject(MatDialog);
  isMobile = false
  loading = false

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private userService: UserService, private screenService: ScreenService) {}

  ngOnInit():void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchBalances()
    // Listen for productAdded events
    this.userService.depositAdded.subscribe((deposit: any) => {
      console.log("deposit", deposit)
      this.balances = deposit; // Add new product to the list
    });
    
    this.screenService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  fetchBalances(): void {
    this.loading = true
    let idUser = this.route.snapshot.paramMap.get('id_user');
    this.userService.getBalances(idUser!).subscribe({
      next: (response) => {
        if ( ! response.balances)
          this.balances = '0';
        else
          this.balances = response.balances
        this.loading = false
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.balances = error;
        this.loading = false
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
