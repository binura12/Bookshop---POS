import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cashier-login',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cashier-login.component.html',
  styleUrl: './cashier-login.component.css'
})
export class CashierLoginComponent {
  isPswLblVisible:boolean = false;
  isEmailLblVisible:boolean = false;
}
