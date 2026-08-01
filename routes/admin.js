const express = require("express");
const router = express.Router();
const path = require("path");

const fs = require("fs");



router.get("/login", (req, res) => {

    const filePath = path.join(__dirname, "../admin/login.html");

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.type("html");
        res.send(data);

    });

});
module.exports = router;