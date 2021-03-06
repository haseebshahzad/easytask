import { ToastController , LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
//plugins
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
	emptyOne:any;
	constructor
	(
		private toastCtrl: ToastController,
		public http: HttpClient,
		public loadingCtrl: LoadingController
	) {

	}

	presentToast(msg,tclass) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			cssClass: tclass
		});
		toast.present();
	}

	APIurl() {
		return "http://mywebz.itzsolution.com/numi/";
	}


	

	

}
