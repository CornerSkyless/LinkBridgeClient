import { Component } from '@angular/core';

import { NavController, ViewController, ModalController } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
import { BarcodeScanner } from 'ionic-native';
import { OrderDetailPage } from '../orderDetail/orderDetail'

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
    public viewCtrl:ViewController
  ) {}
  scan(){
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
  }
}
