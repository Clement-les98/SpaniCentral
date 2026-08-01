const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {

    const filePath = path.join(
        __dirname,
        "../admin/login.html"
    );

    console.log(filePath);

    res.sendFile(filePath);

});
module.exports = router;