import { Component } from '@angular/core';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [NavBarComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent {
  activeCashiers: any = [];
  removedCashiers: any = [];

  constructor(
    private http:HttpClient,
    private router:Router
  ){}

  ngOnInit() {
      this.loadCashiers();
  }

  public cashier: any = {
    imagePath: "",
    username: "",
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: ""
  }

  loadCashiers(){
    // Load active cashiers
    this.http.get<any[]>("http://localhost:8080/cashier/all-active-cashiers")
    .subscribe({
      next: (data) => {
        this.activeCashiers = data;        
      },
      error: (error) => {
        console.error('Error loading active cashiers:', error);
      }
    });

    // Load removed cashiers
    this.http.get<any[]>("http://localhost:8080/cashier/all-removed-cashiers")
    .subscribe({
      next: (data) => {
        this.removedCashiers = data;
      },
      error: (error) => {
        console.error('Error loading removed cashiers:', error);
      }
    });
  }

  signUp(){
    if (this.isPasswordStrong(this.cashier.password)){
      this.http.post("http://localhost:8080/cashier/add-cashier", this.cashier).subscribe(data => {
        alert('Cashier added successfully!!!');
        this.clearFields();
        this.loadCashiers();
      });
    } else {
      alert('Your Password is not strong, Please Add a Strong password');
    }
  }
  
  remove(id: any){    
    if(confirm('Are you sure you want to delete your profile? This action cannot be undone.')){
      this.http.delete(`http://localhost:8080/cashier/delete-cashier/${id}`).subscribe ({
        next: (response) => {
          alert('Cashier delete successful!!!')
          this.loadCashiers();
        }
      })
    }
  }

  public activeCashiersTemp:any = {}

  updateCashier(activeCashiers: any){
    this.activeCashiersTemp = activeCashiers;
  }

  updateCashierDetails(){
    this.http.put("http://localhost:8080/cashier/update-cashier", this.activeCashiersTemp).subscribe({
      next: (Response) => {
        alert("Profile Updated Success !!!")
        this.loadCashiers();        
      }
    })
  }

  private clearFields() {
    this.cashier.fullName = "";
    this.cashier.username = "";
    this.cashier.address = "";
    this.cashier.email = "";
    this.cashier.password = "";
    this.cashier.age = "",
    this.cashier.phoneNumber = ""
  }

  private isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars;
  }
}
