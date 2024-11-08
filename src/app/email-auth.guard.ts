import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminService } from "./admin.service";

@Injectable({
    providedIn: 'root',
})

export class EmailAuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private adminservice:AdminService
    ){}

    canActivate(): boolean {
        const userEmail = this.adminservice.getEmail();
        const allowedEmails = [userEmail];
        if (userEmail && allowedEmails.includes(userEmail)){
            return true;
        }
        this.router.navigate(['/admin-login']);
        return false
    }
}