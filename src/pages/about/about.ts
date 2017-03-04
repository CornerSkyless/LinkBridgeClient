import { Component } from '@angular/core';

import { NavController, ViewController, ModalController, AlertController } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
import { BarcodeScanner } from 'ionic-native';
import { OrderDetailPage } from '../orderDetail/orderDetail'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public notificationService: NotificationService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,

    public viewCtrl:ViewController
  ) {}
  scan(){
    if(this.dataService.isLogin){
      let vm = this;
      BarcodeScanner.scan().then((barcodeData) => {
        if(barcodeData.text){
          vm.dataService.request('queryDeviceLatestOrder',{device_id:barcodeData.text})
            .then((res:Res)=>{
              vm.navCtrl.push(OrderDetailPage,{order_id:res.data.order_id})
            })
            .catch((message)=>{
              vm.notificationService.showBasicAlert('查询失败',message);
            })
        }
      }, () => {

      });

    }else {
      let confirm = this.alertCtrl.create({
        title: '您需要登录后操作',
        message: '是否前往登录页面',
        buttons: [{text: '取消'},
          {
            text: '去登陆',
            handler: () => {
              let modal = this.modalCtrl.create(LoginPage,{});
              modal.showBackButton(true);
              modal.present();
            }
          }
        ]
      });
      confirm.present();
    }

  }
}
