import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierNavBarComponent } from './cashier-nav-bar.component';

describe('CashierNavBarComponent', () => {
  let component: CashierNavBarComponent;
  let fixture: ComponentFixture<CashierNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
