const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.cookies.token;

        // If there is no token in the request, the user is blocked
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        // If the token has not been created with our secret key or there isnt a secret key, the function throws an error.
        // We can then read the id of the user who made the request
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;

        // This function exits out of the middleware, and moves on in the route function.
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = auth;