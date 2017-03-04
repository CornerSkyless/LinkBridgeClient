/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , OnInit  } from '@angular/core';

import { NavController , NavParams , ModalController , ViewController , AlertController} from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { DataService ,Res,NewOrderForm } from '../../service/data.service';
import { NotificationService } from '../../service/notification.service';

import { ImportDevicePage } from '../importDevice/importDevice'

@Component({
  selector: 'newOrder',
  templateUrl: 'newOrder.html'
})
export class NewOrderPage implements OnInit{

  device_id:string;
  device;
  selectedDevice = false;
  isSubmitting = false;
  form:NewOrderForm = new NewOrderForm();

  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl:ViewController
  ) {}



  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  ngOnInit(){
    this.form.order_service_type = this.navParams.get('serviceType');
  }

  inputDeviceId() {
    let prompt = this.alertCtrl.create({
      title: '输入设备序列号',
      inputs: [
        {
          name: 'device_id',
          placeholder: '序列号'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: data => {
            this.getDeviceInfo(data.device_id);
          }
        }
      ]
    });
    prompt.present();
  }

  scan(){
    let vm = this;
    BarcodeScanner.scan().then((barcodeData) => {
      if(barcodeData.text){
        vm.getDeviceInfo(barcodeData.text);
      }
    }, () => {

    });
  }

  importDevice(){
    if(this.dataService.isFilledData){
      let modal = this.modalCtrl.create(ImportDevicePage,{noShowSuccess:true});

      modal.showBackButton(true);
      modal.onDidDismiss(res => {
        if(res){
          this.getDeviceInfo(res);
        }else {
          console.log('Nothing happened');
        }
      });
      modal.present();
    }else {
      let confirm = this.alertCtrl.create({
        title: '您需要补全信息后操作',
        message: '请等待工作人员补全信息',
        buttons: [{text: '取消'}, {text: '确认'}]
      });
      confirm.present();
    }

  }

  getDeviceInfo(device_id){
    this.notificationService.startLoading();
    this.dataService.request('queryDevice',{device_id:device_id})
      .then((res:Res)=>{

        this.device = res.data;
        this.selectedDevice = true;
        this.notificationService.stopLoading();

      })
      .catch((message)=>{
        this.notificationService.stopLoading();
        this.notificationService.showBasicAlert('读取设备信息失败',message);
      })
  }

  submit(){
    this.isSubmitting = true;
    this.form.order_device_id = this.device.device_id;
    this.dataService.request('newOrder',this.form)
      .then(()=>{
        this.isSubmitting = false;
        this.notificationService.showBasicAlert('下单成功','');
        this.viewCtrl.dismiss();
      })
      .catch((message)=>{
        this.isSubmitting = false;
        this.notificationService.showBasicAlert('下单失败',message);
      });


  }


}
