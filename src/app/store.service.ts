import {Injectable, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {activesType, passivesType, storeType} from "./types/types";

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {
private store:Array<storeType>= [
  {balance:1000,actives:[{name:'',sum:0,type:1}],passives:[{name:'',sum:0,type:1}], totalInvoices:0,transactions:[{name:'',amount:0,plus:true,date: new Date()}],bills:[{name:'111',price:111}],billsPaid:0,paidInvoices:0,unpaidInvoices:0,totalInvoicesSent:0,totalTransactions:0}
]
  private passiveSum:number=0;
  constructor(private http:HttpClient) { }
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
    const body= {balance:this.store[0].balance ,transactionsCount:this.store[0].totalTransactions, bills:this.store[0].bills,paidBills:this.store[0].billsPaid, paidInvoices:this.store[0].paidInvoices, totalInvoicesSent:this.store[0].totalInvoicesSent,  totalInvoices:this.store[0].totalInvoices, unpaidInvoices:this.store[0].unpaidInvoices, transactions:this.store[0].transactions};
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
    this.store[0].transactions.push({name:name,amount:price,plus:true,date:new Date()})
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
public addPassives(sum:number,name:string,type:number)
{
  const body = {passives:{name:name,sum:sum,type:type}}
  this.store[0].passives.push({name,sum,type});
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', this.store[0]).subscribe(
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
  this.store[0].actives.push({name,sum,type});
  this.http.put<bodyType>('https://60f53a592208920017f39f9d.mockapi.io/balance/1', this.store[0]).subscribe(
    (data)=>{

    }
  );
}
public addMoney(balance:number,name:string)
{
this.store[0].balance=this.store[0].balance +=+ balance;
this.store[0].totalInvoices=this.store[0].totalInvoices +=+ balance;
this.store[0].totalTransactions++;
this.store[0].transactions.push({name:name,amount:balance,plus:true,date:new Date()})
  const body= {balance:this.store[0].balance ,transactionsCount:this.store[0].totalTransactions, bills:this.store[0].bills,paidBills:this.store[0].billsPaid, paidInvoices:this.store[0].paidInvoices,  totalInvoices:this.store[0].totalInvoices, unpaidInvoices:this.store[0].unpaidInvoices, transactions:this.store[0].transactions};
  this.http.put('https://60f53a592208920017f39f9d.mockapi.io/balance/1', body).subscribe(
    (data)=>{

    }
  );
}
  passivesSum(passives:Array<passivesType>){
    for (var i = 0; i< passives.length; i++)
    {
      if(passives[i].type == 1)
      {
        this.passiveSum+= (passives[i].sum*4);
      }
      if(passives[i].type == 2)
      {
        this.passiveSum+= (passives[i].sum*2);
      }
      if(passives[i].type == 3)
      {
        this.passiveSum+= passives[i].sum;
      }

    }
    alert(this.passiveSum);
    return this.passiveSum;
  }
public setStore(){
  this.http.get('https://60f53a592208920017f39f9d.mockapi.io/balance/1').subscribe((data:any) => {
    this.store[0].balance=data.balance;
    this.store[0].totalInvoices=data.totalInvoices;
    this.store[0].transactions=data.transactions;
    this.store[0].bills=data.bills;
    this.store[0].billsPaid=data.billsPaid;
    this.store[0].paidInvoices=data.paidInvoices;
    this.store[0].unpaidInvoices=data.unpaidInvoices;
    this.store[0].totalInvoicesSent=data.totalInvoicesSent;
    this.store[0].totalTransactions=data.totalTransactions;
    this.store[0].actives=data.actives;
    this.store[0].passives=data.passives;
  });


}
  ngOnInit()
  {

  }
}

