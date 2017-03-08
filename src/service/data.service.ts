/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Injectable } from '@angular/core';
import { Http , Response , Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
const urls = {
  'A029401':'192.168.3.114/',
  'testServer':'114.55.136.29/Local-',
  'linkServer':'114.55.233.103/',
  'office':'192.168.199.175/'
};
const url = urls['linkServer'];

const backHost = 'http://' +url+ 'LinkBridgeMed-Api/index.php';

class Res{
  data:any;
  list:any[];
  errorInfo:string;
  result:boolean;
}

class UserInfo{
  user_account:string;
  user_gateway:string;
  user_id:string;
  user_name:string;
  user_type:string;
  uuid:string;
}
class NewOrderForm{
  order_broken_detail="";
  order_device_id="";
  order_service_type="";
}
class ImportDeviceForm{
  device_category="";
  device_department="";
  device_department_contact_name="";
  device_department_contact_tel="";
  device_factory_contact_name="";
  device_factory_contact_tel="";
  device_factory_name="";
  device_factory_region_address="";
  device_factory_region_city="";
  device_factory_region_county="";
  device_factory_region_province="";
  device_hospital_device_contact_name="";
  device_hospital_device_contact_tel="";
  device_hospital_name="";
  device_hospital_region_address="";
  device_hospital_region_city="";
  device_hospital_region_county="";
  device_hospital_region_province="";
  device_id="";
  device_life_begin_date="";
  device_life_last="";
  device_model="";
  device_name="";
}
@Injectable()
class DataService {
  constructor(
    private http: Http) {
  }
  currentUser:UserInfo;
  isLogin = false;
  isFilledData = false;
  request = function (method,form) {
    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      form.method = method;
      form.user = this.currentUser;
      this.http.post(backHost, JSON.stringify(form), {headers:headers})
        .map((res:Response) => res.json())
        .subscribe(
          response => {
            if(response){
              if(response.result) resolve(response);
              else  reject(response.errorInfo);
            }else reject('未返回数据');
          },
          err => reject(err),
        )
    })
  };
  logout = function () {
    this.currentUser = {};
    this.isLogin = false;
  }


}
export {DataService,Res,NewOrderForm,ImportDeviceForm}
