import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController}  from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the MemofonctionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemofonctionProvider {

  constructor(private sqlite:SQLite,private toast:ToastController)
  {
    console.log('Hello MemofonctionProvider Provider');
  }

  affichageMessage(message){
    let afficher=this.toast.create({
      message:message,
      duration:2000
    })
    afficher.present();
  }

  updateNote(dbName,titre,contenu,id){
    return new Promise((resolve,error)=>
    {
      this.sqlite.create({
        name:dbName,
        location:'default'
      }).then((db:SQLiteObject)=>
      {
        db.executeSql("UPDATE note SET titre=?, contenu=? WHERE id=?",[titre,contenu,id]).then((data)=>
        {
          resolve(data);
        }).catch(erreur=>
        {
          error(erreur);
        });
      }).catch(erreur=>
      {
        this.affichageMessage("Erreur ");
      })
    });
  }

  deleteNote(dbName,id){
    return new Promise((resolve,error)=>
    {
      this.sqlite.create({
        name:dbName,
        location:'default'
      }).then((db:SQLiteObject)=>
      {
        db.executeSql("DELETE FROM note WHERE id=?",[id]).then((data)=>
        {
          resolve(data);
        }).catch(erreur=>
        {
          error(erreur);
        });
      }).catch(erreur=>
      {
        this.affichageMessage("Erreur ");
      })
    });
  }


  selectNote(dbName){
    return new Promise((resolve,error)=>
    {
      let resultat=[];
      this.sqlite.create({
        name:dbName,
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql("SELECT * FROM note",[]).then((data)=>
        {
          for (let index = 0; index < data.rows.length; index++)
          {
            resultat.push({
              id:data.rows.item(index).id,
              titre:data.rows.item(index).titre,
              contenu:data.rows.item(index).contenu
            });
          }
          resolve(resultat);
        }).catch(erreur=>
          {
            //alert("sdsfsfsf "+JSON.stringify(erreur));
            error(erreur);
            this.affichageMessage("Erreur ");
        });
      }).catch(err=>{
        alert("SDFSDFS "+JSON.stringify(err));
      }).catch(err=>{
        alert("okokoookok "+JSON.stringify(err));
      });
    });
  }

  insertNote(dbName,titre,contenu)
  {
    return new Promise((resolve,error)=>
    {
      this.sqlite.create({
        name:dbName,
        location:'default'
      }).then((db:SQLiteObject)=>
      {
        //Requête
        db.executeSql("INSERT INTO note(titre,contenu) values(?,?)",[titre,contenu]).then((data)=>
        {
          resolve(data.insertId);
        }).catch(err=>
        {
          error(err);
        });
      });
    });
  }


  initializeDB(dbName){
    return new Promise((resolve,error)=>
    {
      this.sqlite.create({
        name:dbName,
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql("CREATE TABLE note(id INTEGER PRIMARY KEY AUTOINCREMENT, titre VARCHAR(50),contenu TEXT)",[]).then((data)=>{
          this.affichageMessage("Table créée avec succès");
          resolve(data);
        }).catch(err=>{
          error(err);
        });
      }).catch(erreur=>{
        this.affichageMessage("Erreur base de données");
      })
    });
  }
}