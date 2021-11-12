import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyProducts = [];
  constructor() {
    this.historyProducts = AppComponent.historyList;
   }

  ngOnInit() {
  }

}
