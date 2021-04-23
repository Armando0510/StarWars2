import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalController, ToastController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formCadastro: FormGroup;
  password_type: string = 'password';

  // Variáveis para o calendário datepicker
  datePickerObj: any = {};
  datePickerObjAux: any = {};
  selectedDate;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public modalCtrl: ModalController,
    private http: HttpClient,
    public toast: ToastController,
    ) { }

  ngOnInit() {

    this.createForm();
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
  }

  createForm() {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
      senha: ['', Validators.required],
      confSenha: ['', Validators.required],
      valorCheck: [false],
      cep: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }


  /**
  * Método que abre o datepicker
 */
  async openDatePicker() {
    // Inicializa o objeto calendário datepicker
    this.datePickerObj = {
      dateFormat: 'DD/MM/YYYY',
      weeksList: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthsList: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',],
      todayLabel: "Hoje",
      setLabel: "Ok",
      closeLabel: "Fechar",
      titleLabel: "Data de Nasc.",
      momentLocale: "pt-br",
      inputDate: new Date(),
      clearButton: false,
      showTodayButton: false,
    };

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        'objConfig': this.datePickerObj,
        'selectedDate': this.selectedDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then((data) => {
      this.selectedDate = '';
      if (data.data.date.match(/[\/]/g)) {
        this.selectedDate = data.data.date;
        this.formCadastro.get('dataNascimento').setValue(this.selectedDate);
      };
    });
  }
  buscaCEP() {


    let cepAux = this.formCadastro.get('cep').value;
    cepAux = cepAux.replace(".", "");
    cepAux = cepAux.replace("-", "");

    let apiCEP = 'http://viacep.com.br/ws/' + cepAux + '/json';
    this.http.get(apiCEP).subscribe(async (adr: any) => {
      if (adr.erro) {

      } else {
        this.formCadastro.get('rua').setValue(adr.logradouro);
        this.formCadastro.get('bairro').setValue(adr.bairro);
        this.formCadastro.get('cidade').setValue(adr.localidade);
        this.formCadastro.get('estado').setValue(adr.uf);
      }

    }, async (err) => {

      console.error(err);
    });
  }

  async cadastrar() {
    console.log(this.formCadastro);

     // Senha não são iguais
      if (this.formCadastro.get('senha').value !== this.formCadastro.get('confSenha').value) {
      
        const toast = await this.toast.create({
          message: "As senhas não são iguais. Por favor verifique.",
          duration: 3000
        });
        toast.present();
      }

      else if (this.formCadastro.get('senha').value.length < 4) {
        
        const toast = await this.toast.create({
          message: "A senha não pode ser menor que 4 caracteres",
          duration: 3000
        })
        toast.present();
      }
      this.router.navigate(['/home'])
  }

  

mostrarSenha() {   
   this.password_type = this.password_type === 'text' ? 'password' : 'text';
}

}



