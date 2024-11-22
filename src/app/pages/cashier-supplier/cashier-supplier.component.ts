import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CashierNavBarComponent } from '../common/cashier-nav-bar/cashier-nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cashier-supplier',
  standalone: true,
  imports: [RouterLink, CashierNavBarComponent, FormsModule, CommonModule],
  templateUrl: './cashier-supplier.component.html',
  styleUrl: './cashier-supplier.component.css'
})
export class CashierSupplierComponent {
  activeSuppliers: any= [];

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){
    this.loadSuppliers();
  }

  public suppliers:any = {
    fullName: "",
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
    this.http.put("http://localhost:8080/supplier/update-supplier", this.activeSuppliersTemp).subscribe({
      next: (Response) => {
        alert("Profile Updated Success !!!")
        this.loadSuppliers();
      }
    })
  }

  private clearFields() {
    this.suppliers.fullName = "";
    this.suppliers.company = "";
    this.suppliers.email = "";
    this.suppliers.phoneNumber = "";
    this.suppliers.productCategory = "";
    this.suppliers.address = ""
  }
}
