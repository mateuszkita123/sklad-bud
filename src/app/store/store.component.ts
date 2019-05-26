import { Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { STORE_DATA } from '../store-data';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
    
  storeArr = STORE_DATA;

  constructor() { }

  ngOnInit() {
  }

  message: string = "";

  store(amount: number, price: number): void {
    if (!amount || !price) { return; };
    this.storeArr.push({amount, price});
    this.message = "Odebrano partię " + amount + " cegieł w cenie " + price + " PLN/szt.";
  }

  pull(amount: number): void {
    if(!amount || !this.storeArr.length) { return; };
    let sum: number = 0;
    for(let i=0; i<this.storeArr.length; i++) {
      sum += +this.storeArr[i].amount;
    };
    if(amount > sum) {
      this.message = "Podana ilość cegieł jest niewystarczająca do zrealizowania zamówienia! Dodaj kolejną dostawę cegieł.";
    } else {
        let transactionValue: number = 0;
        let bricksAmount: number = amount;
        while (bricksAmount >= 0) {
          let i: number = 0;
          if(bricksAmount < this.storeArr[i].amount) {
              this.storeArr[i].amount -= bricksAmount;
              transactionValue += (bricksAmount * this.storeArr[i].price);
              this.message = "Wartość zakupu cegieł wyniosła: " + transactionValue + " PLN.";
              break;
          } else if(bricksAmount == this.storeArr[i].amount) {
              transactionValue += (this.storeArr[i].amount * this.storeArr[i].price);
              this.message = "Wartość zakupu cegieł wyniosła: " + transactionValue + " PLN.";
              this.storeArr.splice(0, 1);
              break;
          } else if(bricksAmount > this.storeArr[i].amount) {
              transactionValue += (this.storeArr[i].amount * this.storeArr[i].price);
              bricksAmount -= this.storeArr[i].amount;
              this.storeArr.splice(0, 1);
          } else { return; }
        }
    }
  }
}
