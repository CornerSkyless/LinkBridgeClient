/**
 * Created by cornerskyless on 2017/3/2.
 */
import { Component , OnInit, OnChanges , Input } from '@angular/core';
import { NavController , ModalController , NavParams  } from 'ionic-angular';
import { DataService , Res } from '../../service/data.service';
import { NotificationService } from '../../service/notification.service';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { WebViewPage } from '../webView/webView'

@Component({
  selector: 'news-list',
  templateUrl: 'newsList.html'
})
export class NewsListPage implements OnInit {
  isDoing = {
    queryNewsList:false
  };
  newsList:{
    title:string;url:string;img_url:string;uploaded_time:string;content:string;id:string;
  }[] = [];
  constructor(
    private dataService: DataService,
    private notificationService:NotificationService,
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public navParams:NavParams,
    private safariViewController: SafariViewController,
    private iab: InAppBrowser
  ) {}

  queryNewsList(){
    this.isDoing.queryNewsList = true;
    this.notificationService.startLoading();
    this.dataService.request('listNewsHistory',{})
      .then((res:Res) =>{
        this.notificationService.stopLoading();
        this.newsList = res.list;
        console.log(this.newsList);
        this.isDoing.queryNewsList = false;
        let newsIdList = res.list.map((news)=>{return news.id});
        this.dataService.checkUnreadNews(newsIdList);
      })
      .catch((message)=>{
        this.notificationService.stopLoading();
        this.notificationService.showBasicAlert('加载失败',message);
      })
  }
  showNewsDetail(news:{url:string;id:string;}){
    let newsIdList = this.newsList.map((news)=>{return news.id});

    this.dataService.readNews(news.id,newsIdList);

    this.safariViewController.isAvailable()
      .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: news.url,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
              .then((result: any) => {
                  if(result.event === 'opened') console.log('Opened');
                  else if(result.event === 'loaded') console.log('Loaded');
                  else if(result.event === 'closed') console.log('Closed');
                },
                (error: any) => console.error(error)
              );

          } else {
            const browser = this.iab.create(news.url, '_blank',{location:"no",zoom:"no"});
            browser.show();
          }
        }
      );

    // this.navCtrl.push(WebViewPage,{url:news.url})

  }
  readAllNews(){
    let newsIdList = this.newsList.map((news)=>{return news.id});
    this.dataService.readAllNews(newsIdList);
  }
  ngOnInit(){

    this.queryNewsList();
  }

}
