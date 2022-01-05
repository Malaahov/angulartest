import {Component} from '@angular/core';

@Component({
  selector: '[app-my]',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.css']
})
export class MyComponent {
  addFormType:number = 0;
  sendFor:string='';
  inputBalance:number = 0;
  balance:number = 2000;
  totalInvoices:number = 2000;
  paidInvoices:number = 0;
  unpaidInvoices:number = 0;
  totalInvoicesSent:number = 0;
  bills=[
    {name:'Электричество', price:200},
    {name:'ЖКХ', price:5000},
  ]
  transactions = [

    {name:'Возврат', amount:2000 ,plus:true, date:new Date()},

  ];
carName:string = 'Название машины';
carYear:string = 'Год машины';
addCarStatus:boolean = false;
cars:[{name:string, year:string}] = [
  {name:'Ford', year:'2015'},

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
  this.transactions.push({name:'Перевод на имя '+this.sendFor,amount:this.inputBalance,plus:false,date:new Date()});
}
}
addBalanceCount()
  {
this.balance= this.balance +=+ this.inputBalance;
this.totalInvoices = this.totalInvoices +=+ this.inputBalance;
    this.transactions.push({name:this.sendFor,amount:this.inputBalance,plus:true,date:new Date()});
this.current=0;

  }



}
