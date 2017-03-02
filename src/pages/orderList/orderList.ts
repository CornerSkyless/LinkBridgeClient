/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , OnInit, OnChanges , Input } from '@angular/core';
import { NavController , ModalController , NavParams  } from 'ionic-angular';
import { DataService , Res } from '../../service/data.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'order-list',
  templateUrl: 'orderList.html'
})
export class OrderListPage implements OnInit {
  listType:string;
  titles = {
    "goingOrder":{
      method:"listGoingOrder",
      title:"进行中订单"
    },
    "deadOrder":{
      method:"listDeadOrder",
      title:"已失效订单"
    },
    "finishOrder":{
      method:"listFinishOrder",
      title:"已完成订单"
    },
    "maintenanceWaitConfirm":{
      method:"listMaintenanceWaitConfirm",
      title:"待单笔确认订单"
    },
    "printedOrder":{
      method:"listPrintedOrder",
      title:"已开票订单"
    },
    "orderWaitConfirm":{
      method:"listOrderWaitConfirm",
      title:"已开票订单"
    },

    "missionWaitSend":{
      method:"listMissionWaitSend",
      title:"待派派工单列表"
    },
    "missionWaitAccept":{
      method:"listMissionWaitAccept",
      title:"待接派工单列表"
    },

    "historyMission":{
      method:"listHistoryMission",
      title:"被拒绝派工单列表"
    },
    "missionWaitAppoint":{
      method:"listMissionWaitAppoint",
      title:"待预约派工单列表"
    },


    "orderWaitPrint":{
      method:"listOrderWaitPrint",
      title:"待开票列表"
    },
    "orderWaitPay":{
      method:"listOrderWaitPay",
      title:"应收账款列表"
    },
    "orderWaitPayLate":{
      method:"listOrderWaitPayLate",
      title:"超期未付款列表"
    }};
  title:string;
  orderList:any[];
  isDoing = {
    queryOrderList:false
  };
  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public navParams:NavParams
  ) {}

  getOrderList(){
    this.isDoing.queryOrderList = true;
    this.notificationService.startLoading();
    this.dataService.request(this.titles[this.listType].method,{})
      .then((res:Res) =>{
        this.notificationService.stopLoading();
        this.orderList = res.list;
        this.isDoing.queryOrderList = false;
      })
      .catch((message)=>{
        this.notificationService.stopLoading();
        this.notificationService.showBasicAlert('加载失败',message);
      })
  }

  ngOnInit(){
    this.listType = this.navParams.get('listType');
    this.title = this.titles[this.listType].title;
    this.getOrderList();
  }

  showOrderDetail(order_id:string){
    // this.navCtrl.push(OrderDetailPage,{order_id:order_id})
    //   .catch(()=> console.log('should I stay or should I go now'));
    console.log(order_id);
  }
}
