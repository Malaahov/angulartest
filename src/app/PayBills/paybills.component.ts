import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";
import {storeType} from "../types/types";

@Component({
  selector: 'pay-bills',
  templateUrl: './paybills.component.html',
  styleUrls: ['./paybills.component.css'],

})
export class PayBills {
  activeSum:number=0;
  activeName:string='';
  activeType:number=1;
  passiveSum:number=0;
  passiveName:string='';
  passiveType:number=1;
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
  private _storeService;
  constructor(private http:HttpClient, storeService: StoreService) {
    this._storeService = storeService;
  }
  ngOnInit()
  {
    this.store=this._storeService.getStore();
  }
  payBill(name:string,price:number,index:number)
  {
this._storeService.payBills(name,price,index);
  }
  addActives()
  {
this._storeService.addActives(this.activeSum,this.activeName,this.activeType);
  }
  addPassives()
  {
    this._storeService.addPassives(this.passiveSum,this.passiveName,this.passiveType);
  }
}
