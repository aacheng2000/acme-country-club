const Sequelize = require('sequelize');
const { DataTypes: {INTEGER, DATE,STRING, UUID, UUIDV4}} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acmemembers');

const members = ['moe','lucy','larry','ethyl'];
const facilities = ['tennis','ping-pong','raquet-ball','bowling'];

//const Bookings = conn.define('booking', {
//  
//}

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

const Booking = conn.define('booking', {
  id: {
    type: INTEGER,
    primaryKey: true
  },
  startTime: {
    type: DATE,
    allowNull: false
  },
  endTime: { 
    type: DATE,
    allowNull: false
  },
  bookedById: {
    type: UUID
  },
  facilityID: {
    type: UUID
  }

})

Member.hasMany(Booking)
Facility.hasMany(Booking)
Member.hasMany(Booking)

const syncAndSeed = async()=>{
  await conn.sync({force:true})

  const [moe, lucy, larry, ethyl] = await Promise.all(members.map(firstName=>Member.create({firstName})));
  console.log('sync and seed')

  moe.sponsorId = lucy.id
  ethyl.sponsorId = moe.id
  larry.sponsorId = lucy.id
  await Promise.all([moe.save(), ethyl.save(), larry.save()]);
}


module.exports = {
  syncAndSeed,
 models: {Member, Facility, Booking}
}
