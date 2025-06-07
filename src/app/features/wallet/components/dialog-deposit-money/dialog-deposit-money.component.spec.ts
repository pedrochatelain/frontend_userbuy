import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepositMoneyComponent } from './dialog-deposit-money.component';

describe('DialogDepositMoneyComponent', () => {
  let component: DialogDepositMoneyComponent;
  let fixture: ComponentFixture<DialogDepositMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDepositMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDepositMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
