const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required."
      });

    }

    const sql =
      "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Internal server error."
        });

      }

      if (results.length === 0) {

        return res.status(401).json({
          message: "Invalid email or password."
        });

      }

      const admin = results[0];

      const isMatch = await bcrypt.compare(
        password,
        admin.password
      );

      if (!isMatch) {

        return res.status(401).json({
          message: "Invalid email or password."
        });

      }

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h"
        }
      );

      // Store JWT in a secure HttpOnly cookie
      res.cookie("token", token, {

        httpOnly: true,

        secure:
          process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge:
          24 * 60 * 60 * 1000

      });

      return res.status(200).json({

        message: "Login successful."

      });

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Internal server error."
    });

  }

};

exports.logout =
(req,res)=>{

    res.clearCookie("token");

    res.json({

        message:
        "Logged out successfully."

    });

};