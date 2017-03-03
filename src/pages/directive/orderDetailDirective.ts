/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , Input , OnChanges} from '@angular/core';

import { NavController , NavParams , ModalController } from 'ionic-angular';

import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'order-detail',
  templateUrl: 'orderDetailDirective.html'
})
export class OrderDetailDirective implements OnChanges{

  constructor(

    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private notificationService:NotificationService,


    public navParams: NavParams,
  ) {}

  checkTime(time:string) {
    if(time){
      if(time>'2000') return true
    }
    return false
  };

  @Input() order;
  orderStatus={};

  ngOnChanges(changes){

    if(this.order){
      this.orderStatus = {
        "待确认":this.checkTime(this.order.order_filled_time),
        "待派工":this.checkTime(this.order.order_confirmed_time),
        "待接受":this.checkTime(this.order.order_sent_time),
        "待预约":this.checkTime(this.order.order_accepted_time),
        "待上门服务":this.checkTime(this.order.order_appointed_time),
        "待单笔确认":this.checkTime(this.order.maintenance_completed_time),
        "已单笔确认":this.checkTime(this.order.order_maintenance_confirmed_time),
        "已收款":this.checkTime(this.order.order_payed_time),
        "已开票":this.checkTime(this.order.order_billed_time),
        "已结清":this.checkTime(this.order.order_finished_time),
        "已失效":"被撤销,预约失败,单笔不确认".indexOf(this.order.order_status)>=0
      };
    }

    console.log(this.orderStatus);
  }

  showDetail(text:string){
    this.notificationService.showBasicAlert('',text);
  }


}
