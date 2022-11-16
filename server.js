const app = require('./index')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'devcufkd_pump-database',
    'devcufkd_devcufkd',
    'fadlullah',
     {
       host: 'server172.web-hosting.com',
       dialect: 'mysql',
       port: 3306
     }
   );

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`App running on port ${port} ......`)
})