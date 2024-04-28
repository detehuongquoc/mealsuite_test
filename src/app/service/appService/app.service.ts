import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  
  private _loading$ = new BehaviorSubject<boolean>(false);

  loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  setLoading(status: boolean) {
    this._loading$.next(status);
  }
}
