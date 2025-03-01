import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Note = db.define('notes', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
}, {
    freezeTableName: true
});

export default Note;

(async () => {
    await db.sync();
})();