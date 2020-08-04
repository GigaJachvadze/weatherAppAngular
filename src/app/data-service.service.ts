import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  GET_DATA(url): Observable<any>{
    let returnValue;
    returnValue = this.http.get(url)

    return returnValue;
  }
}
