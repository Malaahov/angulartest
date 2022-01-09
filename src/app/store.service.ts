import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root',
})
export class StoreService {
private store = [
  {balance:1000, totalInvoices:0,transactions:[{name:'',amount:0,plus:true,date: new Date()}],bills:[],billsPaid:0,paidInvoices:0,unpaidInvoices:0,totalInvoicesSent:0,totalTransactions:0}
]
  constructor(private http:HttpClient) { }
  ngOnInit()
  {
    this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').subscribe((data:any) => {
        this.store=data;
      }
    )
  }
public getStore(){

  return this.store;
}
public sendMoneyTo(balance:number,name:string)
{
  if(balance>this.store[0].balance)
  {
    alert('Недостаточно средств')
  }
  else {
    this.store[0].balance=this.store[0].balance - balance;
    this.store[0].totalInvoicesSent=this.store[0].totalInvoicesSent +=+ balance;
    this.store[0].totalTransactions++;
    this.store[0].transactions.push({name:name,amount:balance,plus:false,date:new Date()})
    const body= {money:this.store[0].balance ,transactionsCount:this.store[0].totalTransactions, bills:this.store[0].bills,paidBills:this.store[0].billsPaid, paidInvoices:this.store[0].paidInvoices, totalInvoicesSent:this.store[0].totalInvoicesSent,  totalInvoices:this.store[0].totalInvoices, unpaidInvoices:this.store[0].unpaidInvoices, transactions:this.store[0].transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{
      }
    );
  }
}
public payBills(name:string,price:number,index:number)
{
  if(this.store[0].balance>price)
  {
    this.store[0].balance = this.store[0].balance - price;
    this.store[0].paidInvoices= this.store[0].paidInvoices +=+ 1;
    this.store[0].unpaidInvoices=this.store[0].unpaidInvoices - 1;
    this.store[0].billsPaid=this.store[0].billsPaid +=+ price;
    this.store[0].transactions.push({name:'Оплата '+name,amount:price,plus:false,date:new Date()});
    this.store[0].totalTransactions++;
    delete this.store[0].bills[index];
    const body= {money:this.store[0].balance ,transactionsCount:this.store[0].totalTransactions, bills:this.store[0].bills,paidBills:this.store[0].billsPaid, paidInvoices:this.store[0].paidInvoices,  totalInvoices:this.store[0].totalInvoices, unpaidInvoices:this.store[0].unpaidInvoices, transactions:this.store[0].transactions};
    this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
      (data)=>{

      }
    );
  }
  else {
    alert('Недостаточно денег')
  }

}
public addMoney(balance:number,name:string)
{
this.store[0].balance=this.store[0].balance +=+ balance;
this.store[0].totalInvoices=this.store[0].totalInvoices +=+ balance;
this.store[0].totalTransactions++;
this.store[0].transactions.push({name:name,amount:balance,plus:true,date:new Date()})
  const body= {money:this.store[0].balance ,transactionsCount:this.store[0].totalTransactions, bills:this.store[0].bills,paidBills:this.store[0].billsPaid, paidInvoices:this.store[0].paidInvoices,  totalInvoices:this.store[0].totalInvoices, unpaidInvoices:this.store[0].unpaidInvoices, transactions:this.store[0].transactions};
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
    (data)=>{

    }
  );
}
public setStore(data:any){
  this.store[0].balance=data.money;
  this.store[0].totalInvoices=data.totalInvoices;
  this.store[0].transactions=data.transactions;
  this.store[0].bills=data.bills;
  this.store[0].billsPaid=data.billsPaid;
  this.store[0].paidInvoices=data.paidInvoices;
  this.store[0].unpaidInvoices=data.unpaidInvoices;
  this.store[0].totalInvoicesSent=data.totalInvoicesSent;
  this.store[0].totalTransactions=data.totalTransactions;

}

}
