import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /* Handle the case when app is sent to background */
      this.platform.pause.subscribe(() => {
        this.lockApp();
      });
    });
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
