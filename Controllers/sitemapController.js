const { SitemapStream, streamToPromise } = require("sitemap");
const db = require("../config/db");

exports.generateSitemap = (req, res) => {

    const smStream = new SitemapStream({
        hostname: "https://spanicentral.co.za"
    });

    // Static pages
    smStream.write({ url: "/", priority: 1.0 });
    smStream.write({ url: "/jobs", priority: 0.9 });
    smStream.write({ url: "/about", priority: 0.8 });
    smStream.write({ url: "/contact", priority: 0.8 });
    smStream.write({ url: "/privacy", priority: 0.5 });
    smStream.write({ url: "/terms", priority: 0.5 });
    smStream.write({ url: "/disclaimer", priority: 0.5 });

    // Get all jobs from database
    db.query(
        "SELECT id, created_at FROM jobs ORDER BY id DESC",
        (err, jobs) => {

            if (err) {
                console.error(err);
                return res.status(500).send("Error generating sitemap");
            }

            jobs.forEach(job => {

                smStream.write({
                    url: `/job-details?id=${job.id}`,
                    lastmod: job.updated_at || new Date(),
                    priority: 0.9
                });

            });

            smStream.end();

            streamToPromise(smStream)
                .then(data => {
                    res.header("Content-Type", "application/xml");
                    res.send(data.toString());
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send("Sitemap generation failed");
                });

        }
    );

};