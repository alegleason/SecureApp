import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, User } from '../services/storage.service';
import { Platform, ToastController, IonList, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {
  unencryptedText:string = "";
  encryptedText:string = "";

  privateKey:string = 'SeguridAd2020';

  email: string;
  password: any;
  hasRegistered: boolean = true;

  users: User[] = [];

  newUser: User = <User>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(private router: Router, private toastController: ToastController, private authService: AuthService) {

   }

  ngOnInit () {

  }

  OnSubmitLogin(){
    this.authService.login(this.email, this.password).then(res => {
      this.showToastSuccess('Correct credentials');
      this.router.navigateByUrl('/home');
    }).catch(err => {
      this.showToastFail('Wrong credentials');
    })
  }


  async showToastSuccess(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  async showToastFail(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

}
