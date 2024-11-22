import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierItemsComponent } from './cashier-items.component';

describe('CashierItemsComponent', () => {
  let component: CashierItemsComponent;
  let fixture: ComponentFixture<CashierItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
