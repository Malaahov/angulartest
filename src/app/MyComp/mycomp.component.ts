import {Component, OnInit} from '@angular/core';
import { GoogleChartComponent, ChartType } from 'angular-google-charts';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: '[app-my]',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.css'],

})
export class MyComponent implements OnInit {


  totalTransactions:number = 0;
  sendFor:string='';
  inputBalance:number = 0;
  balance:number = 0;
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
  constructor(private http:HttpClient) {

  }
  ngOnInit()
  {
    this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').subscribe((data:any) => {
        this.balance = data.money;
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
  if(this.balance>price)
  {
    this.balance = this.balance - price;
    this.paidInvoices= this.paidInvoices +=+ 1;
    this.unpaidInvoices=this.unpaidInvoices - 1;
    this.billsPaid=this.billsPaid +=+ price;
    this.transactions.push({name:'Оплата '+name,amount:price,plus:false,date:new Date()});
    this.totalTransactions++;
   delete this.bills[index];
    const body= {money:this.balance ,transactionsCount:this.totalTransactions, bills:this.bills,paidBills:this.billsPaid, paidInvoices:this.paidInvoices,  totalInvoices:this.totalInvoices, unpaidInvoices:this.unpaidInvoices, transactions:this.transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );
  }
  else {
alert('Недостаточно денег')
  }
}
sendMoney()
{
if(this.inputBalance>this.balance)
{
  alert('Недостаточно средств')
}
else {
  this.balance=this.balance-this.inputBalance;
  this.totalInvoicesSent=this.totalInvoicesSent +=+ this.inputBalance;
  this.totalTransactions++;
  this.transactions.push({name:'Перевод на имя '+this.sendFor,amount:this.inputBalance,plus:false,date:new Date()});
  const body= {money:this.balance ,transactionsCount:this.totalTransactions, totalInvoices:this.totalInvoices, transactions:this.transactions};
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
    (data)=>{

    }
  );
}
}
addBalanceCount()
  {
this.balance= this.balance +=+ this.inputBalance;
this.totalInvoices = this.totalInvoices +=+ this.inputBalance;
this.totalTransactions++;
    this.transactions.push({name:this.sendFor,amount:this.inputBalance,plus:true,date:new Date()});
    this.current=0;
const body= {money:this.balance ,transactionsCount:this.totalTransactions, totalInvoices:this.totalInvoices, transactions:this.transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );




  }



}
