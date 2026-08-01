const express = require("express");
const router = express.Router();
const path = require("path");

const fs = require("fs");

router.get("/login", (req, res) => {

    const filePath = path.join(__dirname, "../admin/login.html");

    res.sendFile(filePath, (err) => {

        if (err) {
            console.error("sendFile error:", err);

            return res.status(err.statusCode || 500).json({
                message: err.message,
                code: err.code,
                path: filePath
            });
        }

    });

});
module.exports = router;