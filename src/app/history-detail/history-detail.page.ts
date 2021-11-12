import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppComponent } from '../app.component';
import { Product } from '../product';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  id: number;
  product: History;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.product = AppComponent.historyList[this.id];
  }

}
