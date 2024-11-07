import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  isEmailLblVisible:boolean = false;
  otp: string[] = ['', '', '', '', '', ''];
  isOTPCorrect: boolean = false;
  feedbackMessage: string = '';

  onOTPInput(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.otp[index] = inputElement.value.trim();

    // Move focus to the next input field
    if (inputElement.value.length === 1 && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if the OTP is complete and validate it
    if (this.otp.every((digit) => digit !== '')) {
      const enteredOTP = this.otp.join('');
      const expectedOTP = '123456'; // Replace with your expected OTP

      this.isOTPCorrect = enteredOTP === expectedOTP;
      this.feedbackMessage = this.isOTPCorrect ? 'Correct OTP!' : 'Incorrect OTP. Please try again.';
    }
  }
}
