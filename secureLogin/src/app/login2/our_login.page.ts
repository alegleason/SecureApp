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

  mail: any;
  pass: any;
  hasRegistered: boolean;

  users: User[] = [];

  newUser: User = <User>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadUsers();
    });
   }

  ngOnInit () {
    this.hasRegistered = false;
    //this.storageService.clearStorage();
  }
 
  checkCredentialsFront(){
    if(this.mail != undefined && this.pass != undefined){
      this.storageService.checkCredentials(this.mail, this.pass).then(result => {
        if(result){
          this.showToastSuccess('Correct credentials');
          this.router.navigateByUrl('/home');
        }else{
          this.showToastFail('Wrong credentials');
        }
      });
    }
  }

  addUser(){
    if(this.newUser.mail != undefined && this.newUser.pass != undefined){
      this.encryptedText = CryptoJS.AES.encrypt(this.newUser.pass.trim(), this.privateKey.trim()).toString();
      this.newUser.pass = this.encryptedText;

      this.newUser.id = Date.now();
      
      console.log("User " + this.newUser.mail + " saved with password " + this.newUser.pass);

      this.storageService.addUser(this.newUser).then(user => {
        this.newUser = <User>{};
        this.showToastSuccess('User added');
        this.loadUsers();
        this.hasRegistered = true;
      })
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

  /*
  constructor(private db: DatabaseService) { }
  ngOnInit() {
    // Avoid race conditions
    this.db.getDatabaseState().subscribe(ready => {
      if(ready){
        this.db.getUsers().subscribe(usrs => {
          console.log('users changed: ', usrs);
          this.users = usrs;
        })
      }
    })
  }
  addUser(){
    this.db.addUser(this.user['name'], this.user['mail'], this.user['pass'])
    .then(_ => {
      this.user = {};
    })
  }
  */

}
