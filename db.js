const Sequelize = require('sequelize');
const { DataTypes: {DATE,STRING, UUID, UUIDV4}} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acmemembers');

const members = ['moe','lucy','larry','ethyl'];
const facilities = ['tennis','ping-pong','raquet-ball','bowling'];

const Facility = conn.define('facility', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
    fac_name: {
    type: STRING(100),
    unique: true,
    allowNull: false
  }
})

const Member = conn.define('member', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
    firstName: {
    type: STRING(20),
    unique: true,
    allowNull: false
  },
  sponsorId: {
    type: UUID,
    
  }
})



const syncAndSeed = async()=>{
  await conn.sync({force:true})

  const [moe, lucy, larry, ethyl] = await Promise.all(members.map(firstName=>Member.create({firstName})));
  console.log('sync and seed')

}


module.exports = {
  syncAndSeed,
  
}
