import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formLogin: FormGroup;
  exibir_senha: string = 'password';

  constructor(private fb: FormBuilder,
    
    public router: Router,) {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
      senha: ['', Validators.required],
    });
  }

  entrar(){
    console.log(this.formLogin);
    this.router.navigate(['/filmes']);
  }

  cadastro(){
    console.log(this.formLogin);
    this.router.navigate(['/cadastro']);
  }
//Método que exibe a senha
  mostrarSenha() {   
    this.exibir_senha = this.exibir_senha === 'text' ? 'password' : 'text';
 }
 
  /**
   * Método responsável para recuperar a senha
   */
   esqueciSenha() {
    this.router.navigate(['/esqueci-senha']);
  }

}
