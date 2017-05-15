/**
 * Created by cornerskyless on 2017/5/15.
 */
import { Component , OnInit } from '@angular/core';

import { NavController , NavParams , ViewController } from 'ionic-angular';





@Component({
  selector: 'SelectDeviceName',
  templateUrl: 'deviceNameSelect.html'
})
export class SelectDeviceName implements OnInit{

  constructor(

    public navCtrl: NavController,
    public viewCtrl:ViewController,
    public navParams:NavParams
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

}
