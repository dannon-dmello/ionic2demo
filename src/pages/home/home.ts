import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider'
import { MovieDetails } from '../movie-details/movie-details'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies:any;

  constructor(public navCtrl: NavController, public dataProvider:DataProvider, public alertCtrl:AlertController) {

  }
    
    
  getMovies(ev:any){
      let val = ev.target.value;
       if(val && val.trim().length>3){
           //get movies
           this.dataProvider.getMovies(val.trim()).subscribe(
               response=>{this.movies=response.Search},
               err=>{ this.showAlert("Oops..","Failed to get movies")});
       }
  }
    
   clearList(ev:any){
       this.movies = null;
   }
    
   showAlert(title:string, msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
    
  showMovieDetails(movie:any){
      this.navCtrl.push(MovieDetails,{"movieId": movie.imdbID});
  }

}
