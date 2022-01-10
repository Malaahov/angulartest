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
  activeSums:number=0;
  passiveSum:number=0;
  currentPage:number=1;
  billsPaid:number= 0;
  totalInvoices:number = 0;
  paidInvoices:number = 0;
  unpaidInvoices:number = 0;
  totalInvoicesSent:number = 0;
  title = '';
  type = ChartType.PieChart;
  activesSum(actives:any){
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
  passivesSum(passives:any){
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
    ['1', this.activeSums],
    ['2', this.passiveSum],
  ];
  options = {
    colors: ['#03B664', 'red' ]
  };
  width = 300;
  height = 300;
  bills=[
    {name:'', price:0}

  ]



  private _storeService;
  constructor(private http:HttpClient, storeService: StoreService) {
    this._storeService = storeService;
  }
  getDate(date:any)
  {
    const dates:string =  new Date(date).getDate() + "/" + (new Date(date).getMonth()+1)+"/" + new Date(date).getFullYear();
    return dates;
  }
  ngOnInit()
  {
    this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').subscribe((data:any) => {
        this._storeService.setStore(data);
        this.store = this._storeService.getStore();
      this.activesSum(this.store[0].actives);
      this.passivesSum(this.store[0].passives);
      this.data = [
        ['Активы', this.activeSums],
        ['Пассивы', this.passiveSum],
      ];
      }
    )
  }











}
