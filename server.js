const express  = require('express')
const db = require('./db');
const { models: {Member, Facility}} = db
const app = express()

app.get('/api/members', async(req, res, next)=> {
  try{
    res.send(await Member.findAll({
      include: [ Member, Facility ]
    }))
  }
  catch(ex){
    next(ex);
  }
})


const setUp = async()=> {
  try {
    await db.syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex){
    console.log(ex);
  }

}

setUp()
