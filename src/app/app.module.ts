import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MyComponent} from './MyComp/mycomp.component';
import { HttpClientModule } from '@angular/common/http';
import {MyWallet} from "./MyWallet/mywallet.component";
import {StoreService} from "./store.service";
import {PayBills} from "./PayBills/paybills.component";
import { Routes, RouterModule} from "@angular/router";
import {Dashboard} from "./Dashboard/dashboard.component";
import {NgxPaginationModule} from 'ngx-pagination';
 const appRoutes: Routes =[
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
   {path:'dashboard', component:Dashboard},
   {path:'wallet', component:MyWallet},
   {path:'bills', component:PayBills}

 ]

@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    MyWallet,
    PayBills,
    Dashboard

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    GoogleChartsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
