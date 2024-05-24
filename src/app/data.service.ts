import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  liste: any=[]
  minPrices: number[] = [0, 10, 20, 50];
  maxPrices:number[]=[10,20,50,100];
  minNotes:number[]=[0,1,2,3,4];
  maxNotes:number[]=[1,2,3,4,5]
  constructor(private http :HttpClient) { }

  getData(){
    return this.http.get("/assets/products-1.json");
    

  }

  

}