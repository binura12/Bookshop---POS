import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard.component';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private adminService:AdminService
  ) {}
  
  isErrorLblVisible: boolean = false;

  public admin: any = {
    email: "",
    password: ""
  }

  login() {
    this.adminService.setEmail(this.admin.email);    
    this.http.post<boolean>("http://localhost:8080/admin/search-admin", null, {
      params: {
        email: this.admin.email,
        password: this.admin.password
      }
    }).subscribe((data) => {
      if (data) {
        this.router.navigate(["/admin-dashboard"])
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
    this.admin.email = "";
    this.admin.password = "";
  }
}