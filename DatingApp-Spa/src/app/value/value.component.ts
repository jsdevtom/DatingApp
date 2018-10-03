import {Component, OnInit} from '@angular/core';
import {ValueService} from "./value.service";
import {IValue} from "./value.interface";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {
  public values$: Observable<IValue[]>;

  constructor(
    private valueService: ValueService,
  ) {
  }

  private static handleValuesRequestError(): Observable<IValue[]> {
    console.error(`Couldn't fetch values`);
    return of([])
  }

  ngOnInit() {
    this.values$ = this.valueService
      .getAll()
      .pipe(
        catchError(err => ValueComponent.handleValuesRequestError())
      )
    ;
  }

  trackByFn(index: number, item: IValue) {
    return item.id;
  }


}
