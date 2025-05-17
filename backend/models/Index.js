import db from "../config/Database.js";
import Users from "./UserModel.js";
import Notes from "./NoteModel.js";

// Relasi
Users.hasMany(Notes, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Notes.belongsTo(Users, { foreignKey: "userId" });

// Sinkronisasi
(async () => {
  try {
    await db.authenticate();
    console.log(" Database connected");
    await db.sync({ alter: true }); // gunakan {force:true} hanya sekali saat awal
    console.log(" Database synced");
  } catch (err) {
    console.error(" DB error:", err);
  }
})();

export { Users, Notes };
