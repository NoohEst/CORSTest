import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, Platform } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { map } from 'rxjs-compat/operators/map'
import { Observable } from 'rxjs-compat'


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token="00DN0000000BRw6!ARgAQNy8ekQMKBxrHPohJN0WiLrpOAnp1wgKPKG1Ow.Z3WDnvbmUL1en5ZcRt1oJmPYEjZjNSOYUWz7pc4e9325AsvWsmoVE";
  getURL="https://cs6.salesforce.com/services/apexrest/isca_restapi/testGet/";
  postURL="https://cs6.salesforce.com/services/apexrest/isca_restapi/testPost";
  headerOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${this.token}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  getMethod$:Observable<any>
  postMethod$:Observable<any>

  getresult:string;
  postresult:string;

  

  constructor(public navCtrl: NavController, private http:HttpClient, private alertCtrl: AlertController, private platform: Platform) {

    this.getMethod$=this.http.get(this.getURL, this.headerOptions).pipe(map(res=>{
      console.log("get");
      return res;
    }))

    this.postMethod$=this.http.post(this.postURL,{'testPost':'a'},this.headerOptions).pipe(map(res=>{
      console.log("post");
      return res;
    }))
  }
  
  ionViewWillLoad(){
  }

  getClick(){
    let abc = this.getMethod$.subscribe(value=>{
      console.log(value);
      this.getresult=value;
      abc.unsubscribe();
    })
  }

  postClick(){
    let abc= this.postMethod$.subscribe(value=>{
      console.log(value);
      this.postresult=value;
      abc.unsubscribe();
    })
  }

  clearClick(){
    this.getresult="";
    this.postresult="";
  }

  showPlatform(){
    let text = 'I run on: ' +this.platform.platforms();
    let alert = this.alertCtrl.create({
      title: 'My home',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
