const express = require("express");
const router = express.Router();
const path = require("path");

const verifyToken =
require("../middleware/authMiddleware");

router.get("/login", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../admin/login.html"
        )
    );

});

router.get(
    "/dashboard",
    verifyToken,
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "../admin/dashboard.html"
            )
        );

    }
);

router.get(
    "/add-job",
    verifyToken,
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "../admin/add-job.html"
            )
        );

    }
);
module.exports = router;