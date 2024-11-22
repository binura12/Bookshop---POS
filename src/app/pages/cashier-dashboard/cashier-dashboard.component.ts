import { Component } from '@angular/core';
import { NavBarComponent } from "../common/nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { CashierService } from '../../cashier.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CashierNavBarComponent } from "../common/cashier-nav-bar/cashier-nav-bar.component";

@Component({
  selector: 'app-cashier-dashboard',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, CashierNavBarComponent],
  templateUrl: './cashier-dashboard.component.html',
  styleUrl: './cashier-dashboard.component.css'
})
export class CashierDashboardComponent {
  public enteredEmail: string = '';

  public cashierData: any = {}
  isEditable = false;

  constructor(
    private http: HttpClient,
    private cashierService: CashierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enteredEmail = this.cashierService.getEmail();
    this.loadValues();
  }

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.cashierData.imagePath = "assets/cashiers/" + file.name;
    }
  }

  loadValues() {
    this.http.get(`http://localhost:8080/cashier/search-by-email/${this.enteredEmail}`).subscribe(data => {
      this.cashierData = data;
      console.log(this.cashierData);
    })
  }

  editProfile() {
    this.isEditable = true
  }

  saveProfile() {
    this.http.put("http://localhost:8080/cashier/update-cashier", this.cashierData).subscribe({
      next: (Response) => {
        alert("profile updated successfully");
        this.isEditable = false;
        this.loadValues();
      }
    })
  }
  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.http.delete(`http://localhost:8080/cashier/delete-cashier/${this.cashierData.id}`).subscribe({
        next: (response) => {
          alert("profile deleted successfully");
          this.router.navigate(["/cashier-login"]);
        }
      })
    }
  }
}
