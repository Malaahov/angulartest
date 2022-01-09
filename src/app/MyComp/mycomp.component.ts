import {Component, OnInit} from '@angular/core';
import { GoogleChartComponent, ChartType } from 'angular-google-charts';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";

@Component({
  selector: '[app-my]',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.css'],
})
export class MyComponent {
  totalTransactions:number = 0;
  activeSum:number=1000;
  store:any = [];
  billsPaid:number= 0;
  totalInvoices:number = 0;
  paidInvoices:number = 0;
  unpaidInvoices:number = 0;
  totalInvoicesSent:number = 0;
  title = '';


  private _storeService;
  constructor(private http:HttpClient, storeService: StoreService) {
this._storeService = storeService;
  }
}
