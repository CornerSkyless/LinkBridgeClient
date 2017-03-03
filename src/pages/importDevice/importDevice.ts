/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , OnInit } from '@angular/core';

import { NavController , NavParams , ViewController } from 'ionic-angular';

import { DataService } from '../../service/data.service';

import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'ImportDevice',
  templateUrl: 'importDevice.html'
})
export class ImportDevicePage implements OnInit{

  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public viewCtrl:ViewController,
    public navParams:NavParams
  ) {}

  isDoing = {
    submit:false
  };



  ngOnInit(){

  }

  dismiss() {
    this.viewCtrl.dismiss(false);
  }




  submit(form){
    this.isDoing.submit = true;
    this.dataService.request('importDevice',form)
      .then(()=>{
        this.isDoing.submit = false;
        if(!this.navParams.get('noShowSuccess')) this.notificationService.showBasicAlert('录入成功','');
        this.viewCtrl.dismiss(form.device_id);
      })
      .catch((message)=>{
        this.isDoing.submit = false;
        this.notificationService.showBasicAlert('录入失败',message);
    });

  }



}
