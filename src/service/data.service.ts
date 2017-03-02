/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Injectable } from '@angular/core';
import { Http , Response , Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

const backHost = "http://114.55.136.29/Local-LinkBridgeMed-Api/index.php";

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

@Injectable()
class DataService {
  constructor(
    private http: Http) {
  }
  currentUser:UserInfo;
  isLogin = false;
  request = function (method,form) {
    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      form.method = method;
      this.http.post(backHost, JSON.stringify(form), {headers:headers})
        .map((res:Response) => res.json())
        .subscribe(
          response => {
            if(response){
              if(response.result){
                resolve(response);
              }else {
                reject(response.errorInfo);
              }
            }else {
              reject('未返回数据');
            }

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
export {DataService,Res}
