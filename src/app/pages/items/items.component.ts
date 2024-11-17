import { Component } from '@angular/core';
import { NavBarComponent } from "../common/nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  activeItems:any = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.loadItems();
  }

  public item: any = {
    imagePath: "",
    itemName: "",
    itemDesc: "",
    price: "",
    qty: "",
    category: "",
    supplierId: "",
    supplierName: ""
  }

  matchSupplier:any[] = [];

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.item.imagePath = "assets/Items/" + file.name;
    }
  }

  loadItems(){
    this.http.get<any[]>("http://localhost:8080/item/all-active-items")
    .subscribe({
      next: (data) => {
        this.activeItems = data;
      },
      error: (error) => {
        console.error('Error loading active items:', error);
      }
    });
  }

  addItem() {
    this.http.post("http://localhost:8080/item/add-item", this.item).subscribe(data => {
      this.loadItems();
      alert('Item added successfully!!!');
    });
  }

  deleteItem(id: any) {
    if (confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      this.http.delete(`http://localhost:8080/item/delete-item/${id}`).subscribe({
        next: (response) => {
          alert('Item delete successful!!!')
          this.loadItems();
        }
      })
    }
  }

  onCategoryChange(event: Event): void {
    this.http.get<any[]>(`http://localhost:8080/supplier/suppliers-by-category/${this.item.category}`)
      .subscribe(data => {
        this.matchSupplier = data;
      });
  }

  onSupplierSelect(event: Event): void {
    const selectedSupplierName = (event.target as HTMLSelectElement).value;
    const selectedSupplier = this.matchSupplier.find(supplier => supplier.fullName === selectedSupplierName);

    if (selectedSupplier) {
      this.item.supplierId = selectedSupplier.id;
      this.item.supplierName = selectedSupplier.fullName;
    }
  }
}
