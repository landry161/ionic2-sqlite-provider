﻿# ionic2-sqlite-provider
Comment l'utiliser?
Faire l'importation dans un premier temps
//import {MemofonctionProvider} from '../../providers/memofonction/memofonction';

//Dans le constructeur
list=[];
construct(private memo:MemofonctionProvider){
}

//Appel des méthodes
//Select
this.memo.selectNote(dbName).then((data)=>
{
  this.list=<Array<Object>>data;
}).catch(erreur=>{

})

//Delete
this.memo.deleteNote(dbName,id).then((data)=>
{
    alert("succès");
}).catch(error=>
{
   alert("Erreur");
 })
