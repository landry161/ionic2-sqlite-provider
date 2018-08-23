# ionic2-sqlite-provider
How to use?
Import into app.components.ts and app.module.ts
# import {MemofonctionProvider} from '..';

Initialization in app.components.ts
#constructor(private memo:MemofonctionProvider)
{
  this.memo.initializeDB("note.db").then((res)=>{

      }).catch(erreur=>
      {

      });
}



