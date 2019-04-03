import { Component, Output, EventEmitter } from '@angular/core';
import { User, Login } from './../../model/login.model';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent {
  @Output() sendLogin = new EventEmitter();

  constructor() { }

  login(username: string, password: string,){
    let loginUser = new Login(username, password);
    console.log("login function reached");
    this.sendLogin.emit(loginUser);
  }

}
