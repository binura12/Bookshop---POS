import { Component } from '@angular/core';
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { CashierLoginComponent } from "./cashier-login/cashier-login.component";
import { CommonModule } from '@angular/common';
import { SignupComponent } from "../signup/signup.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AdminLoginComponent, CashierLoginComponent, CommonModule, SignupComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
}
