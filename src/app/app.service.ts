import { Injectable } from '@angular/core';
import { User } from './model/login.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Upload } from './upload';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Moment } from 'moment';

@Injectable()
export class AppService {
  profile: FirebaseListObservable<any[]>;
  current = firebase.auth().currentUser;
  user: Observable<firebase.User>;
  uid: any;

  constructor(private database: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.profile = database.list('users');
    this.user=afAuth.authState;
  }
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  private saveFileData(upload: Upload) {
    this.database.list(`${this.basePath}/`).push(upload);
  }

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.user.subscribe(user => {
      if (user == null){
      } else {
        this.uid = user.uid;
      }
    });
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
        firebase.database().ref().child(`users/${this.uid}/profileImg`).set(upload.url);
        firebase.database().ref().child(`users/${this.uid}/images`).push({name:upload.name, url:upload.url, upload: new Date(), likes: 0})
        console.log(new Date())
      }
    );
  }
  pushImage(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.user.subscribe(user => {
      if (user == null){
      } else {
        this.uid = user.uid;
      }
    });
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        let moment = require('moment')
        let date = moment().format('YYYY, M, D, H:mm:ss');
        firebase.database().ref().child(`users/${this.uid}/images`).push({name:upload.name, url:upload.url, timeStamp: date, likes: 0, timeUp: moment().format('x')})
      }
    );
  }
  pushBannerUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.user.subscribe(user => {
      if (user == null){
      } else {
        this.uid = user.uid;
      }
    });
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
        firebase.database().ref().child(`users/${this.uid}/bannerImg`).set(upload.url);
        firebase.database().ref().child(`users/${this.uid}/banners`).push({name:upload.name, url:upload.url})
      }
    );
  }
  getUsers(){
    return this.profile;
  }
  getUserImages(uid){
    return this.database.list(`users/${uid}/images`);
  }
  addUser(addNewAccount){
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let root = firebase.database().ref();
    root.child('users').child(userId).set(addNewAccount);
  }
  getUserById(userId: string){
    return this.database.object('users/' + userId);
  }
  updateProfileImage(image){
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref().child(`users/${userId}/profileImg`).set(image);
  }
  delete(key){
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    firebase.database().ref().child(`users/${userId}/images/${key}`).remove();
    location.reload();
  }
}
