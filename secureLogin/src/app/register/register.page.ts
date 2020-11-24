import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, User } from '../services/storage.service';
import { ToastController, IonList, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  unencryptedText:string = "";
  encryptedText:string = "";

  privateKey:string = 'SeguridAd2020';

  email: string;
  password: any;
  hasRegistered: boolean = true;

  users: User[] = [];

  newUser: User = <User>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(private plt: Platform, private storageService: StorageService, private router: Router, private toastController: ToastController, private authService: AuthService) {
    this.plt.ready().then(() => {
      this.loadUsers();
    });
  }

  ngOnInit () {
    //this.storageService.clearStorage();
  }

  OnSubmitRegister(){
    this.authService.signup(this.email, this.password).then(res => {
      this.showToastSuccess('Succesfully registered');
      this.router.navigateByUrl('/login');
    }).catch(err => {
      this.showToastFail('Weak password! Password should be at least 6 characters');
    })

    this.addUser();
  }

  addUser(){
    if(this.email != undefined && this.password != undefined){
      if(this.password.length < 6){
        this.showToastFail('Weak password! Password should be at least 6 characters');
      }else{
        this.encryptedText = CryptoJS.AES.encrypt(this.password.trim(), this.privateKey.trim()).toString();
        this.password = this.encryptedText;
        this.newUser.id = Date.now();
        this.newUser.pass = this.password;
        this.newUser.mail = this.email;
        
        console.log("User " + this.newUser.mail + " saved with password " + this.newUser.pass);

        this.storageService.addUser(this.newUser).then(user => {
          this.newUser = <User>{};
          this.showToastSuccess('User added');
          this.loadUsers();
          this.hasRegistered = true;
        })
      }
    }
  }

  loadUsers(){
    this.storageService.getUsers().then(users => {
      this.users = users;
    });
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
