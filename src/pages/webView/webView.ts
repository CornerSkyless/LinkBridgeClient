/**
 * Created by cornerskyless on 2017/3/3.
 */
import { Component,OnInit } from '@angular/core';
import { NavController, ViewController,NavParams  } from 'ionic-angular';
import { NotificationService } from '../../service/notification.service'
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'web-view',
  templateUrl: 'webView.html'
})
export class WebViewPage implements OnInit{
  url:any;
  dismiss() {
    this.viewCtrl.dismiss(false);
  }
  constructor(
    public navCtrl: NavController,
    public notificationService: NotificationService,
    public viewCtrl:ViewController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl( 'https://mp.weixin.qq.com/s?__biz=MzA5OTQ0MDExMg==&mid=2650580695&idx=1&sn=f4cd852383e7cc267ef482a334dfdc2b&chksm=888a4248bffdcb5ed3a0ad1954203e6af86a0040d287fd449da86d2819729f3ea86c0d9590b0&scene=0&key=3b7fdf3b47ae7f34cd094b46023618b6c8a51299bd14278d3f2be29dde4160caf87220324699354b9ad8de34ca4e2f60d889d92c089400e03d11c383cdec41aca85b6d8810d421d8e3e12388c006e9e0&ascene=0&uin=MTkxNjEyODYwMA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.12.4+build(16E195)&version=12020110&nettype=WIFI&fontScale=100&pass_ticket=KsNOGYanT3mbQjVGv%2FpyPhi%2BzdFTnFYmEZ7pk5DAKMli7UzeSR4z%2FEdQynmlFP4v');

  }

}
