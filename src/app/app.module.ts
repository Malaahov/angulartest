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


@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    MyWallet,
    PayBills

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleChartsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
