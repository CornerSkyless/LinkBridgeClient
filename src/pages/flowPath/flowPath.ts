/**
 * Created by cornerskyless on 2017/3/1.
 */
import { Component , OnInit} from '@angular/core';

import { NavController , NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-flow-path',
  templateUrl: 'flowPath.html'
})
export class FlowPathPage implements OnInit{
  serviceType = "homeInstallation";
  viewContent = {
    technicalConsulting:{
      title:'技术咨询',
      bannerImg:"../../assets/jishuzixunBanner.png",
      steps:[
        {
          title:'设备厂家或医院',
          imgUrl:'../../assets/shebeichangjia.png',
          details:[
            "提出医疗设备相关咨询申请"
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu1.png',
          details:[
            "确认上门咨询内容、核价",
            "指定咨询师"
          ]
        },
        {
          title:'专业工程师',
          imgUrl:'../../assets/zhuanyegongchenshi.png',
          details:[
            "预约咨询时间、地点、方式（面谈、电话、书面）",
            "执行咨询任务",
            "给出厂家或医院咨询服务报告",
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu2.png',
          details:[
            "确认咨询服务结果",
            "评价服务满意度"
          ]
        },

      ]
    },
    equipmentMaintenance:{
      title:'设备维修',
      bannerImg:"../../assets/shebeiweixiuBanner.png",
      steps:[
        {
          title:'设备厂家或医院',
          imgUrl:'../../assets/shebeichangjia.png',
          details:[
            "提出医疗设备维修服务申请"
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu1.png',
          details:[
            "确认设备维修申请",
            "指派专业工程师"
          ]
        },
        {
          title:'专业工程师',
          imgUrl:'../../assets/zhuanyegongchenshi.png',
          details:[
            "与医院预约维修时间、地点",
            "维修设备并培训"
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu2.png',
          details:[
            "与厂家或医院确认服务结果",
            "评价服务满意度"
          ]
        },
        {
          title:'设备厂家或医院',
          imgUrl:'../../assets/shebeichangjia.png',
          details:[
            "确认服务清单"
          ]
        }
      ]
    },
    homeInstallation:{
      title:'上门安装',
      bannerImg:"../../assets/shangmenanzhuangBanner.png",
      steps:[
        {
          title:'设备厂家或医院',
          imgUrl:'../../assets/shebeichangjia.png',
          details:[
            "提出医疗设备安装服务申请"
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu1.png',
          details:[
            "确认上门安装申请",
            "指派专业工程师"
          ]
        },
        {
          title:'专业工程师',
          imgUrl:'../../assets/zhuanyegongchenshi.png',
          details:[
            "与医院预约安装时间、地点",
            "安装设备并培训"
          ]
        },
        {
          title:'联桥客服',
          imgUrl:'../../assets/lianqiaokefu2.png',
          details:[
            "与厂家或医院确认服务结果",
            "评价服务满意度"
          ]
        },
        {
          title:'设备厂家或医院',
          imgUrl:'../../assets/shebeichangjia.png',
          details:[
            "确认服务清单"
          ]
        }
      ]
    },
  };
  ngOnInit(){
    this.serviceType = this.navParams.get('serviceType');
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController

  ) {}

  dismiss() {
    this.viewCtrl.dismiss(false);
  }
}
