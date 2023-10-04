require("dotenv").config();
const { Sequelize } = require('sequelize');
    
async function test(){
    const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

  sequelize.close()

}

test();
