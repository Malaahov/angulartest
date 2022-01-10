export type activesType={
  name:string;
  sum:number;
  type:number;
}
export type passivesType={
  name:string;
  sum:number;
  type:number;
}
export type storeType={
balance:number;
totalInvoices:number;
  transactions:[
    {name:string;
      amount:number;
    plus:boolean;
    date:any
    }
  ];
  billsPaid:number;
  bills:[
    {
      name:string;
      price:number;
    }
  ];
  paidInvoices:number;
  unpaidInvoices:number;
  totalInvoicesSent:number;
  totalTransactions:number;
  actives:Array<activesType>;
  passives:Array<passivesType>;
}


