/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , OnInit } from '@angular/core';

import { NavController , NavParams , ModalController } from 'ionic-angular';

import { DataService, Res } from '../../service/data.service';
import { NotificationService } from '../../service/notification.service';
import { CommentPage } from '../comment/comment'

const checkTime = function(time:string) {
  if(time){
    if(time>'2000') return true
  }
  return false
};

@Component({
  selector: 'OrderDetail',
  templateUrl: 'orderDetail.html'
})
export class OrderDetailPage implements OnInit{

  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
  ) {}

  order_id:string;
  order:any;
  panel:string='订单详情';

  orderStatus = {};
  isRevokeOrder = false;

  getOrderInfo(){
    this.notificationService.startLoading();
    this.dataService.request('queryOrder',{order_id:this.order_id})
      .then(
        (res:Res)=>{
          this.order = res.data;
          this.orderStatus = {
            "待确认":checkTime(this.order.order_filled_time),
            "待派工":checkTime(this.order.order_confirmed_time),
            "待接受":checkTime(this.order.order_sent_time),
            "待预约":checkTime(this.order.order_accepted_time),
            "待上门服务":checkTime(this.order.order_appointed_time),
            "待单笔确认":checkTime(this.order.maintenance_completed_time),
            "已单笔确认":checkTime(this.order.order_maintenance_confirmed_time),
            "已收款":checkTime(this.order.order_payed_time),
            "已开票":checkTime(this.order.order_billed_time),
            "已结清":checkTime(this.order.order_finished_time),
            "已失效":"被撤销,预约失败,单笔不确认".indexOf(this.order.order_status)>=0
          };
          this.notificationService.stopLoading()

        }
      )
      .catch((message)=>{
        this.notificationService.stopLoading();
        this.notificationService.showBasicAlert('加载失败',message);
        this.navCtrl.pop();
      })
  }

  ngOnInit(){
    this.order_id = this.navParams.get('order_id');
    this.getOrderInfo();
  }

  revokeOrder(){
    this.isRevokeOrder = true;
    this.dataService.request('revokeOrder',{order_id:this.order.order_id})
      .then(()=>{
        this.isRevokeOrder = false;

        this.notificationService.showBasicAlert('撤销成功','');
        this.navCtrl.pop();
      })
      .catch((message)=>{
        this.isRevokeOrder = false;
        this.notificationService.showBasicAlert('撤销失败',message)
      })
  }

  comment(){
    let modal = this.modalCtrl.create(CommentPage,{order_id:this.order.order_id});
    modal.showBackButton(true);
    modal.present();
  }

}
