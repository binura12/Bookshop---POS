import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  activeEmployees: any = [];
  removedEmployeess: any = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  public employee: any = {
    imagePath: "",
    username: "",
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
    address: "",
    role: ""
  }

  loadEmployees() {
    // Load active employees
    this.http.get<any[]>("http://localhost:8080/employee/all-active-employees")
      .subscribe({
        next: (data) => {
          this.activeEmployees = data;
        },
        error: (error) => {
          console.error('Error loading active employees:', error);
        }
      });

    // Load removed employees
    this.http.get<any[]>("http://localhost:8080/employee/all-removed-employees")
      .subscribe({
        next: (data) => {
          this.removedEmployeess = data;
        },
        error: (error) => {
          console.error('Error loading removed employees:', error);
        }
      });
  }

  signUp() {
    this.http.post("http://localhost:8080/employee/add-employee", this.employee).subscribe(data => {
      alert('Employee added successfully!!!');
      this.clearFields();
      this.loadEmployees();
    });
  }

  remove(id: any) {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.http.delete(`http://localhost:8080/employee/delete-employee/${id}`).subscribe({
        next: (response) => {
          alert('Employee delete successful!!!')
          this.loadEmployees();
        }
      })
    }
  }

  public activeEmployeessTemp: any = {}

  updateEmployee(activeEmployees: any) {
    this.activeEmployeessTemp = activeEmployees;
  }

  updateEmployeeDetails() {
    this.http.put("http://localhost:8080/employee/update-employee", this.activeEmployeessTemp).subscribe({
      next: (Response) => {
        alert("Profile Updated Success !!!")
        this.loadEmployees();
      }
    })
  }

  private clearFields() {
    this.employee.fullName = "";
    this.employee.username = "";
    this.employee.address = "";
    this.employee.email = "";
    this.employee.password = "";
    this.employee.age = "",
    this.employee.phoneNumber = ""
    this.employee.role = ""
  }
}
