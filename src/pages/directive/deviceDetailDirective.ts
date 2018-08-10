/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , Input } from '@angular/core';

import { NavController , NavParams , ModalController } from 'ionic-angular';

import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'device-detail',
  templateUrl: 'deviceDetailDirective.html'
})
export class DeviceDetailDirective {

  constructor(

    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private notificationService:NotificationService,


    public navParams: NavParams,
  ) {}


  @Input() device;



  showDetail(text:string){
    this.notificationService.showBasicAlert('',text);
  }

  getFullHospitalAddress():string{
    return this.device.device_hospital_region_province+
      this.device.device_hospital_region_county+
      this.device.device_hospital_region_city+
      this.device.device_hospital_region_address
  }
  getFullFactoryAddress():string{
    return this.device.device_factory_region_province+
      this.device.device_factory_region_county+
      this.device.device_factory_region_city+
      this.device.device_factory_region_address
  }



}
