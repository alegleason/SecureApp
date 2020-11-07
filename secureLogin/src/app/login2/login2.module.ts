import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Login2PageRoutingModule } from './login2-routing.module';

import { Login2Page } from './login2.page';
import { InputModule } from '../components/input/input.module';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    Login2PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Login2Page],
  providers: [
    SQLite,
    SQLitePorter
  ]
})
export class Login2PageModule {}
