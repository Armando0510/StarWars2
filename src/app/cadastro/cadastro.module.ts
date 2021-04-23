import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { ModalController } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    BrMaskerModule
    
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
