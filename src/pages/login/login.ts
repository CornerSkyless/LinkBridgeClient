import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm:{
    user_account:string;
    user_password:string;
  } = {
    user_account:"测试工厂",
    user_password:"33333333"
  };
  isDoing = {
    login:false
  };
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public notificationService: NotificationService,
    public viewCtrl:ViewController

  ) {}
  needHelp(){
    this.notificationService.showBasicAlert('找回账号密码','请联系我们的客服帮助您找回账号密码');
  }
  login(){
    this.isDoing.login = true;
    this.dataService.request('login',this.loginForm)
      .then((res:Res)=>{
        this.isDoing.login = false;
        if(res.data.user_gateway!='客户') this.notificationService.showBasicAlert('登录失败','App 仅供客户使用');
        else {
          this.dataService.currentUser = res.data;
          this.dataService.isLogin = true;
          this.viewCtrl.dismiss(false);
        }
      })
      .catch((message)=>{
        this.notificationService.showBasicAlert('登录失败',message);
        this.isDoing.login = false;
      })
  }
}
