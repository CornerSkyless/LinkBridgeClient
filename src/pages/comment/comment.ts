import { Component } from '@angular/core';

import { NavController, ViewController, ModalController,NavParams } from 'ionic-angular';
import { DataService,Res } from '../../service/data.service'
import { NotificationService } from '../../service/notification.service'
import { RegisterPage } from '../register/register'

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  form = {
    order_id:"",
    order_rank:5,
    order_comment:""
  };
  isDoing = {
    comment:false
  };
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public notificationService: NotificationService,
    public modalCtrl: ModalController,
    public viewCtrl:ViewController,
    public navParams: NavParams,

  ) {}

  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  ngOnInit(){
    this.form.order_id = this.navParams.get('order_id');
  }
  comment(){
    this.isDoing.comment = true;
    this.dataService.request('commentOrder',this.form)
      .then(()=>{
        this.isDoing.comment = false;

        this.notificationService.showBasicAlert('评价成功','');
        this.viewCtrl.dismiss(false);

      })
      .catch((message)=>{
        this.notificationService.showBasicAlert('评价失败',message);
        this.isDoing.comment = false;
      })
  }
}
