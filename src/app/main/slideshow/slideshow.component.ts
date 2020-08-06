import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  slidesOnOnePage: number = 3;

  currentPage: number;
  selected: number;
  maxPage: number;

  dataWithoutMain: Array<any> = [];
  pageData: Array<any> = [];

  @Input() data: Array<any>;
  @Output() mainChangeEvent = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  mainFunction(selected): void{
    this.selected = selected;
    this.getDataWithoutMain();
    this.ref.detectChanges();
  }

  getDataWithoutMain(): void{
    this.dataWithoutMain = [];
    for (let i = 0; i < this.data.length; i++) {
      if(i != this.selected){
        this.dataWithoutMain.push(this.data[i]);
      }
    }
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
    this.pageData = [];
    for (let i = 0; i < this.dataWithoutMain.length; i+= this.slidesOnOnePage) {
      this.pageData.push(this.dataWithoutMain.slice(i, i+this.slidesOnOnePage));
    }
  }

  selectMain(selected){
      this.mainChangeEvent.emit(selected);
    }
}