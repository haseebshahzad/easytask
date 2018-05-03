import { Component } from '@angular/core';
import {  NavController, NavParams , LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//providers
import { ServicesProvider } from '../../providers/services/services';
import { HttpClient } from '@angular/common/http';

//@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	role:any;
	email:any;
	pass:any;
	phone:any;
	address:any;
	c_pass:any;
	name:any;
	emptyOne:any;

	//maps
	liveIn:any;
	GoogleAutocomplete:any;
	autocomplete:any;
	zone:any;
	autocompleteItems:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams ,
		public serviess:ServicesProvider,
		public http: HttpClient,
		public loadingCtrl:LoadingController

	) {
		
	}

	login()
	{
		this.navCtrl.setRoot(LoginPage);
	}

	register()
	{
		//console.log(this.pass);
		//console.log(this.c_pass);
		let url = this.serviess.APIurl()+'signup';
		console.log(url);
		if(( typeof this.role === 'undefined' ))
		{
			this.serviess.presentToast('Please select Role ','alert_toest');
		} 
		else{
			if(( typeof this.name === 'undefined' ))
				{
					this.serviess.presentToast('Please Enter your name ','alert_toest');
				}
				else{
					if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
					{
						if(this.pass == this.c_pass && this.pass != '' )
						{
							//loading
							let loading = this.loadingCtrl.create({
								content: 'Loading Please Wait...'
							});
							loading.present();
							//loading

							let postdata = new FormData();
							postdata.append('role',this.role);
							postdata.append('email',this.email);
							postdata.append('pass',this.pass);
							postdata.append('name',this.name);
							this.http.post(url, postdata)
							  .subscribe(res => {
								this.emptyOne = '';
								this.emptyOne = res;
								if(this.emptyOne.status == 0)
								{
									loading.dismiss();
									this.serviess.presentToast(this.emptyOne.text,'alert_toest');
								}
								else if(this.emptyOne.status == 1)
								{
									loading.dismiss();
									this.serviess.presentToast('Register Successfully! . Please Login ','success_toest');
									this.navCtrl.setRoot(LoginPage);
								}
							  }, (err) => {
								this.serviess.presentToast('Server not responding','alert_toest');
							  });
						}
						else
						{
							this.serviess.presentToast('Password Does Not Match','alert_toest');
						}
					}
					else
					{
						this.serviess.presentToast('Please Enter valid Email address ','alert_toest');
					}
				}
		}
	}

	updateSearchResults(){

	  if (this.liveIn == '') {
	    this.autocompleteItems = [];
	    return;
	  }
	  this.GoogleAutocomplete.getPlacePredictions({ input: this.liveIn },
		(predictions, status) => {
	    this.autocompleteItems = predictions;
	    
	  });
	}
	selectplace(place)
	{
		this.autocompleteItems = [];
		this.liveIn = place;
	}
	
	ionViewDidLoad() 
	{

	}

}
