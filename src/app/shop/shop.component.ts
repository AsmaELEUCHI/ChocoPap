import { Component, OnInit,Input,Output, EventEmitter} from '@angular/core';
import { DataService } from '../data.service';
import { log } from 'console';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  @Output() cartChanged = new EventEmitter<any>();
  @Output() cartCountChanged = new EventEmitter<any>();
  @Input()title:string;
  @Input()price:string;
  liste: any;
  newListe:any=[];
  newPrix:string="";
  minPrices:number[];
  maxPrices:number[];
  minNotes:number[];
  maxNotes:number[];
  selectedMinPrice:number=0;
  selectedMaxPrice:number=100;
  selectedMinRating:number=0;
  selectedMaxRating:number=5;
  selectedTitles: string[] = []
  filteredProducts:any=[];
  cart: any[] = [];
  cartCount: number = 0;
  titles: string[] = [];
  
  
  
  constructor(private dataService: DataService) { }

  /* Initialiser les prix et notes de filtre 
    Inisialiser la liste des produits pour main content et la liste des titres pour filtre 
    info de dataService*/
  ngOnInit() {
    this.getminPrices();
    this.getmaxPrices();
    this.getminNotes();
    this.getmaxNotes();
    this.dataService.getData().subscribe(liste => {
      this.liste = liste;
      this.titles = this.liste.map(product => product.title);
      this.applyFilters();
    });
    }

    //importer les prix min pour le filtre
  getminPrices() {
    this.minPrices = this.dataService.minPrices;
  }

//importer les prix max pour le filtre
  getmaxPrices() {
    this.maxPrices = this.dataService.maxPrices;
  }
//importer les notes min pour le filtre
  getminNotes() {
    this.minNotes = this.dataService.minNotes;
  }
//importer les notes max pour le filtre
  getmaxNotes() {
    this.maxNotes = this.dataService.maxNotes;
  }

  //lier à l'événement change, affectant la valeur selectionnee à la variable
  onMinPriceChange(value: number) {
    this.selectedMinPrice = value;
    this.applyFilters();
  }

  onMaxPriceChange(value: number) {
    this.selectedMaxPrice = value;
    this.applyFilters();
  }

  onMinRatingChange(value: number) {
    this.selectedMinRating = value;
    this.applyFilters();
  }

  onMaxRatingChange(value: number) {
    this.selectedMaxRating = value;
    this.applyFilters();
  }

 
  onTitleChange(event: Event, title: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTitles.push(title);
    } else {
      const index = this.selectedTitles.indexOf(title);
      if (index > -1) {
        this.selectedTitles.splice(index, 1);
      }
      
      
    }
    this.applyFilters();
  }

  //filter selon prix note ou title choisi
  applyFilters() {
    this.filteredProducts = this.liste.filter(product => {
      const productPrice = product.price;
      const productRating = product.note;
      return (
        productPrice >= this.selectedMinPrice &&
        productPrice <= this.selectedMaxPrice &&
        productRating >= this.selectedMinRating &&
        productRating <= this.selectedMaxRating &&
        (this.selectedTitles.length === 0 || this.selectedTitles.includes(product.title))
      );
    });
  }
}