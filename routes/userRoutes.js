const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const emailValidator = require('deep-email-validator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emails = require("../email/emailTemplate");

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
            html: emails.welcome
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
        // Validation
        const { valid } = await isEmailValid(req.body.email);
        if (!valid) return res.status(400).send("Please provide a valid email address.");

        // Password Encryption
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
        const resetMsg = {
            to: req.body.email,
            from: "fouramigos36@gmail.com",
            subject: 'Profile Info Changed!',
            text: 'Welcome to Donde!',
            html: emails.reset
        }
        sgMail
            .send(resetMsg)
            .then(() => {
                console.log('Info email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        res.json(updateInfo)
    } catch (err) {
        res.status(500).send();
        console.error(err)
    }
});

router.post("/forgot", (req, res) => {
    if (req.body.email === null) {
        res.status(400).send("email required");
    }
    User.findOne({ email: req.body.email }).then((existingUser, err) => {
        console.log(existingUser)
        if (existingUser === null) {
            console.error(err)
            res.status(404).send("No user associated with email.")
        } else if (!existingUser) {
            console.error(err)
            res.status(404).send("No user associated with email.")
        } else {
            const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);
            User.updateOne({ email: existingUser.email }, { resetPasswordToken: token }).then((data, err) => {
                if (err) {
                    console.error(err)
                    res.status(500).send();
                } else if (!res) {
                    console.error("No user updated")
                    res.status(404).send();
                } else {
                    const passMsg = {
                        to: existingUser.email,
                        from: "fouramigos36@gmail.com",
                        subject: 'Reset Password Link',
                        text: 'Reset Password Link',
                        html: `Please reset password at http://localhost:3000/reset/${token} or https://dondetravel.herokuapp.com/reset/${token}`
                    }
                    sgMail
                        .send(passMsg)
                        .then(() => {
                            console.log('Password email sent')
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    res.status(200).send("User Updated")
                }
            })
        }
    });
});

router.get("/reset", (req, res) => {
    User.findOne({ resetPasswordToken: req.query.resetPasswordToken }).then((user) => {
        if (user === null) {
            res.status(404).send("Password reset link is invalid or has expired")
        } else {
            res.status(200).send({
                email: user.email,
                message: "all good"
            });
        }
    });
});

router.put("/reset/password", async (req, res) => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const updateInfo = await User.findOneAndUpdate(
        {
            email: req.body.email
        },
        {
            passwordHash: passwordHash,
            resetPasswordToken: null
        }
    )
    const resetConfirmMsg = {
        to: req.body.email,
        from: "fouramigos36@gmail.com",
        subject: 'Profile Info Changed!',
        text: 'Welcome to Donde!',
        html: "Your password has been reset"
    }
    sgMail
        .send(resetConfirmMsg)
        .then(() => {
            console.log('Info email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    res.status(200).json(updateInfo);
})

module.exports = router;