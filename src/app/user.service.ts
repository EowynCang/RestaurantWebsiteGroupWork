import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  username: string;
  userStatus = new Subject<boolean>();


  constructor() {
    this.isUserLoggedIn = false;
  }

  // Set the login status and transfer username
  setUserLoggedIn(username: string) {
    this.isUserLoggedIn = true;
    this.username = username;
    this.userStatus.next(this.isUserLoggedIn);
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    this.userStatus.next(this.isUserLoggedIn);
  }
}
