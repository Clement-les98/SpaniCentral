const express = require("express");
const router = express.Router();

console.log("Admin routes loaded");

router.get("/test", (req, res) => {
    res.send("Admin router is working");
});

module.exports = router;