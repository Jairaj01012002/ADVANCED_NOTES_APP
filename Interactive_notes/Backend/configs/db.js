const { Client } = require('pg');
const client = new Client({
    user: 'rzntqzet',
    host: 'john.db.elephantsql.com',
    database: 'rzntqzet',
    password: '1yb6k3V7If32VTKwUK3FOZCX-K-v1cpL',
    port: 5432,
  })
module.exports=client;