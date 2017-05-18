/**
 * Created by cornerskyless on 2016/12/16.
 */

import { Component , OnInit , Input , Output , EventEmitter } from '@angular/core';

import { NavController , NavParams } from 'ionic-angular';

import { DataService , Res , ImportDeviceForm} from '../../service/data.service';

import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'import-device-form',
  templateUrl: 'importDeviceForm.html'
})
export class ImportDeviceFormDirective implements OnInit{

  @Output() submitEvent = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter();

  @Input() isSubmitting:boolean;
  @Input() updateMode:boolean = false;


  form:ImportDeviceForm = new ImportDeviceForm();
  device_id:string;
  disableFactory:boolean = false;
  disableHospital:boolean = false;

  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {}


  autoCompleteCustomer(){
    let method = this.dataService.currentUser.user_type=='工厂客户' ? 'queryFactory' : 'queryHospital';
    this.dataService.request(method,{customer_name:this.dataService.currentUser.user_name})
      .then((res:Res)=>{
          if(method=='queryFactory'){
            this.form.device_factory_region_province = res.data.customer_region_province;
            this.form.device_factory_region_city = res.data.customer_region_city;
            this.form.device_factory_region_county = res.data.customer_region_county;
            this.form.device_factory_region_address = res.data.customer_region_address;
            this.form.device_factory_name = res.data.customer_account;
            this.form.device_factory_contact_name = res.data.customer_contact_name;
            this.form.device_factory_contact_tel = res.data.customer_contact_tel;
            this.disableFactory = true;
          }else {
            this.form.device_hospital_region_province = res.data.customer_region_province;
            this.form.device_hospital_region_city = res.data.customer_region_city;
            this.form.device_hospital_region_county = res.data.customer_region_county;
            this.form.device_hospital_region_address = res.data.customer_region_address;
            this.form.device_hospital_name = res.data.customer_account;
            this.form.device_hospital_device_contact_name = res.data.customer_device_contact_name;
            this.form.device_hospital_device_contact_tel = res.data.customer_device_contact_tel;
            this.disableHospital = true;
          }
        }
      )
      .catch((message)=>{
        this.notificationService.showBasicAlert('获取数据失败',message);
        this.errorEvent.emit();
      })
  }

  autoComplete(idChange:boolean){

    this.dataService.request('queryDevice',{device_id:this.device_id})
      .then((res:Res)=>{
        for(let key in this.form){this.form[key] = res.data[key];}
        this.disableFactory = this.dataService.currentUser.user_type=='工厂客户';
        this.disableHospital = this.dataService.currentUser.user_type=='医院客户';
        if(idChange) this.makeRandomId();
      })
      .catch((message)=>{
        this.notificationService.showBasicAlert('获取数据失败',message);
        this.errorEvent.emit();
      })
  }

  ngOnInit(){
    this.device_id = this.navParams.get('device_id');
    if(this.updateMode) this.autoComplete(false);
    else this.autoCompleteCustomer();
  }

  withImport(){
    this.dataService.request('queryLatestOrderId',{})
      .then((res:Res)=>{
        let order_id = res.data.latest_order_id;
        return this.dataService.request('queryOrder',{order_id:order_id})
      })
      .then((res:Res)=>{
        this.device_id = res.data.device_id;
        this.autoComplete(true);
      })
      .catch((message)=>{
        this.notificationService.showBasicAlert('未找到上次订单',message);
      })
  }

  makeRandomId(){
    let str:string = "LINK";
    for(let i=0;i<12;i++){
      str+=Math.floor(Math.random() * 9);
    }
    this.form.device_id = str;
  }



  submit(){
    console.log(this.form);
    for(let key in this.form){
      if(this.form[key] == ""){
        this.notificationService.showBasicAlert('操作失败','请填写所有字段');
        return;
      }
    }
    this.submitEvent.emit(this.form);
  }


}
