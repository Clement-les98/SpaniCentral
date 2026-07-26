require("dotenv").config();

const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME

});

async function createAdmin() {

  const email = "LesMogano@gmail.com";

  const password = "Clement@10";

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO admins
    (email, password)
    VALUES (?, ?)
  `;

  db.query(

    sql,

    [email, hashedPassword],

    (err) => {

      if (err) {

        console.log(err);

      }

      else {

        console.log("Admin created successfully.");

      }

      db.end();

    }

  );

}

createAdmin();