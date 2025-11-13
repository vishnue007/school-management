import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService, RegisterPayload } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  registerForm: FormGroup;
  isSubmitting = false;
  serverError = '';
  serverSuccess = '';

  constructor() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      phone: [''],
      schoolId: ['', Validators.required],
      profilePicture: [null],
      address: ['', Validators.required],
      classSection: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.registerForm.patchValue({ profilePicture: null });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.registerForm.patchValue({
        profilePicture: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.serverError = 'Passwords do not match.';
      return;
    }

    const payload = { ...this.registerForm.value } as RegisterPayload;

    (['phone', 'profilePicture', 'classSection'] as const).forEach((key) => {
      if (!payload[key]) {
        delete payload[key];
      }
    });

    this.isSubmitting = true;
    this.serverError = '';
    this.serverSuccess = '';

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.serverSuccess = response.message;
        this.registerForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.serverError = error?.error?.message ?? 'Registration failed. Please try again.';
      }
    });
  }
}
