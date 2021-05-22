const db = require('./db');

const setUp = async()=> {
  try {
    await db.syncAndSeed();
    
  }
  catch(ex){
    console.log(ex);
  }

}

setUp()
