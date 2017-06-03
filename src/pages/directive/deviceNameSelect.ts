/**
 * Created by cornerskyless on 2017/5/15.
 */
import { Component , OnInit } from '@angular/core';

import { NavController , NavParams , ViewController, AlertController } from 'ionic-angular';





@Component({
  selector: 'SelectDeviceName',
  templateUrl: 'deviceNameSelect.html'
})
export class SelectDeviceName implements OnInit{

  constructor(

    public navCtrl: NavController,
    public viewCtrl:ViewController,
    public navParams:NavParams,
    public alertCtrl: AlertController,

  ) {}

  deviceNameList:{name:string}[] = [];
  deviceNameListDisplay:{name:string}[] = [];

  ngOnInit(){
    this.deviceNameList = this.navParams.get('deviceNameList');
    this.deviceNameListDisplay = this.navParams.get('deviceNameList');
    console.log(this.deviceNameList);

  }

  itemSelected(deviceName){
    this.viewCtrl.dismiss(deviceName.name);

  }
  dismiss() {
    this.viewCtrl.dismiss("");
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.deviceNameListDisplay = this.deviceNameList;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.deviceNameListDisplay = this.deviceNameList.filter((item) => {
        return (item.name.indexOf(val) >=0);
      })
    }
  }

  inputName(){
    let prompt = this.alertCtrl.create({
      title: '手动输入',
      message: "输入设备名称",
      inputs: [
        {
          name: 'deviceName',
          placeholder: '设备名称'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {}
        },
        {
          text: '确认',
          handler: data => {
            this.viewCtrl.dismiss(data.deviceName);
          }
        }
      ]
    });
    prompt.present();
  }

}
