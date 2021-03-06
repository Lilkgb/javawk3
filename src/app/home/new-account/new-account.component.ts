import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../model/login.model';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AppService } from './../../app.service';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [AppService, AuthService]
})
export class NewAccountComponent {
  constructor(private appService: AppService, public authService: AuthService, private router: Router, private home: HomeComponent) { }

  submitResult(result){
    console.log(result);
  }

  profileImage: string = '';
  profileId;
  banner = 'https://firebasestorage.googleapis.com/v0/b/theclonedfacebook.appspot.com/o/defaultBanner.jpg?alt=media&token=a0846ead-835f-4c3b-b791-378456e016ea'

  addNewAccount(firstName: string, lastName:string, phoneOrEmail:string, newPassword: string, date: string, gender: string){
    const today = new Date();
    let birthday = new Date(date);
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    const finalAge = age;
    if (isNaN(finalAge)) {
      return alert("Please put in your birthday so we know you are old enough");
    }
    if (finalAge < 13){
      return alert("You must be over the age of 13 to create a account");
    }
    if (gender === 'female') {
      this.profileImage = 'https://firebasestorage.googleapis.com/v0/b/theclonedfacebook.appspot.com/o/fbgirl450.jpg?alt=media&token=98df585f-8700-4e1c-8c31-3c22639f73b2';
    } else {
      this.profileImage = 'https://firebasestorage.googleapis.com/v0/b/theclonedfacebook.appspot.com/o/fbguy800.jpg?alt=media&token=aa9c3b02-b51a-494c-b617-0252987bdece';
    }
    if (gender === undefined) {
      gender = "None Given";
    }
    let newUser: User = new User(this.profileImage, firstName, lastName, phoneOrEmail, "***", gender, finalAge, {'default':{url: this.profileImage}}, this.banner, {'default': {url: this.banner}}, `${firstName} ${lastName}`);
    let emailInfo = new User(this.profileImage, firstName, lastName, phoneOrEmail, newPassword, gender, finalAge, null, null, null, null);
    this.home.loadingScreen();
    setTimeout(() => {
      this.appService.addUser(newUser);
    }, 7000)
    this.authService.createAccount(emailInfo);
  }
}
