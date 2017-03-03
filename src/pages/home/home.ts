import { Component } from '@angular/core';

import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

import { FlowPathPage } from '../flowPath/flowPath'
import { OrderListPage } from '../orderList/orderList'
import { NewOrderPage } from '../newOrder/newOrder'
import { LoginPage } from '../login/login'
import { DataService } from '../../service/data.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public dataService: DataService,
  ) {}

  clickOnService(type){
    let modal = this.modalCtrl.create(FlowPathPage,{serviceType:type});
    modal.showBackButton(true);
    modal.present();
  }
  showOrderList(){
    if(this.dataService.isLogin){
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择要查看的列表类型',
        buttons: [
          {
            text: '进行中的订单列表',
            handler: () => {this.navCtrl.push(OrderListPage,{listType:'goingOrder'});}
          },{
            text: '已完成的订单列表',
            handler: () => {this.navCtrl.push(OrderListPage,{listType:'finishOrder'});}
          },{
            text: '已失效的订单列表',
            handler: () => {this.navCtrl.push(OrderListPage,{listType:'deadOrder'});}
          },{
            text: '取消',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      actionSheet.present();
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

  clickOnNewOrder(){
    if(this.dataService.isLogin){
      let modal = this.modalCtrl.create(NewOrderPage,{serviceType:'设备维修'});
      modal.showBackButton(true);
      modal.present();
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
