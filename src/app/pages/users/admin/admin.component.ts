import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeAdmins: any = [];
  removedAdmins: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadAdmins();
  }

  imagePath: string | null = null;

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imagePath = "assets/admins/" + file.name;
    }
  }

  public admin: any = {
    imagePath: "",
    username: "",
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: ""
  }

  loadAdmins() {
    // Load active admins
    this.http.get<any[]>("http://localhost:8080/admin/get-active-admins")
      .subscribe({
        next: (data) => {
          this.activeAdmins = data;
        },
        error: (error) => {
          console.error('Error loading removed admins:', error);
        }
      });

    // Load removed admins
    this.http.get<any[]>("http://localhost:8080/admin/get-removed-admins")
      .subscribe({
        next: (data) => {
          this.removedAdmins = data;
        },
        error: (error) => {
          console.error('Error loading removed admins:', error);
        }
      });
  }

  signUp() {
    if (this.isPasswordStrong(this.admin.password)) {
      this.admin.imagePath = this.imagePath;
      this.http.post("http://localhost:8080/admin/add-admin", this.admin).subscribe(data => {
        alert('Admin added successfully!');
        this.clearFields();
        this.loadAdmins();
      });
    } else {
      alert('Your Password is not strong, Please Add a Strong password');
    }
  }

  private clearFields() {
    this.admin.fullName = "";
    this.admin.username = "";
    this.admin.address = "";
    this.admin.email = "";
    this.admin.password = "";
    this.admin.age = "",
    this.admin.phoneNumber = ""
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
