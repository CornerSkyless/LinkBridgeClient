import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { NewsListPage } from '../newsList/newsList';
import { DataService , Res } from '../../service/data.service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = UserPage;
  tab4Root: any = NewsListPage;

  constructor(
    private dataService: DataService,
  ) {

  }
}
