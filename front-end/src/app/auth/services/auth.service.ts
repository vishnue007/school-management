import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone?: string;
  schoolId: string;
  profilePicture?: string | null;
  address: string;
  classSection?: string;
}

export interface RegisteredUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  schoolId?: string;
  profilePicture?: string;
  address?: string;
  classSection?: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterResponse {
  message: string;
  user: RegisteredUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, payload);
  }
}

