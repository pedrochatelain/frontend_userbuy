import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorAddingProductComponent } from './dialog-error-adding-product.component';

describe('DialogErrorAddingProductComponent', () => {
  let component: DialogErrorAddingProductComponent;
  let fixture: ComponentFixture<DialogErrorAddingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogErrorAddingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogErrorAddingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
