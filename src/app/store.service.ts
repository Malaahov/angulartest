import {Injectable, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {activesType, passivesType, storeType} from "./types/types";

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {
private store:storeType=
  {balance:1000,actives:[{name:'',sum:0,type:1}],passives:[{name:'',sum:0,type:1}], totalInvoices:0,transactions:[{name:'',amount:0,plus:true,date: new Date()}],bills:[{name:'111',price:111}],billsPaid:0,paidInvoices:0,unpaidInvoices:0,totalInvoicesSent:0,totalTransactions:0}
  constructor(private http:HttpClient) { }
public getStore(){
  return this.store;
}
public sendMoneyTo(balance:number,name:string)
{
  if(balance>this.store.balance)
  {
    alert('Недостаточно средств')
  }
  else {
    this.store.balance=this.store.balance - balance;
    this.store.totalInvoicesSent=this.store.totalInvoicesSent +=+ balance;
    this.store.totalTransactions++;
    this.store.transactions.push({name:name,amount:balance,plus:false,date:new Date()})
    const body= {balance:this.store.balance ,transactionsCount:this.store.totalTransactions, bills:this.store.bills,paidBills:this.store.billsPaid, paidInvoices:this.store.paidInvoices, totalInvoicesSent:this.store.totalInvoicesSent,  totalInvoices:this.store.totalInvoices, unpaidInvoices:this.store.unpaidInvoices, transactions:this.store.transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );
  }
}
public payBills(name:string,price:number,index:number)
{
  if(this.store.balance>price)
  {
    this.store.balance = this.store.balance - price;
    this.store.paidInvoices= this.store.paidInvoices +=+ 1;
    this.store.unpaidInvoices=this.store.unpaidInvoices - 1;
    this.store.billsPaid=this.store.billsPaid +=+ price;
    this.store.transactions.push({name:name,amount:price,plus:true,date:new Date()})
    this.store.totalTransactions++;
    delete this.store.bills[index];
    const body= {money:this.store.balance ,transactionsCount:this.store.totalTransactions, bills:this.store.bills,paidBills:this.store.billsPaid, paidInvoices:this.store.paidInvoices,  totalInvoices:this.store.totalInvoices, unpaidInvoices:this.store.unpaidInvoices, transactions:this.store.transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );
  }
  else {
    alert('Недостаточно денег')
  }

}
public addPassives(sum:number,name:string,type:number)
{
  this.store.passives.push({name,sum,type});
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', this.store).subscribe(
    (data)=>{

    }
  );
}

public addActives(sum:number,name:string,type:number)
{
  interface bodyType{
    money:number,
    totalInvoices:number,
    paidInvoices:number,
    unpaidInvoices:number,
    totalInvoicesSent:number,
    bills:[{}]
    actives:[ {
      name: string;
      sum: number;
      type: number;
    }]
  }
  this.store.actives.push({name,sum,type});
  this.http.put<bodyType>('https://60f53a592208920017f39f9d.mockapi.io/balance/1', this.store).subscribe(
    (data)=>{

    }
  );
}
public addMoney(balance:number,name:string)
{
this.store.balance=this.store.balance +=+ balance;
this.store.totalInvoices=this.store.totalInvoices +=+ balance;
this.store.totalTransactions++;
this.store.transactions.push({name:name,amount:balance,plus:true,date:new Date()})
  const body= {balance:this.store.balance ,transactionsCount:this.store.totalTransactions, bills:this.store.bills,paidBills:this.store.billsPaid, paidInvoices:this.store.paidInvoices,  totalInvoices:this.store.totalInvoices, unpaidInvoices:this.store.unpaidInvoices, transactions:this.store.transactions};
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
    (data)=>{

    }
  );
}

public setStore(){

 return  this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').toPromise().then((data:any) => {
    this.store.balance=data.balance;
    this.store.totalInvoices=data.totalInvoices;
    this.store.transactions=data.transactions;
    this.store.bills=data.bills;
    this.store.billsPaid=data.billsPaid;
    this.store.paidInvoices=data.paidInvoices;
    this.store.unpaidInvoices=data.unpaidInvoices;
    this.store.totalInvoicesSent=data.totalInvoicesSent;
    this.store.totalTransactions=data.totalTransactions;
    this.store.actives=data.actives;
    this.store.passives=data.passives;

  });


}
  ngOnInit()
  {

  }
}

