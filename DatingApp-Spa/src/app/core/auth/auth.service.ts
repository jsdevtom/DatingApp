import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto, SignUpDto, LoginSuccessResponse } from '@app/core/auth/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login(model: LoginDto): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'login', model);
  }

  signUp(model: SignUpDto): Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(this.baseUrl + 'register', model);
  }
}
