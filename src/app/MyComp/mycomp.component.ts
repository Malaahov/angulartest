import {Component, OnInit} from '@angular/core';
import { GoogleChartComponent, ChartType } from 'angular-google-charts';
import { HttpClient} from "@angular/common/http";
import {StoreService} from "../store.service";

@Component({
  selector: '[app-my]',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.css'],

})
export class MyComponent implements OnInit {


  totalTransactions:number = 0;
  sendFor:string='';
  inputBalance:number = 0;
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
        this.totalInvoices= data.totalInvoices;
        this.transactions=data.transactions;
        this.bills=data.bills;
        this.billsPaid= data.paidBills;
        this.paidInvoices = data.paidInvoices;
        this.unpaidInvoices = data.unpaidInvoices;
        this.totalInvoicesSent = data.totalInvoicesSent;
        this.totalTransactions = data.transactionsCount;
        this.data = [
        ['1', this.totalInvoices],
        ['2', this.billsPaid],

      ];
      }
    )
  }

payBill(name:string, price:number, index:number)
{
  if(this.store[0].balance>price)
  {
    this.store[0].balance = this.store[0].balance - price;
    this.paidInvoices= this.paidInvoices +=+ 1;
    this.unpaidInvoices=this.unpaidInvoices - 1;
    this.billsPaid=this.billsPaid +=+ price;
    this.transactions.push({name:'Оплата '+name,amount:price,plus:false,date:new Date()});
    this.totalTransactions++;
   delete this.bills[index];
    const body= {money:this.store[0].balance ,transactionsCount:this.totalTransactions, bills:this.bills,paidBills:this.billsPaid, paidInvoices:this.paidInvoices,  totalInvoices:this.totalInvoices, unpaidInvoices:this.unpaidInvoices, transactions:this.transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );
  }
  else {
alert('Недостаточно денег')
  }

}









}
