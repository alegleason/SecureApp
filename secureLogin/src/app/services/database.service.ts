import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number,
  mail: string,
  pass: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
}
