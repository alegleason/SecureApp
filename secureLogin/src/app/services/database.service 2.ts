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
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);

  // Create DB with the sqlite configuration
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'users.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      });
    });
   }

   seedDatabase(){
     // responseType is set to text bc it is importing from a text file
     this.http.get('assets/seed.sql', { responseType: 'text'})
     .subscribe(sql => {
       this.sqlitePorter.importSqlToDb(this.database, sql)
       .then(_ => {
         this.loadUsers();
         this.dbReady.next(true);
       })
       .catch(e => console.error(e));
     });
   }

   getDatabaseState(){
     return this.dbReady.asObservable();
   }

   getUsers(): Observable<User[]> {
     return this.users.asObservable();
   }

   // We will load users and parse to JSON
   loadUsers(){
     return this.database.executeSql('SELECT * FROM developer', []).then(data => {
       let users: User[] = [];

       if(data.rows.length > 0){
         for(var i = 0; i < data.rows.length; i++){
          users.push({
            id: data.rows.item(i).id,
            mail: data.rows.item(i).mail,
            pass: data.rows.item(i).pass
          });
         }
       }
       // We emit a "ready" to all who are subscribed to the observable (db)
       this.users.next(users);
     });
   }

   addUser(name, mail, pass) {
     let data = [name, mail, pass];
     return this.database.executeSql('INSERT INTO users (name, mail, pass) VALUES (?, ?, ?)', data).then(data => {
       this.loadUsers();
     });
   }

   getUserById(id): Promise<User> {
     return this.database.executeSql('SELECT * FROM users WHERE id = ?', [id]).then(data => {
       
      return {
         id: data.rows.item(0).id,
         mail: data.rows.item(0).mail,
         pass: data.rows.item(0).pass
       }

     });
   }

   getUserByMail(mail): Promise<User> {
    return this.database.executeSql('SELECT * FROM users WHERE mail = ?', [mail]).then(data => {
      
     return {
        id: data.rows.item(0).id,
        mail: data.rows.item(0).mail,
        pass: data.rows.item(0).pass
      }

    });
  }

}
