const app = require('./index')
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//     'pump_database',
//     'fadlulanre',
//     'fadlullah',
//      {
//        host: 'db4free.net',
//        dialect: 'mysql',
//        port: 3306
//      }
//    );

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });
 
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`App running on port ${port} ......`)
})