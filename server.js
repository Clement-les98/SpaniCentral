require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes =
  require("./routes/auth");

const jobsRoutes = require("./routes/jobs");
const adminRoutes =
require("./routes/admin");
const cookieParser =
require("cookie-parser");
const contactRoutes =
require("./routes/contactRoute");

const app = express();
// Tell Express to use EJS
app.set("view engine", "ejs");

// Tell Express where the views folder is
app.set("views", path.join(__dirname, "views"));

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

/* STATIC FILES */

app.use(express.static("public"));

/* COMPANY LOGOS */


app.use("/uploads", express.static("uploads"));

/* ROUTES */

app.use("/api/jobs", jobsRoutes);
app.use(
  "/api/auth",
  authRoutes
);
app.use(

    "/api/contact",

    contactRoutes

);
app.use("/admin", adminRoutes);
//render index.ejs
app.get("/", (req, res) => {

    res.render("index");

});
// render job.ejs
app.get("/jobs", (req, res) => {

    res.render("jobs");

});

//render job-details.ejs
app.get("/job-details", (req, res) => {

    res.render("job-details");

});
//render about.ejs
app.get("/about", (req, res) => {

    res.render("about");

});

app.get("/contact", (req, res) => {

    res.render("contact");

});
//render privacy page
app.get("/privacy", (req, res) => {

    res.render("privacy");

});
 
//render disclaimer page
app.get("/disclaimer", (req, res) => {

    res.render("disclaimer");

});
app.get("/ping", (req, res) => {
    res.json({
        success: true,
        message: "Server is alive"
    });
});

app.get("/env-test", (req, res) => {
    res.json({
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
         PASSWORD_EXISTS: !!process.env.DB_PASSWORD,
        PASSWORD_LENGTH: process.env.DB_PASSWORD
            ? process.env.DB_PASSWORD.length
            : 0
    });
});

const db = require("./config/db"); // Adjust the path if needed

app.get("/db-test", (req, res) => {
    db.query("SELECT 1 AS test", (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            results
        });

    });
});


//page not found

app.use((req, res) => {

    res.status(404).render("404");

});



/* TEST ROUTE */

/*app.get("/", (req, res) => {

  res.send("JobFinder API Running");

}); */

/* START SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});