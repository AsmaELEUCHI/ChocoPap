import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { ShopComponent } from './shop/shop.component';
import { count } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chocoPap';
}
