import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SelectPage } from '..//select/select';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	indexCount: any;
  constructor(
  public navCtrl: NavController,
  public storage: Storage
  ) {
		  this.storage.get('userdata').then((val) => {
			  console.log(val.role);
			  this.indexCount = val.role;
			});

  }
  logout(){
	  this.navCtrl.push(SelectPage);
  }

}
