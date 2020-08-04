import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  cities: Array<string>;
  data: Array<any>;
  mainSelected: number = 0;

  constructor() { }

  setCities(inputCities): void{
    this.cities = inputCities;
  }

  getData(): Array<any>{
    let a = this.data;
    if(a) return a;
  }

  setData(inputData): void{
    this.data = inputData;
  }

  setMainIndex(n: number): void{
    this.mainSelected = n;
  }

  getMainIndex(): number{
    return this.mainSelected;
  }
}
