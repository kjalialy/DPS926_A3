import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from '../product';
import { DataManager } from '../dataManager';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  product: Product;
  constructor(public modalController: ModalController, private dataManager: DataManager, public alertController: AlertController, public toastController: ToastController, private router: Router) { 
    this.product = new Product();
  }
  ngOnInit() {
  }

  async addProduct() {
    if (await this.dataManager.addProduct(this.product)) {
      this.dismiss();
      this.router.navigate(['']);
    };
  }

  async navigateBack() {
    const isModalOpened = await this.modalController.getTop();

    if (isModalOpened) {
      this.dismiss()
    }
    else {
      this.router.navigate(['/manager']);
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
