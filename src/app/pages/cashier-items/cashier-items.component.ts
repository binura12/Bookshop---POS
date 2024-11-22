import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CashierNavBarComponent } from '../common/cashier-nav-bar/cashier-nav-bar.component';

@Component({
  selector: 'app-cashier-items',
  standalone: true,
  imports: [FormsModule, CommonModule, CashierNavBarComponent],
  templateUrl: './cashier-items.component.html',
  styleUrl: './cashier-items.component.css'
})
export class CashierItemsComponent {
  activeItems:any = [];
  ItemCategory:string = "";
  allItems: any = [];

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
        this.allItems = data;
        this.activeItems = data;
      },
      error: (error) => {
        console.error('Error loading active items:', error);
      }
    });
  }

  filterByCategory(category: string){
    this.ItemCategory = category;
    if (category === '') {
      this.activeItems = this.allItems;
    } else {
      this.activeItems = this.allItems.filter((item: any) => 
        item.category === category
      );
    }
  }

  addItem() {
    this.http.post("http://localhost:8080/item/add-item", this.item).subscribe(data => {
      this.loadItems();
      alert('Item added successfully!!!');
      this.clearFields();
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

  activeItemsTemp:any = {};

  updateItem(activeItems: any){
    this.activeItemsTemp = activeItems;
  }

  onUpdateImage(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.activeItemsTemp.imagePath = "assets/Items/" + file.name;
    }
  }

  onUpdateCategoryChange(event: Event):void {
    this.http.get<any[]>(`http://localhost:8080/supplier/suppliers-by-category/${this.activeItemsTemp.category}`)
    .subscribe(data => {
      this.matchSupplier = data;
    });
  }

  onUpdateSupplierSelect(event: Event):void {
    const selectedSupplierName = (event.target as HTMLSelectElement).value;
    const selectedSupplier = this.matchSupplier.find(supplier => supplier.fullName === selectedSupplierName);

    if (selectedSupplier) {
      this.activeItemsTemp.supplierId = selectedSupplier.id;
      this.activeItemsTemp.supplierName = selectedSupplier.fullName;
    }
  }

  updateDoneItem(){
    this.http.put("http://localhost:8080/item/update-item", this.activeItemsTemp).subscribe({
      next: (Response) => {
        alert("Item Updated Success !!!")
        this.loadItems();        
      }
    })
  }

  private clearFields() {
    this.item.itemName = "";
    this.item.itemDesc = "";
    this.item.price = "";
    this.item.qty = "";
    this.item.category = "";
    this.item.supplierName = "",
    this.item.supplierId = "",
    this.item.imagePath = ""
  }
}
