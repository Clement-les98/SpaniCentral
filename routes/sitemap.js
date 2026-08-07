const express = require("express");
const router = express.Router();

const sitemapController =
require("../Controllers/sitemapController");

router.get(
    "/sitemap.xml",
    sitemapController.generateSitemap
);

module.exports = router;