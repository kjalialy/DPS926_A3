import { AppComponent } from './app.component';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from './product'
import { History } from './history'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManager {
    constructor(public alertController: AlertController, public toastController: ToastController, private router: Router) {}
    
    async errorMessage(message, header) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: header,
        message: message,
        buttons: ['Okay']
      });
  
      await alert.present();
    }

    async toastMessage(message, header) {
      const toast = await this.toastController.create({
        header: header,
        message: message,
        position: 'bottom',
        color: 'primary',
        duration: 1500
      });
      await toast.present();  
    }

    async restockProduct(selectedProduct, quantity) {
      let productIdx = AppComponent.productList.findIndex(i => i.name == selectedProduct);
      let product = AppComponent.productList[productIdx];
    
      product.setQuantity(Number(product.quantity) + Number(quantity));

      await this.toastMessage(`${product.name} has been restocked!`, "Product Restocked");
    }

    async buyProduct(quantity, product, total) {
      let updateQuantity = product.quantity - Number(quantity);
      product.setQuantity(updateQuantity);
      AppComponent.historyList.push(new History(product.name, Number(quantity), product.price, 
      `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`, Number(total)));

      await this.toastMessage(`${product.name} has been bought successfully!`, "Product Purchased");
    }


    async addProduct(userProduct: Product) {
        let isFound = false;
    
        for (let product of AppComponent.productList) {
          if (product.name.toLowerCase() == userProduct.getName().toLowerCase()) isFound = true;
        }
    
        if (isFound) {
          await this.errorMessage("This product already exists", "Error");
          return false;
        }
        else {
          if (userProduct.getName() == null) {
            await this.errorMessage("Please enter the product name", "Error");
            return false;
          }
          else if (userProduct.getPrice() == null) {
            await this.errorMessage("Please enter the product price", "Error");
            return false;
          }
          else if (userProduct.getQuantity() == null) {
            await this.errorMessage("Please enter the quantity price", "Error");
            return false;
          }
          else {
            let newProduct = userProduct;
            AppComponent.productList.push(newProduct);
            await this.errorMessage(`${newProduct.getName()} has been added to the list`, "Success");
            return true;
          }
        }
      }
}