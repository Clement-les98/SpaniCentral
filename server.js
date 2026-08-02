require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes =
  require("./routes/auth");

const jobsRoutes = require("./routes/jobs");

const cookieParser =
require("cookie-parser");
const contactRoutes =
require("./routes/contactRoute");

const verifyToken =
require("./middleware/authMiddleware");

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

app.get("admin/login", (req, res) => {
    res.render("admin/login");
});

app.get("admin/dashboard", verifyToken, (req, res) => {
    res.render("admin/dashboard");
});

app.get("admin/add-job", verifyToken, (req, res) => {
    res.render("admin/add-job");
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