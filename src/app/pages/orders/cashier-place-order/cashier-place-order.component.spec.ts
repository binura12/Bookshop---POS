import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierPlaceOrderComponent } from './cashier-place-order.component';

describe('CashierPlaceOrderComponent', () => {
  let component: CashierPlaceOrderComponent;
  let fixture: ComponentFixture<CashierPlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierPlaceOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierPlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
