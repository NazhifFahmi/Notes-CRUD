import { Sequelize } from "sequelize";

const db = new Sequelize('notes_db', 'root', 'ccgacor', {
    host: '35.222.247.128',
    dialect: 'mysql'
});

export default db;