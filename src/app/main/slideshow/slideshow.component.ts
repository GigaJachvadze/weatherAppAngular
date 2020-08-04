import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  mainSelected: number = 0;
  slidesOnOnePage: number = 3;

  currentPage: number;
  maxPage: number;

  dataWithoutMain: Array<any>;
  pageData: Array<any> = [];

  constructor(private dataService: SharedDataService) { }

  ngOnInit(): void {
    this.mainFunction();
  }

  mainFunction(): void{
    this.getDataWithoutMain();
  }

  getDataWithoutMain(): void{
    this.dataWithoutMain = this.dataService.getData();

    this.dataWithoutMain.splice(this.mainSelected, 1);
    this.calculateMaxPages();
  }

  calculateMaxPages(): void{
    //calculate maxPage
    if (this.dataWithoutMain.length % this.slidesOnOnePage === 0){
      this.maxPage = this.dataWithoutMain.length / this.slidesOnOnePage;
    }
    else{
      let a = this.dataWithoutMain.length % this.slidesOnOnePage;
      this.maxPage = ((this.dataWithoutMain.length - a) / this.slidesOnOnePage) + 1;
    }
    this.calculatePages();
    this.pageSelect(0);
  }

  pageSelect(n: number): void{
    if(n === 1){
      if(this.currentPage + n >= this.maxPage) this.currentPage = 0;
      else this.currentPage = this.currentPage + n;
    }
    else if(n === -1){
      if(this.currentPage + n < 0) this.currentPage = this.maxPage - 1;
      else this.currentPage = this.currentPage + n;
    }
    else{
      this.currentPage = 0;
    }
  }

  calculatePages(): void{
    //calculate wich data to show
    for (let i = 0; i < this.dataWithoutMain.length; i+= this.slidesOnOnePage) {
      this.pageData.push(this.dataWithoutMain.slice(i, i+this.slidesOnOnePage));
    }
    console.log(this.pageData)
  }
}