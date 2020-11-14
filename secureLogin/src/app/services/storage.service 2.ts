import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CryptoJS from 'crypto-js';

export interface User {
  id: number,
  mail: string,
  pass: string
}

const USERS_KEY = 'my-users';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  unencryptedText:string = "";
  encryptedText:string = "";

  privateKey:string = 'SeguridAd2020';

  constructor(private storage: Storage) { }

  clearStorage(){
    this.storage.clear();
  }

  // Create
  addUser(user: User): Promise<any> {
    return this.storage.get(USERS_KEY).then((users: User[]) => {
      if(users){
        users.push(user);
        return this.storage.set(USERS_KEY, users);
      }else{
        return this.storage.set(USERS_KEY, [user]);
      }
    });
  }

  checkCredentials(mail: string, pass: string): Promise<boolean>{
    return this.storage.get(USERS_KEY).then((users: User[]) => {
      if(!users || users.length === 0){
        return false;
      }

      let toKeep: User[] = [];

      for (let i of users){
        if(i.mail == mail){

          this.unencryptedText = CryptoJS.AES.decrypt(i.pass.trim(), this.privateKey.trim()).toString(CryptoJS.enc.Utf8);

          if(this.unencryptedText == pass){
            return true;
          }
        }
      }

      return false;
    });
  }

  // Read
  getUsers(): Promise<User[]>{
    return this.storage.get(USERS_KEY);
  }

  // Update
  updateUser(user: User): Promise<any>{
    return this.storage.get(USERS_KEY).then((users: User[]) => {
      if(!users || users.length === 0){
        return null;
      }

      let newUsers: User[] = [];
      
      // Only update the one we need
      for(let i of users){
        if(i.id == user.id){
          newUsers.push(user);
        }else{
          newUsers.push(i);
        }
      }

      return this.storage.set(USERS_KEY, newUsers);
    });
  }

  // Delete
  deleteUser(id: number): Promise<User> {
    return this.storage.get(USERS_KEY).then((users: User[]) => {
      if(!users || users.length === 0){
        return null;
      }

      let toKeep: User[] = [];

      for (let i of users){
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(USERS_KEY, toKeep);
    });
  }
}
