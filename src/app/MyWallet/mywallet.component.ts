import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";

@Component({
  selector: 'my-wallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.css'],

})
export class MyWallet {
  inputBalance:number = 0;
  sendFor:string='';
 store:any=[];
  private _storeService;
  constructor(private http:HttpClient, storeService: StoreService) {
    this._storeService = storeService;
  }

  addBalanceCount(){
this._storeService.addMoney(this.inputBalance,this.sendFor);

  }
sendMoney()
{
 this._storeService.sendMoneyTo(this.inputBalance,this.sendFor);
}








}
