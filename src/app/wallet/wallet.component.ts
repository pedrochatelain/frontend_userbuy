import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wallet',
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit():void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
