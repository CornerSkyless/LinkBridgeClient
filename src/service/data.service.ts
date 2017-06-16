/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Injectable } from '@angular/core';
import { Http , Response , Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
const urls = {
  'A029401':'192.168.3.114/',
  'testServer':'114.55.136.29/Local-',
  'linkServer':'114.55.233.103/',
  'office':'10.1.1.201/'
};
const url = urls['linkServer'];

const backHost = 'http://' +url+ 'LinkBridgeMed-Api/index.php';
const FileHost = 'http://' + url + 'LinkBridgeMed-Api/';
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
  isFilledData:boolean;
}
class NewOrderForm{
  order_broken_detail="";
  order_device_id="";
  order_service_type="";
  order_broken_img_list=[];
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
  fileHost:string;
  unreadNews:string[] = [];
  constructor(
    private http: Http,private storage: Storage
  ) {
    this.fileHost = FileHost;

  }
  currentUser:UserInfo;
  isLogin = false;
  isFilledData = false;
  checkLogin = function () {
    this.storage.ready().then(() => {

      this.storage.get('currentUser').then((val) => {
        if(val.hasOwnProperty('user_id')){
          this.currentUser = val;
          this.isLogin = true;
          this.isFilledData = this.currentUser.isFilledData;
        }
      });

    });
  };
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
  upload = function (form) {
    return new Promise((resolve,reject)=>{
      this.http.post(backHost,form)
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
    this.storage.ready().then(() => {
      this.storage.set('currentUser',{});
    });
    this.isLogin = false;

  };
  checkUnreadNews = function (newsList:string[]) {
    this.storage.ready()
      .then(()=>{
        this.unreadNews = [];
        return this.storage.get('readNewsList');
      })
      .then((val)=>{
        if(val){
          newsList.forEach((id)=>{
            if(val.indexOf(id)<0) this.unreadNews.push(id);
          })
        }else {
          this.unreadNews = newsList;
        }
      })
  };
  readNews = function (id:string,newsList:string[]) {
    this.storage.ready()
      .then(()=>{
        this.unreadNews = [];
        return this.storage.get('readNewsList');
      })
      .then((val)=>{
        if(val) val.push(id);
        else val = [id];
        return this.storage.set('readNewsList',val);
      })
      .then(()=>{
        this.checkUnreadNews(newsList);
      })
  };
  readAllNews = function (newsList:string[]) {
    this.storage.ready()
      .then(()=>{
        return this.storage.set('readNewsList',newsList);
      })
      .then(()=>{
        this.checkUnreadNews(newsList);
      })
  }
}
export {DataService,Res,NewOrderForm,ImportDeviceForm,FileHost}
