import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  enteredEmail: string = "";
  isEmailLblVisible: boolean = false;
  otp: string[] = ['', '', '', '', '', ''];
  isOTPCorrect: boolean = false;
  feedbackMessage: string = '';
  otpCode: string = '';
  isEmailVerified: boolean = false;
  newPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  onOTPInput(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.otp[index] = inputElement.value.trim();

    if (inputElement.value.length === 1 && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if the OTP is complete and validate it
    if (this.otp.every((digit) => digit !== '')) {
      const enteredOTP = this.otp.join('');
      const expectedOTP = this.otpCode;

      this.isOTPCorrect = enteredOTP === expectedOTP;
      this.feedbackMessage = this.isOTPCorrect ? 'Correct OTP!' : 'Incorrect OTP. Please try again.';
      if (this.isOTPCorrect) {
        this.isEmailVerified = true;
      }
    }
  }

  resetPassword(){
    if (this.isPasswordStrong(this.newPassword)) {
      this.http.put<boolean>(`http://localhost:8080/admin/update-password`, null, {
        params: {
          email: this.enteredEmail,
          newPassword: this.newPassword
        }
      }).subscribe({
        next: (data) => {
          if (data) {
            alert('Password updated successfully');
            this.router.navigate(['/admin-login']);
          } else {
            alert('Failed to update password');
          }
        }
      });
    } else {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
  }

  verifyEmail() {
    this.isEmailLblVisible = false;
    this.http.get<any>(`http://localhost:8080/admin/check-by-email/${this.enteredEmail}`).subscribe({
      next: (data) => {
        if (data.exists) {
          this.otpCode = data.otp;
        } else {
          this.isEmailLblVisible = true;
          this.enteredEmail = '';
        }
      }
    });
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
