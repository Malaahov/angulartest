import {Component, OnInit} from '@angular/core';
import {StoreService} from "../store.service";
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'dash-comp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class Dashboard implements OnInit {
  store:any = [];
  billsPaid:number= 0;
  totalInvoices:number = 0;
  paidInvoices:number = 0;
  title = '';
  type = ChartType.ColumnChart;
  data = [
    ['1', this.totalInvoices],
    ['2', this.paidInvoices],
  ];
  options = {
    colors: ['#03B664', 'red' ]
  };
  width = 150;
  height = 300;
  bills=[
    {name:'', price:0}
  ]
  transactions = [
    {name:'', amount:0 ,plus:true, date:new Date()},
  ];

  private _storeService;
  constructor(storeService: StoreService) {
    this._storeService = storeService;
  }
  ngOnInit()
  {
        this.store = this._storeService.getStore();
  }











}
