import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'dash-comp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class Dashboard implements OnInit {


  totalTransactions:number = 0;
  store:any = [];
  billsPaid:number= 0;
  totalInvoices:number = 0;
  paidInvoices:number = 0;
  unpaidInvoices:number = 0;
  totalInvoicesSent:number = 0;
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
    {name:'Электричество', price:200},
    {name:'ЖКХ', price:5000},
  ]
  transactions = [

    {name:'Возврат', amount:2000 ,plus:true, date:new Date()},

  ];

  current:number=0;
  switchCaseNumber(number:number)
  {
    this.current=number;
  }
  private _storeService;
  constructor(private http:HttpClient, storeService: StoreService) {
    this._storeService = storeService;
  }
  ngOnInit()
  {
    this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').subscribe((data:any) => {
        this._storeService.setStore(data);
        this.store = this._storeService.getStore();

        this.data = [
          ['1', this.store[0].totalInvoices],
          ['2', this.store[0].billsPaid],

        ];
      }
    )
  }











}
