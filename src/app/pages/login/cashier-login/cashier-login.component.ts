import { Component } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-cashier-login',
  standalone: true,
  imports: [],
  templateUrl: './cashier-login.component.html',
  styleUrl: './cashier-login.component.css'
})
export class CashierLoginComponent {
  cashierChange(){
    LoginComponent.isClicked = "admin";
  }
}
