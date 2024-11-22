import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierOrderHistoryComponent } from './cashier-order-history.component';

describe('CashierOrderHistoryComponent', () => {
  let component: CashierOrderHistoryComponent;
  let fixture: ComponentFixture<CashierOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierOrderHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
