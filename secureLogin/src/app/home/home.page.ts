import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* After 30 seconds of inactivity, I want to lock it again! */
  constructor(private modalCtrl: ModalController) {
    setTimeout(() => {
      this.lockApp();
    }, 30000);
  }

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
