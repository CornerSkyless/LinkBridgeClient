import { Component } from '@angular/core';

import { NavController, ViewController, ModalController } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
import { RegisterPage } from '../register/register'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm:{
    user_account:string;
    user_password:string;
  } = {
    user_account:"",
    user_password:""
  };
  isDoing = {
    login:false
  };
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public notificationService: NotificationService,
    public modalCtrl: ModalController,
    public viewCtrl:ViewController,
    public storage: Storage

  ) {}
  needHelp(){
    this.notificationService.showBasicAlert('找回账号密码','请联系我们的客服帮助您找回账号密码');
  }
  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  login(){
    this.isDoing.login = true;
    this.dataService.request('login',this.loginForm)
      .then((res:Res)=>{
        this.isDoing.login = false;

        if(res.data.user_gateway!='客户') this.notificationService.showBasicAlert('登录失败','App 仅供客户使用');
        else {
          this.dataService.currentUser = res.data;

          return this.dataService.request('checkCustomerIsFilledInformation',{customer_id:res.data.user_id})
        }
      })
      .then((res:Res)=>{
        if(res){
          this.dataService.isFilledData = res.data.is_filled_data;
          this.dataService.isLogin = true;
          this.storage.ready().then(() => {

            this.storage.set('currentUser',this.dataService.currentUser);
          });
          this.viewCtrl.dismiss(false);
        }

      })
      .catch((message)=>{
        this.notificationService.showBasicAlert('登录失败',message);
        this.isDoing.login = false;
      })
  }
  register(){
    let modal = this.modalCtrl.create(RegisterPage,{});
    modal.showBackButton(true);
    modal.present();
  }
}
