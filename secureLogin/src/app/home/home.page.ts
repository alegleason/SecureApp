import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { StorageService, User } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: User[] = [];

  constructor(private modalCtrl: ModalController, private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadUsers();
    });
   }

   loadUsers(){
    this.storageService.getUsers().then(users => {
      this.users = users;
    });
  }


  /* After 30 seconds of inactivity, I want to lock it again!
  constructor(private modalCtrl: ModalController) {
    setTimeout(() => {
      this.lockApp();
    }, 30000);
  }*/

  async lockApp() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      backdropDismiss: false,
      cssClass: 'login-modal',
      componentProps: {
        isModal: true
      }
    });
    modal.present();
  }

}
