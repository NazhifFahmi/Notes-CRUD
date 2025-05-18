import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define("user", {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: {
        type: DataTypes.TEXT,  
        allowNull: true
    },
},
    { freezeTableName: true }
);

db.sync({ alter: true }).then(() => console.log("Database User table synchronized"));

export default User;