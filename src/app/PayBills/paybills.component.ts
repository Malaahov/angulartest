import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";

@Component({
  selector: 'pay-bills',
  templateUrl: './paybills.component.html',
  styleUrls: ['./paybills.component.css'],

})
export class PayBills {

  store:any=[];
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
}
