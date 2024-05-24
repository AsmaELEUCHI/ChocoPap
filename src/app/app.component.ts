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
export class AppComponent   {
  title = 'chocoPap';
  cartCount: number = 0;
  cart: any[] = [];
  
  //Recuperer les valeur stocker dans le stockage local
  ngOnInit() {
    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
      this.cartCount = parseInt(storedCartCount, 10);
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
 
  //Mettre à jour l'état de panier et le synchroniser  avec le localStorage
  updateCart(cart: any) {
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
//Mettre à jour la quantité des articles  et la synchroniser  avec le localStorage
  updateCartCount(count: number) {
    this.cartCount = count;
    localStorage.setItem('cartCount', this.cartCount.toString());
  }

  //lier au evenements, permet de mettre à jour le panier en temps réel 
  onActivate(event) {
    if (event.cartChanged) {
      event.cartChanged.subscribe(cart => {
        this.updateCart(cart);
      });
    }

    if (event.cartCountChanged) {
      event.cartCountChanged.subscribe(count => {
        this.updateCartCount(count);
      });
    }
  }

  //permet d'incrementer la quantité dans Offcanvas et mettre à jour le panier 
  increaseQuantity(index: number) {
    this.cart[index].quantity += 1;
    this.updateCartCount(this.cart.reduce((total, item) => total + item.quantity, 0));
    this.updateCart(this.cart);
  }
//permet de decrementer la quantité dans Offcanvas et mettre à jour le panier 
  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.cart.splice(index, 1);
      this.updateCartCount(this.cart.reduce((total, item) => total + item.quantity, 0));
      this.updateCart(this.cart);
    }
  }
// la somme des prix des articles 
  getTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}