import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CartItem {
  itemId: any;
  itemName: string;
  price: number;
  qty: number;
  total: number;
}

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FormsModule, CommonModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  activeItems: any = [];
  ItemCategory: string = "";
  allItems: any = [];
  searchTerm: string = '';
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  grandTotal: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
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

  filterByCategory(category: string) {
    this.ItemCategory = category;
    if (category === '') {
      this.activeItems = this.allItems;
    } else {
      this.activeItems = this.allItems.filter((item: any) =>
        item.category === category
      );
    }
  }

  searchItems() {
    const searchTermLower = this.searchTerm.toLowerCase().trim();

    if (!searchTermLower) {
      this.filterByCategory(this.ItemCategory);
      return;
    }
    let filteredItems = this.allItems;
    if (this.ItemCategory) {
      filteredItems = filteredItems.filter((item: any) => item.category === this.ItemCategory);
    }
    this.activeItems = filteredItems.filter((item: any) => item.itemName.toLowerCase().includes(searchTermLower));
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.itemId === item.id);
    if (existingItem) {
      existingItem.qty += 1;
      existingItem.total = existingItem.qty * existingItem.price;
    } else {
      const newItem: CartItem = {
        itemId: item.id,
        itemName: item.itemName,
        price: item.price,
        qty: 1,
        total: item.price
      }
      this.cartItems.push(newItem);
    }
    this.calculateTotals();
  }

  updateQuantity(item: CartItem) {
    if (item.qty < 1) {
      item.qty = 1;
    }
    item.total = item.price * item.qty;
    this.calculateTotals();
  }

  removeItem(index: any) {
    this.cartItems.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    this.grandTotal = this.subtotal;
  }

  placeOrder() {
    console.log('Order placed:', {
      items: this.cartItems,
      subtotal: this.subtotal,
      grandTotal: this.grandTotal
    });
  }
}
