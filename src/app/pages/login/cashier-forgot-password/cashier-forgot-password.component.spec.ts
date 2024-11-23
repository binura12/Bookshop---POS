import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierForgotPasswordComponent } from './cashier-forgot-password.component';

describe('CashierForgotPasswordComponent', () => {
  let component: CashierForgotPasswordComponent;
  let fixture: ComponentFixture<CashierForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierForgotPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
