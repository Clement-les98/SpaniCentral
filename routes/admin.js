const express = require("express");
const router = express.Router();
const path = require("path");

const fs = require("fs");

router.get("/login", (req, res) => {

    const filePath = path.join(__dirname, "../admin/login.html");

    res.json({
        filePath,
        exists: fs.existsSync(filePath)
    });

});
module.exports = router;