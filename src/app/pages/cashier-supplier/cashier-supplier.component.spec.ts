import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierSupplierComponent } from './cashier-supplier.component';

describe('CashierSupplierComponent', () => {
  let component: CashierSupplierComponent;
  let fixture: ComponentFixture<CashierSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierSupplierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
