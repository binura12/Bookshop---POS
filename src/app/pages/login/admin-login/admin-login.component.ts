import { Component } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminChange(){
    LoginComponent.isClicked = "cashier";
  }
}
