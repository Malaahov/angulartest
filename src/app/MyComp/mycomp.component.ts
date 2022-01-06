import {Component} from '@angular/core';
import { GoogleChartComponent, ChartType } from 'angular-google-charts';
@Component({
  selector: '[app-my]',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.css']
})
export class MyComponent {

  totalTransactions:number = 1;
  sendFor:string='';
  inputBalance:number = 0;
  balance:number = 2000;
  totalInvoices:number = 2000;
  paidInvoices:number = 0;
  unpaidInvoices:number = 0;
  totalInvoicesSent:number = 200;
  title = '';
  type = ChartType.ColumnChart;
  data = [
    ['1', this.totalInvoices],
    ['2', this.paidInvoices],
    ['3', this.unpaidInvoices],
    ['4', this.totalInvoicesSent],
  ];

  options = {
    colors: ['#03B664', '#01BEFF', '#FFBF26', '#FF684D']
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
  constructor() {

  }

payBill(name:string, price:number, index:number)
{
  if(this.balance>price)
  {
    this.balance = this.balance - price;
    this.paidInvoices= this.paidInvoices +=+ price;
    this.transactions.push({name:'Оплата '+name,amount:price,plus:false,date:new Date()});
    this.totalTransactions++;
   delete this.bills[index];
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
}
}
addBalanceCount()
  {
this.balance= this.balance +=+ this.inputBalance;
this.totalInvoices = this.totalInvoices +=+ this.inputBalance;
    this.totalTransactions++;
    this.transactions.push({name:this.sendFor,amount:this.inputBalance,plus:true,date:new Date()});
this.current=0;

  }



}
