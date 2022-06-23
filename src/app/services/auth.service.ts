import { Injectable } from '@angular/core';
import { User } from '../models/common/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userInfo: User) {
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  public isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }

  public logout() {
    localStorage.removeItem('user');
  }

  usage(){
    return[
      {
        id:1,
        name:"Internal"
      },
      {
        id:2,
        name:"External"
      }
    ]
  }

  type(){
    return[
      {
        id:1,
        name:"Test 1"
      },
      {
        id:1,
        name:"Test 2"
      },
      {
        id:2,
        name:"Test 3"
      },
      {
        id:2,
        name:"Test 4"
      }
    ]
  }

}
