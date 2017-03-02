/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class NotificationService{
  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ){}

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
  showBasicAlert(title:string,subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确认']
    });
    alert.present();
  }

  loading = this.loadingCtrl.create({
    content: '加载中'
  });

  startLoading() {
    this.loading = this.loadingCtrl.create({
      content: '加载中'
    });
    this.loading.present();
  }
  stopLoading() {
    this.loading.dismiss();
  }


}
