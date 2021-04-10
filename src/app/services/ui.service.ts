import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async alertInfo(message: string) {
    const alert = await this.alertCtrl.create({
      // header: '',
      // subHeader: '',
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }
}
