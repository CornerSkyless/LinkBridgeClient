/**
 * Created by cornerskyless on 2016/12/15.
 */


import { Component  , Input , Output , EventEmitter , OnChanges } from '@angular/core';
import { NotificationService } from '../../service/notification.service';


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
    private notificationService:NotificationService

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


}
