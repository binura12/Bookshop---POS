import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierReturnedOrdersComponent } from './cashier-returned-orders.component';

describe('CashierReturnedOrdersComponent', () => {
  let component: CashierReturnedOrdersComponent;
  let fixture: ComponentFixture<CashierReturnedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierReturnedOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierReturnedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
