import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";
import {ChartType} from "angular-google-charts";
import {activesType, passivesType, storeType} from "../types/types";

@Component({
  selector: 'dash-comp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})

export class Dashboard implements OnInit {
  private _storeService;
  totalTransactions:number = 0;
  store:storeType = {
    balance:0,
    totalInvoices:0,
    transactions:[
      {name:'string',
        amount:0,
        plus:true,
        date:"1"
      }
    ],
    billsPaid:0,
    bills:[
      {
        name:'string',
        price:0,
      }
    ],
    paidInvoices:0,
    unpaidInvoices:0,
    totalInvoicesSent:0,
    totalTransactions:0,
    actives: [],
    passives:[],
  };
  activeSums:number=0;
  passiveSum:number=0;
  currentPage:number=1;
  title = '';
  type = ChartType.PieChart;
  constructor(private http:HttpClient, storeService: StoreService) {
    this._storeService = storeService;
  }
  activesSum(actives:Array<activesType>){
    for (var i = 0; i< actives.length; i++)
    {
      if(actives[i].type == 1)
      {
      this.activeSums+= (actives[i].sum*4);
      }
      if(actives[i].type == 2)
      {
       this.activeSums+= (actives[i].sum*2);
      }
      if(actives[i].type == 3)
      {
       this.activeSums+= actives[i].sum;
      }
    }
    return this.activeSums;
  }
  passivesSum(passives:Array<passivesType>){
    for (var i = 0; i< passives.length; i++)
    {
      if(passives[i].type == 1)
      {
        this.passiveSum+= (passives[i].sum*4);
      }
      if(passives[i].type == 2)
      {
        this.passiveSum+= (passives[i].sum*2);
      }
      if(passives[i].type == 3)
      {
        this.passiveSum+= passives[i].sum;
      }
    }
    return this.passiveSum;
  }

  data = [
    ['Активы', this.activeSums],
    ['Пассивы', this.passiveSum],
  ];
  options = {
    colors: ['#03B664', 'red' ]
  };
  width = 300;
  height = 300;
  bills=[
    {name:'', price:0}
  ]

  getDate(date:Date)
  {
    const dates:string =  new Date(date).getDate() + "/" + (new Date(date).getMonth()+1)+"/" + new Date(date).getFullYear();
    return dates;
  }
  ngOnInit()
  {
    this._storeService.setStore();
    this.store = this._storeService.getStore();
this.activeSums=this.activesSum(this.store.actives);
this.passiveSum=this.passivesSum(this.store.passives);
    this.data = [
      ['Активы', this.activeSums],
      ['Пассивы', this.passiveSum],
    ];

  }











}
