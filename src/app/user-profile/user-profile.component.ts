import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../model/login.model';
import { AppService } from '../app.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [AppService]
})
export class UserProfileComponent implements OnInit {
  userId: string;
  userDisplay;
  images;
  newProfileImage = false;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private appService: AppService) { }
  ngOnInit() {
    this.route.params.forEach((urlParamaters) => {
      this.userId = urlParamaters['id'];
    });
    this.userDisplay = this.appService.getUserById(this.userId);
    this.images = this.appService.getUserImages(this.userId);
  }
  openNewImage(event){
    this.newProfileImage = event
  }
  closeNewImage(event){
    this.newProfileImage = event;
  }
}