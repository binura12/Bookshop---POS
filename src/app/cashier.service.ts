import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CashierService{
    isCashier: boolean = false;
    private email: string = '';

    constructor(private http: HttpClient) {
    }

    setEmail(email: string){
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }
}