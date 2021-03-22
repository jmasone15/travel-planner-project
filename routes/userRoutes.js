const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const emailValidator = require('deep-email-validator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

// Register New User
router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

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
        const { valid } = await isEmailValid(email);
        if (!valid) return res.status(400).send("Please provide a valid email address.");

        // Checks if the email the user entered is already in the db
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .send("An account with this email already exists.");

        const msg = {
            to: email,
            from: "fouramigos36@gmail.com",
            subject: 'Welcome to Donde!',
            text: 'Welcome to Donde!',
            html: `Hello<strong> ${email}</strong>,<br><br>Thank you for making an account on Donde!<br><br>https://shielded-woodland-30004.herokuapp.com/<br><br>If you have any issues feel free to reply to this email to reach out to the dev team.`,
        }

        // Password Hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save a New User
        const newUser = new User({
            email: email,
            passwordHash: passwordHash
        });
        // Returns most recent user document that has been saved.
        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

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

// Route to activate the user's account
// router.put("/verify/:token", (req, res) => {
//     User.findOne({ temporarToken: req.params.token }, (err, user) => {
//         if (err) throw err; // Throw error if cannot login
//         const token = req.params.token; // Save the token from URL for verification
//         console.log("the token is", token);
//         // Function to verify the user's token
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 res.json({ success: false, message: "Activation link has expired." }); // Token is expired
//             } else if (!user) {
//                 res.json({ success: false, message: "Activation link has expired." }); // Token may be valid but does not match any user in the database
//             } else {
//                 user.temporaryToken = false; // Remove temporary token
//                 user.verified = true; // Change account status to Verified
//                 // Mongoose Method to save user into the database
//                 user.save(err => {
//                     if (err) {
//                         console.log(err); // If unable to save user, log error info to console/terminal
//                     } else {
//                         // If save succeeds, create e-mail object
//                         const emailActivate = {
//                             from: "fouramigos36@gmail.com",
//                             to: user.email,
//                             subject: "Localhost Account Activated",
//                             text: `Hello ${user.email
//                                 }, Your account has been successfully activated!`,
//                             html: `Hello<strong> ${user.email
//                                 }</strong>,<br><br>Your account has been successfully activated!`
//                         };
//                         sgMail
//                             .send(emailActivate)
//                             .then(() => {
//                                 console.log('Account Verified Confirmation Sent')
//                             })
//                             .catch((error) => {
//                                 console.error(error)
//                             })
//                         res.json({
//                             succeed: true,
//                             message: "User has been successfully verified."
//                         });
//                     }
//                 });
//             }
//         });
//     });
// });

module.exports = router;