import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider'
import {Storage} from '@ionic/storage';

/**
 * Generated class for the MovieDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetails {
  movie:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider:DataProvider, public alertCtrl:AlertController,public storage: Storage) {
      var movieId = this.navParams.get("movieId");
      this.getMovieDetails(movieId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetails');
  }
    
  getMovieDetails(movieId:string){
     this.storage.ready().then(() => {
        this.storage.get(movieId).then((movieFromDb)=>{
            if(movieFromDb && movieFromDb.Title){
                this.showAlert("DB Test", "Found movie in DB :"+movieFromDb.Title);
                this.movie = movieFromDb;
            }else{
                this.dataProvider.getMovieDetails(movieId).subscribe(
               response=>{
                   this.movie=response;
                   this.storage.set(movieId,this.movie)
               },
               err=>{ this.showAlert("Oops..","Failed to get movies")});
            }
        });
     });
      
      
  }
    
  showAlert(title:string, msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
    

}
