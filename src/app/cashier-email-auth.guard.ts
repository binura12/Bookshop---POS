import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CashierService } from "./cashier.service";

@Injectable({
    providedIn: 'root',
})

export class CashierEmailAuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private cashierService:CashierService
    ){}

    canActivate(): boolean {
        const userEmail = this.cashierService.getEmail();
        if (userEmail && userEmail.length > 0) {
            return true;
        }
        this.cashierService.setEmail('');
        this.router.navigate(['/cashier-login']);
        return false;
    }
}