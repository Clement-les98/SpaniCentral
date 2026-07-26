const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {

        // Browser request
        if (req.originalUrl.startsWith("/admin")) {

            return res.redirect("/admin/login");

        }

        // API request
        return res.status(401).json({
            message: "Please login first."
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        // Browser request
        if (req.originalUrl.startsWith("/admin")) {

            return res.redirect("/admin/login");

        }

        // API request
        return res.status(401).json({
            message: "Session expired. Please login again."
        });

    }

};