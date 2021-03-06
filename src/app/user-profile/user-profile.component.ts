import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../model/login.model';
import { AppService } from '../app.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ImageViewComponent } from './image-view/image-view.component';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [AppService, ImageViewComponent, AuthService]
})
export class UserProfileComponent implements OnInit {
  userId: string;
  userDisplay;
  images;
  newProfileImage = false;
  masterSelectedImage;
  selectedImageView = false;
  newBannerImage = false;
  currentLoggedIn;
  uid;
  admin;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private appService: AppService, private imageView: ImageViewComponent, private authService: AuthService) { }
  ngOnInit() {
    this.route.params.forEach((urlParamaters) => {
      this.userId = urlParamaters['id'];
    });
    this.authService.user.subscribe(user => {
      if (user == null){
        this.router.navigate(['']);
      } else {
        this.uid = user.uid;
        this.currentLoggedIn = this.appService.getUserById(this.uid);
        if (this.uid === this.userId){
          this.admin = true;
        } else{
          this.admin = false;
        }
      }
    });
    setTimeout(() => {
      console.log(this.admin)
    }, 1000)
    this.userDisplay = this.appService.getUserById(this.userId);
    this.images = this.appService.getUserImages(this.userId);
  }
  openNewImage(event){
    this.newProfileImage = event
  }
  closeNewImage(event){
    this.newProfileImage = event;
  }
  selectedImage(event){
    this.masterSelectedImage = event
    this.selectedImageView = true;
  }
  closeImage(event){
    this.selectedImageView = event;
  }
  openBannerUpdate(event){
    this.newBannerImage = event;
  }
  closeBannerUpdate(event){
    this.newBannerImage = event;
  }
}
