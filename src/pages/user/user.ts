import { Component } from '@angular/core';

import { NavController ,ModalController } from 'ionic-angular';
import { DataService } from '../../service/data.service'

import { LoginPage } from '../login/login'

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  currentUser = {};
  isLogin = false;
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public modalCtrl: ModalController
  ) {}
  login(){
    let modal = this.modalCtrl.create(LoginPage,{});
    modal.showBackButton(true);
    modal.present();
  }
}
