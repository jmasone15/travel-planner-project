const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Verifier = require("email-verifier");

// Register New User
router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;
        let verifier = new Verifier(process.env.EMAIL_API_KEY);

        // Validation
        if (!email || !password || !passwordVerify)
            return res
                .status(400)
                .send("Please enter all required fields");
        if (password.length < 6)
            return res
                .status(400)
                .send("Please enter a password of at least six characters");
        if (password !== passwordVerify)
            return res
                .status(400)
                .send("Passwords don't match.");


        // Checks if the email the user entered is already in the db
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .send("An account with this email already exists.");

        verifier.verify(email, (err, data) => {
            if (err) {
                return res
                    .status(400)
                    .send("Please enter a valid email");
            } else {
                console.log(data)
            }
        })

        // await verifier.verify(email, (err, data) => {
        //     if (err) {
        //         return res
        //             .status(400)
        //             .send("Please enter a valid email");
        //     } else if (data.formatCheck === 'true' || data.smtpCheck === 'false' || data.dnsCheck === 'true' || data.disposableCheck === 'true') {
        //         return res
        //             .status(400)
        //             .send("Please enter a valid email");
        //     }
        // })


        // Password Hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save a New User
        const newUser = new User({ email, passwordHash });
        // Returns most recent user document that has been saved.
        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: false,
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Login an Existing User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password)
            return res
                .status(400)
                .send("Please enter all required fields");

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).send("Wrong email or password.");

        // BCrypt comapres the entered password with the hashed password in the DB
        // If the hashed password originated from the entered password, the function returns true. Else false.
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).send("Wrong email or password.");

        // Sign the token
        const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: false,
        }).send();


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Logout
router.get("/logout", (req, res) => {
    // We set the cookie to an empty string, and set it's expiration date to a day in the past.
    // This completely removes the cookie and logs out the user.

    res.cookie("token", "", {
        httpOnly: false,
        expires: new Date(0)
    }).send();
});


router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
        const userProfile = await User.findById(req.params.id);
        res.json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/profile/info/:id", auth, async (req, res) => {

    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const updateInfo = await User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                email: req.body.email,
                passwordHash: passwordHash
            }
        )
        res.json(updateInfo)
    } catch (err) {
        res.status(500).send();
        console.error(err)
    }
});

module.exports = router;