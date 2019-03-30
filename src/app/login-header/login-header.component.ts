import { Component, Output, EventEmitter } from '@angular/core';
import { User } from './../model/login.model';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent {
  @Output() sendLogin = new EventEmitter();
  constructor() { }

  login(username: string, password: string){
    let loginUser = new User(null, username, password, null, null,);
    console.log("login function reached");
    this.sendLogin.emit(loginUser);
  }

}
