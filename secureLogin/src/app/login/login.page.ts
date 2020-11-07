import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input()isModal: boolean;
  // Implement the finger print all-in-one
  constructor(private faio: FingerprintAIO, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    /* Hide the headers if we are dealing with the modal version */
    console.log('i am a modal: ', this.isModal)
  }

  login(){
    /* This is what actually displays the */
    this.faio.show({
      title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      subtitle: 'Implemented by Alejandro Gleason', // (Android Only) | optional | Default: null
      description: 'Please authenticate', // optional | Default: null
      fallbackButtonTitle: 'Use Backup', // optional | 
      disableBackup: false,  // When disableBackup is true defaults to "Cancel", is false defaults to "Use Pin".
    }).then(() => {
      if(this.isModal){
        /* If we are already inside the page, just dismiss the modal */
        this.modalCtrl.dismiss();
      }else{
        this.router.navigateByUrl('/login2');
      }
    }).catch((error: any) => {
      console.log('err: ', error);
    });
  }
}
