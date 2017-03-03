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
import { OrderListPage } from '../pages/orderList/orderList';
import { OrderDetailPage } from '../pages/orderDetail/orderDetail';
import { NewOrderPage } from '../pages/newOrder/newOrder';
import { ImportDevicePage } from '../pages/importDevice/importDevice';
import { OrderDetailDirective } from '../pages/directive/orderDetailDirective';
import { DeviceDetailDirective } from '../pages/directive/deviceDetailDirective';
import { ImportDeviceFormDirective } from '../pages/directive/importDeviceForm';
import { AddressSelect } from '../pages/directive/addressSelect';
import { DeviceCategorySelect } from '../pages/directive/deviceCategorySelect';
import { DataService } from '../service/data.service'
import { NotificationService } from '../service/notification.service'
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
    AddressSelect,DeviceCategorySelect
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
    AddressSelect,DeviceCategorySelect
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,NotificationService
  ]
})
export class AppModule {}
