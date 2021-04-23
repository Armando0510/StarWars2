import { Component, OnInit } from '@angular/core';


import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  formEsqueci: FormGroup;

  constructor(public toast:ToastController,
    private fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formEsqueci = this.fb.group({
      email: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
    });
  }

  async enviar(){
    console.log('Clicou em esqueceu a senha');
    this.router.navigate(['/home'])
    const toast = await this.toast.create({
      message: "Um novo email com sua senha foi enviado para seu E-mail.",
      duration: 3000
    });
    toast.present();
  }
  }


