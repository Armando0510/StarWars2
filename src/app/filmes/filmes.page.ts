import { Component, OnInit } from '@angular/core';
import { ApiService} from '../services/api.service';
import { Filmes } from 'src/app/models/placeholder.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {

  constructor(private ApiService: ApiService,
    private router: Router,) { }

  ngOnInit() {
  //this.DeleteData();
  //this.createData();
  //this.readData();
  //this.updateData();
  this.getter();
  }
  filmes : Filmes;
  erro: any;
  readonly api : string;
  
  
   
  getter(){
    this.ApiService.readData().subscribe((data: Filmes) => {
      this.filmes = data.results
    console.log('Os filmes recebidos',this.filmes);
    //console.log('o data recebido',data);
    }, (error: any) => {
    this.erro = error;
    console.log("Erro",error);
    });
  }  

  sobre(){
    this.router.navigate(["/sobre"])
  }
  
}
