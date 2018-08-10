import { Component,OnInit } from '@angular/core';

import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

import { FlowPathPage } from '../flowPath/flowPath'
import { OrderListPage } from '../orderList/orderList'
import { NewOrderPage } from '../newOrder/newOrder'
import { LoginPage } from '../login/login'
import { ScanPage } from '../scan/scan'
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
import { CallNumber } from 'ionic-native';
import { OrderDetailPage } from '../orderDetail/orderDetail'
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { WebViewPage } from '../webView/webView'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  mySlideOptions = {
    setWrapperSize:false,
    loop:true,
    autoplay:1500,
    speed:1000
  };
  ngOnInit(){
    this.dataService.checkLogin();
    this.dataService.request('listNewsHistory',{})
      .then((res:Res) =>{
        let newsIdList = res.list.map((news)=>{return news.id});
        this.dataService.checkUnreadNews(newsIdList);
      })
  }
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public dataService: DataService,
    public notificationService: NotificationService,
    private safariViewController: SafariViewController,
    private iab: InAppBrowser
  ) {}
  goWebsite(){
    this.safariViewController.isAvailable()
      .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: 'http://www.linkbridgemed.cn/',
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
              .then((result: any) => {
                  if(result.event === 'opened') console.log('Opened');
                  else if(result.event === 'loaded') console.log('Loaded');
                  else if(result.event === 'closed') console.log('Closed');
                },
                (error: any) => console.error(error)
              );

          } else {
            const browser = this.iab.create('http://www.linkbridgemed.cn/', '_blank',{location:"no",zoom:"no"});
            browser.show();
          }
        }
      );
  }
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
  showOrderWaitCommentList(){
    if(this.dataService.isLogin){
      this.navCtrl.push(OrderListPage,{listType:'orderWaitComment'});

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
  login(){
    let modal = this.modalCtrl.create(LoginPage,{});
    modal.showBackButton(true);
    modal.present();
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
  searchOrder() {
    let prompt = this.alertCtrl.create({
      title: '查询订单',
      message: "输入订单号码",
      inputs: [
        {
          name: 'order_id',
          placeholder: '订单号'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {}
        },
        {
          text: '查询',
          handler: data => {
            this.navCtrl.push(OrderDetailPage,{order_id:data.order_id})
          }
        }
      ]
    });
    prompt.present();
  }
  clickOnTel(){
    let confirm = this.alertCtrl.create({
      title: '联系客服',
      message: '0512-68078142',
      buttons: [{text: '取消'},
        {
          text: '拨打',
          handler: () => {
            CallNumber.callNumber('0512-68078142', true);
          }
        }
      ]
    });
    confirm.present();
  }
  clickOnWechat(){
    let modal = this.modalCtrl.create(ScanPage,{});
    modal.showBackButton(true);
    modal.present();
  }
}
