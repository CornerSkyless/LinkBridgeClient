/**
 * Created by cornerskyless on 2017/3/8.
 */
import { Component , OnInit  } from '@angular/core';

import { NavController , NavParams , ModalController , ViewController , AlertController} from 'ionic-angular';


@Component({
  selector: 'scan',
  templateUrl: 'scan.html'
})
export class ScanPage{



  constructor(

    public viewCtrl:ViewController
  ) {}



  dismiss() {
    this.viewCtrl.dismiss(false);
  }




}
