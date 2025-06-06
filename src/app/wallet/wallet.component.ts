import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet',
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

  balances = ""

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit():void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchBalances()
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

}
