import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserForDetailedDto, UserForListDto} from '@app/features/user/user.models';
import {UserModule} from '@app/features/user/user.module';

@Injectable({
  providedIn: UserModule,
})
export class UserService {
  protected readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  getUsers(): Observable<Array<UserForListDto>> {
    return this.http.get<Array<UserForListDto>>(`${this.baseUrl}users/`);
  }

  getUser(userId: string): Observable<UserForDetailedDto> {
    return this.http.get<UserForDetailedDto>(`${this.baseUrl}users/${userId}/`);
  }
}
