import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IValue} from "./value.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<IValue[]> {
    return this.http
      .get<IValue[]>('http://localhost:5000/api/values')
  }
}
