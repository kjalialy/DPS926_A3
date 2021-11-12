import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { AppComponent } from '../app.component';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Product } from '../product';
import { DataManager } from '../dataManager';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.page.html',
  styleUrls: ['./restock.page.scss'],
})
export class RestockPage implements OnInit {
  products = [];
  selectedProduct: any;
  quantity: number;
  isTapped: boolean;
  constructor(private dataManager: DataManager, public alertController: AlertController, public toastController: ToastController) { 
    this.selectedProduct = "Type"
    this.products = AppComponent.productList;
  }

  ngOnInit() {
  }

  selectClothing(idx) {
    this.selectedProduct = this.products[idx].name;
    this.isTapped = true;
  }

  async restockProduct() {
    if (this.quantity != null) {
      if (this.isTapped) {
        this.dataManager.restockProduct(this.selectedProduct, this.quantity);
  
        this.quantity = null;
        this.selectedProduct = "Type";
        this.isTapped = false;
      }
      else {
        this.dataManager.errorMessage('Please select a product before updating the quantity', 'Error');
      }
    }
    else {
      this.dataManager.errorMessage('Please provide the quantity before updating', 'Error');
    }

  }
}
