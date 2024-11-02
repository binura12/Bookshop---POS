import { Component } from '@angular/core';
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { CashierLoginComponent } from "./cashier-login/cashier-login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AdminLoginComponent, CashierLoginComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  static isClicked: string;

  get isAdmin(){
    return LoginComponent.isClicked === 'admin';
  }

  get isCashier(){
    return LoginComponent.isClicked === 'cashier';
  }
}
