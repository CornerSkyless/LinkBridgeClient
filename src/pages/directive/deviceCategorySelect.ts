/**
 * Created by cornerskyless on 2016/12/15.
 */


import { Component  , Input , Output , EventEmitter , OnChanges } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { SelectDeviceName } from './deviceNameSelect';

import { NavController , NavParams , ModalController , ViewController , AlertController} from 'ionic-angular';

import { DataService , Res } from '../../service/data.service';


@Component({
  selector: 'device-category-select',
  templateUrl: 'deviceCategorySelect.html'
})
export class DeviceCategorySelect implements OnChanges{
  @Input()  deviceName:string;
  @Input() deviceCategory:string;

  @Output() deviceNameChange = new EventEmitter<string>();
  @Output() deviceCategoryChange = new EventEmitter<string>();

  categoryNameList:any[];
  deviceNameList:any[];

  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
  public modalCtrl: ModalController,

  ) {}



  change(){
    this.deviceCategoryChange.emit(this.deviceCategory);
    this.deviceNameChange.emit(this.deviceName);
  }

  ngOnChanges(changes){
    this.dataService.request('listDeviceCategory',{})
      .then((res:Res)=>{
        this.categoryNameList = res.data;
        this.categoryNameList.forEach(categoryName => {
          if(categoryName.name==this.deviceCategory) this.deviceNameList = categoryName.deviceNames
        });
      })
      .catch((message)=>{
        this.notificationService.showBasicAlert("获取设备类型列表失败",message)
      })
  }


  selectCategory(){
    this.deviceName="";
    this.categoryNameList.forEach(
      categoryName=> { if(categoryName.name==this.deviceCategory) this.deviceNameList = categoryName.deviceNames }
    );
    this.change();
  }

  selectName(){
    let modal = this.modalCtrl.create(SelectDeviceName,{deviceNameList:this.deviceNameList});

    modal.showBackButton(true);
    modal.onDidDismiss(res => {
      if(res){
        this.deviceName=res;
        this.change();
      }else {
        console.log('Nothing happened');
      }
    });
    modal.present();
  }


}
