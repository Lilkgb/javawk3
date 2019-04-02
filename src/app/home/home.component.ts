import { Component, OnInit } from '@angular/core';
import { User } from '../model/login.model';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.users = this.appService.getUsers();
    console.log(this.users);
  }
  users: FirebaseListObservable<any[]>;
}
