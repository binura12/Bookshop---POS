import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CashierService } from '../../../cashier.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cashier-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cashier-login.component.html',
  styleUrl: './cashier-login.component.css'
})
export class CashierLoginComponent {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private cashierService:CashierService
  ) {}
  
  isErrorLblVisible: boolean = false;

  public cashier: any = {
    email: "",
    password: ""
  }

  login() {
    this.cashierService.setEmail(this.cashier.email);
    this.http.post<boolean>("http://localhost:8080/cashier/search-cashier", null, {
      params: {
        email: this.cashier.email,
        password: this.cashier.password
      }
    }).subscribe((data) => {
      if (data) {
        this.router.navigate(["/cashier-dashboard"])
      } else {
        this.isErrorLblVisible = true;
        this.clearFields();
      }
    },
      (error) => {
        this.isErrorLblVisible = true;
        this.clearFields();
      }
    );
  }

  private clearFields() {
    this.cashier.email = "";
    this.cashier.password = "";
  }
}
