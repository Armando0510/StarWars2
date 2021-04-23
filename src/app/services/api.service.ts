import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Filmes } from '../models/placeholder.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: string = 'https://swapi.dev/api/';
  private options: any = { Headers: new HttpHeaders({'Content-Type': 'application/json'}) };


  constructor(private http:HttpClient) { }


  
  readData(){
    //Método que pega os filmes
   return this.http.get(`${this.api}films`);
  }


  // updateData(){

  // }

  // DeleteData(){

  // }
}
