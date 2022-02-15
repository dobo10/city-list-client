import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {City} from "../models/city";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http : HttpClient) { }

  getCities(page: number, size: number) : Observable<City[]> {
    return this.http.get("/cities/v1", {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }).pipe(
      map(res => <City[]>res)
    );
  }

}
