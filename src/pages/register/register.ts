/**
 * Created by cornerskyless on 2017/3/3.
 */
import { Component,ChangeDetectorRef,AfterViewInit } from '@angular/core';
import  AV  from 'leancloud-storage';
import { NavController, ViewController,  } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'

let APP_ID = 'g8uUbBT6Osbx1lFxAkmelE2f-gzGzoHsz';
let APP_KEY = '73LX9xihYV3ajAEVpeVyNGi1';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements AfterViewInit{

  form = {
    customer_tel:"13636521516",
    customer_name:"北京市同济医院",
    customer_password:"11111111",
    password2:"11111111",
    code:"",
    customer_position:"工厂客户"
  };
  isDoing = {
    register:false,
    count:false
  };
  count:number;
  timer:any;
  isSend = false;
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public notificationService: NotificationService,
    public viewCtrl:ViewController,
    private cdr: ChangeDetectorRef

  ) {}
  beginCount(){
    console.log('count begin');
    this.count = 60;
    this.isSend = true;
    this.isDoing.count = true;
    this.timer = setInterval(
      ()=>{
        if(this.count>0) {
          this.count--;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        } else {
          this.isDoing.count = false;
          clearInterval(this.timer);
        }
      }
      ,1000)
  }
  getCode(){
    let vm = this;
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: this.form.customer_tel,
      name: '联桥医疗',
      op: '注册用户',
      ttl: 10
    }).then(function(){
      vm.beginCount();
    }, function(err){
      this.notificationService.showBasicAlert('发送验证码失败',err.message);
    });
  }
  register(){
    if(this.form.customer_password!=this.form.password2){
      this.notificationService.showBasicAlert('注册失败','两次输入的密码不一样');
      return;
    }
    if(!this.form.customer_password||!this.form.customer_name){
      this.notificationService.showBasicAlert('注册失败','请输入单位名称');
      return;
    }
    this.isDoing.register = true;
    let vm = this;
    AV.Cloud.verifySmsCode(this.form.code, this.form.customer_tel).then(function(){

      console.log(vm.dataService);

      vm.dataService.request('registerInApp',vm.form)
        .then(()=>{
          vm.notificationService.showBasicAlert('注册成功','');
          clearInterval(vm.timer);
          vm.viewCtrl.dismiss(false);
        },(message)=>{
          vm.notificationService.showBasicAlert('注册失败',message);
        })
    }, function(err){
      console.log(222);

      vm.notificationService.showBasicAlert('注册失败',err.message);
    });
  }
}
