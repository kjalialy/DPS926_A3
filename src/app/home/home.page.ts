import { Component } from '@angular/core';
import { Product } from '../product'
import { History } from '../history'
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { DataManager } from '../dataManager';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products = [];
  type: string;
  total: string;
  quantity: string;
  isProductSelected: boolean;
  constructor(private dataManager: DataManager, public alertController: AlertController, public toastController: ToastController) {
    this.type = "Type";
    this.total = "Total"
    this.quantity = "0"
    this.isProductSelected = false;

    AppComponent.productList.push(new Product("Pants", 20, 50));
    AppComponent.productList.push(new Product("Shoes", 50, 150));
    AppComponent.productList.push(new Product("Hats", 50, 25));
    AppComponent.productList.push(new Product("T-Shirts", 10, 15));
    AppComponent.productList.push(new Product("Dresses", 30, 60));

    this.products = AppComponent.productList;
  }

  selectClothing(idx) {
    this.isProductSelected = true;
    this.type = AppComponent.productList[idx].name;

    if (this.quantity != "0") {
      this.total = (AppComponent.productList[idx].price * Number(this.quantity)).toString();
    }
  }

  selectQuantity(num: any) {
    let type = document.getElementById("clothingType").textContent;
    if (this.quantity == "0") {
      this.quantity = num.toString();
    }
    else {
      this.quantity += num.toString();
    }

    for (let product of AppComponent.productList) {
      if (product.name == type) {
        this.total = (product.price * Number(this.quantity)).toString()
      }
    }
  }

  reset() {
    this.isProductSelected = false;
    this.quantity = "0";
    this.type = "Type";
    this.total = "0";
  }

  async buyProduct() {
    if (!this.isProductSelected) {
      this.dataManager.errorMessage("Please select a product before buying", "Error");
    }
    else if (this.quantity == "0") {
      this.dataManager.errorMessage("Please enter the quantity for the product before buying", "Error");
    }
    else {
      // find product
      let productIdx = AppComponent.productList.findIndex(i => i.name == this.type);
      let product = AppComponent.productList[productIdx];

      if (product.quantity < this.quantity || product.quantity == "0") {
        this.dataManager.errorMessage("Need to restock", "Error");
      }
      else {
        this.dataManager.buyProduct(this.quantity, product, this.total);
      }
      this.reset();
    }
  }
}
