import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../common/nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FormsModule, CommonModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {
  activeSuppliers: any= [];

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){
    this.loadSuppliers();
  }

  public suppliers:any = {
    fullname: "",
    company: "",
    email: "",
    phoneNumber: "",
    productCategory: "",
    address: ""
  }

  loadSuppliers(){
    this.http.get<any[]>("http://localhost:8080/supplier/all-active-suppliers")
    .subscribe({
      next: (data) => {
        this.activeSuppliers = data;        
      },
      error: (error) => {
        console.error('Error loading active suppliers:', error);
      }
    });
  }

  addSupplier(){
    console.log('Selected Category:', this.suppliers.category);
    this.http.post("http://localhost:8080/supplier/add-supplier", this.suppliers).subscribe(data => {
      alert('Supplier added successfully!!!');
      this.clearFields();
      this.loadSuppliers();
    });
  }

  remove(id: any){
    if (confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      this.http.delete(`http://localhost:8080/supplier/delete-supplier/${id}`).subscribe({
        next: (response) => {
          alert('Supplier delete successful!!!')
          this.loadSuppliers();
        }
      })
    }
  }

  public activeSuppliersTemp: any = {}

  updateSupplier(activeSuppliers: any){
    this.activeSuppliersTemp = activeSuppliers;
  }

  updateSupplierDetails(){
    console.log('Selected Category:', this.suppliers.category);
    this.http.put("http://localhost:8080/supplier/update-supplier", this.activeSuppliersTemp).subscribe({
      next: (Response) => {
        alert("Profile Updated Success !!!")
        this.loadSuppliers();
      }
    })
  }

  private clearFields() {
    this.suppliers.fullname = "";
    this.suppliers.company = "";
    this.suppliers.email = "";
    this.suppliers.phoneNumber = "";
    this.suppliers.category = "";
    this.suppliers.address = ""
  }
}
