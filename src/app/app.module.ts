import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FlowPathPage } from '../pages/flowPath/flowPath';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { OrderListPage } from '../pages/orderList/orderList';
import { OrderDetailPage } from '../pages/orderDetail/orderDetail';
import { NewOrderPage } from '../pages/newOrder/newOrder';
import { NewsListPage } from '../pages/newsList/newsList';
import { WebViewPage } from '../pages/webView/webView';
import { ScanPage } from '../pages/scan/scan';
import { CommentPage } from '../pages/comment/comment';
import { ImportDevicePage } from '../pages/importDevice/importDevice';
import { OrderDetailDirective } from '../pages/directive/orderDetailDirective';
import { DeviceDetailDirective } from '../pages/directive/deviceDetailDirective';
import { ImportDeviceFormDirective } from '../pages/directive/importDeviceForm';
import { AddressSelect } from '../pages/directive/addressSelect';
import { DeviceCategorySelect } from '../pages/directive/deviceCategorySelect';
import { DataService } from '../service/data.service'
import { NotificationService } from '../service/notification.service'
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FlowPathPage,
    UserPage,
    LoginPage,
    OrderListPage,
    OrderDetailPage,
    NewOrderPage,ImportDevicePage,
    OrderDetailDirective,
    DeviceDetailDirective,
    ImportDeviceFormDirective,
    AddressSelect,DeviceCategorySelect,RegisterPage,CommentPage,ScanPage,NewsListPage,WebViewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FlowPathPage,
    UserPage,
    LoginPage,
    OrderListPage,
    OrderDetailPage,
    OrderDetailDirective,
    NewOrderPage,ImportDevicePage,
    DeviceDetailDirective,
    ImportDeviceFormDirective,
    AddressSelect,DeviceCategorySelect,RegisterPage,CommentPage,ScanPage,NewsListPage,WebViewPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,NotificationService,SafariViewController,InAppBrowser,Storage
  ]
})
export class AppModule {}
