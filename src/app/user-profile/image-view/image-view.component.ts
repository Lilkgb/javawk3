import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../app.service';
import * as firebase from 'firebase';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params} from '@angular/router';
import { Moment } from 'moment';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  providers: [AppService, AuthService]
})
export class ImageViewComponent implements OnInit {
  @Input() masterSelectedImage;
  @Output() closeImage = new EventEmitter;
  constructor(private appService: AppService, private authService: AuthService, private route: ActivatedRoute, private database: AngularFireDatabase) {}
  imageViewer = false;
  userId;
  user;
  activeUserId;
  activeUser;
  images;
  slideShow;
  initial;
  date;

  ngOnInit() {
    this.route.params.forEach((urlParamaters) => {
      this.userId = urlParamaters['id'];
    });
    this.images = this.appService.getUserImages(this.userId);
    this.user = this.appService.getUserById(this.userId)
    this.activeUserId = firebase.auth().currentUser.uid;
    this.activeUser = this.appService.getUserById(this.activeUserId);
    let arr2
    this.images.forEach(function(element){
      arr2 = element
      return arr2
    });
    let keyItems;
    this.slideShow = arr2
    for (let i=0; i<this.slideShow.length; i++){
      if(this.masterSelectedImage.url === this.slideShow[i].url){
        this.initial = this.slideShow[i].url
        let moment = require('moment');
        let information = parseInt(arr2[i].timeUp);
        this.date = moment(information).fromNow();
      }
    }
    console.log(this.date);
  }
  add(){
    let newPosition
    for (let i = 0; i<this.slideShow.length; i++){
      if (this.initial === this.slideShow[i].url){
        if(i === this.slideShow.length -1){
          return this.initial = this.slideShow[0].url;
        }
        newPosition = this.slideShow [i + 1].url;
      }
    }
    return this.initial = newPosition;
  }
  subtract(){
    let newPosition
    for (let i = 0; i<this.slideShow.length; i++){
      if (this.initial === this.slideShow[i].url){
        if(i===0){
          return this.initial = this.slideShow[this.slideShow.length -1].url;
        }
        newPosition = this.slideShow [i - 1].url;
      }
    }
    return this.initial = newPosition;
  }

  information(){
    for(let i=0; i<this.slideShow.length; i++){
      console.log(this.slideShow[i].url);
    }
  }
  viewImage(){
    this.imageViewer = true;
  }
  closeImageView(event){
    event = false
    this.closeImage.emit(event)
  }

  updateProfileImage(){
    this.appService.updateProfileImage(this.initial)
    this.closeImage.emit(false);
  }
  deleteImage(){
    let imageKey
    for (let i=0;i<this.slideShow.length; i++){
      if(this.initial === this.slideShow[i].url){
        imageKey = this.slideShow[i].$key;
      }
    }
    this.appService.delete(imageKey);
  }
}
