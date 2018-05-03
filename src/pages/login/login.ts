import { Component } from '@angular/core';
import {  NavController, NavParams , LoadingController } from 'ionic-angular';
//Pages
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
//provider
import { ServicesProvider } from '../../providers/services/services';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	email:any;
	pass:any;
	role:any;
	emptyOne:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams ,
		public serviess:ServicesProvider,
		public http: HttpClient,
		public storage: Storage,
		public loadingCtrl: LoadingController

	) {
		this.role = this.navParams.get('role');
	}
	back(){
		this.navCtrl.pop();
	}

	login()
	{
		let url = this.serviess.APIurl();

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
		{
			if(this.pass != '')
			{
				//loading
				let loading = this.loadingCtrl.create({
					content: 'Loading Please Wait...'
				});
				loading.present();
				//loading
				this.storage.remove('userdata');
				let postdata = new FormData();
				postdata.append('email',this.email);
				postdata.append('pass',this.pass);
				postdata.append('role',this.role);
				this.http.post(url+'login', postdata)
			      .subscribe(res => {
			      	this.emptyOne ='';
			      	this.emptyOne = res;
					console.log(res);
			        if(this.emptyOne.status == 0)
			        {
						console.log("Here");
			        	loading.dismiss();
			        	this.serviess.presentToast(this.emptyOne.text,'alert_toest');
			        }
			        else if(this.emptyOne.status == 1)
			        {
			        	loading.dismiss();
			        	this.signInMe(this.emptyOne.data);
			        }
			      }, (err) => {
			        this.serviess.presentToast(err,'alert_toest');
			      });
			}
			else
			{
				this.serviess.presentToast('Please enter valid Password ','alert_toest');
			}
		}
		else
		{
			this.serviess.presentToast('Please Enter valid Email address ','alert_toest');
		}
	}

	signup()
	{
		this.navCtrl.push(SignupPage);
	}



	signInMe(data=[])
	{
		this.emptyOne = '';
		this.emptyOne = data;
		this.storage.set('userdata', this.emptyOne);
		this.storage.set('loggedin', 1);
		this.serviess.presentToast('Welcome '+ this.emptyOne.name +' Back . Successfully Login! . ','success_toest');
		this.navCtrl.setRoot(HomePage);
	}

	ionViewDidLoad() {
		
	}

}
