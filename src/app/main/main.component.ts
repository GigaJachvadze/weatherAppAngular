import { Component, OnInit, Output } from '@angular/core';

import { DataServiceService } from '../data-service.service'
import { SharedDataService } from '../shared-data.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: Array<any>;
  main: any;
  mainSelected: number;

  cities: Array<string> = ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Gori", "Zugdidi", "Poti", "Khashuri", "Samtredia", "Senaki"];
  //api!
  key: string = "e5a5658899eeb74364a64621ced3af51";
  unit: string = "units=metric";

  constructor(private service: DataServiceService, private dataService: SharedDataService) { }

  ngOnInit(): void {
    this.mainFunction();
  }

  mainFunction(): void{
    let dataExample = [];
    for (let i = 0; i < this.cities.length; i++) {
      let url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.cities[i] + "&" + this.unit + "&appid=" + this.key;
      this.service.GET_DATA(url)
        .subscribe((d) => {
          dataExample.push(d);
          if (dataExample.length === this.cities.length){//wait for all data
            this.sortData(dataExample);
          }
      });
    }
  }

  sortData(dataExample): void{
    let sortedData = new Array(this.cities.length);
    for (let i = 0; i < dataExample.length; i++) {
      if (dataExample[i].name === "P’ot’i"){
        dataExample[i].name = "Poti";
      }
      if (dataExample[i].name != this.cities[i]){
        let index = this.cities.indexOf(dataExample[i].name);
        sortedData[index] = dataExample[i];
      }
      else{
        sortedData[i] = dataExample[i];
      }
    }
    this.data = sortedData;
    this.sendData();
    this.reciveMain();
  }

  sendData(): void{
    this.dataService.setCities(this.cities);
    this.dataService.setData(this.data);
  }

  reciveMain(): void{
    this.mainSelected = this.dataService.getMainIndex();
    this.main = this.data[this.mainSelected];
    this.renameData();
  }

  // selection(n: number): void{
  //   if (n === -1){
  //     this.mainSelected = 0;
  //     this.main = this.data[this.mainSelected];
  //   }
  //   else{
  //     this.mainSelected = n;
  //     this.main = this.data[this.mainSelected];
  //   }
  // }

  renameData(): void{
    for (let i = 0; i < this.data.length; i++) {
      switch(this.data[i].name){
        case 'Tbilisi': this.data[i].name = 'თბილისი';
        break;
        case 'Batumi': this.data[i].name = 'ბათუმი';
        break;
        case 'Kutaisi': this.data[i].name = 'ქუთაისი';
        break;
        case 'Rustavi': this.data[i].name = 'რუსთავი';
        break;
        case 'Gori': this.data[i].name = 'გორი';
        break;
        case 'Zugdidi': this.data[i].name = 'ზუგდიდი';
        break;
        case 'Poti': this.data[i].name = 'ფოთი';
        break;
        case 'Khashuri': this.data[i].name = 'ხაშური';
        break;
        case 'Samtredia': this.data[i].name = 'სამტრედია';
        break;
        case 'Senaki': this.data[i].name = 'სენაკი';
        break;
      };
    }
  }
}