import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto, SignUpDto, LoginSuccessResponse } from '@app/core/auth/auth.models';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly baseUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient) {}

  login(model: LoginDto): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'login', model);
  }

  signUp(model: SignUpDto): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'register', model);
  }
}
