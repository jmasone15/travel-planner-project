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
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: courier, monospace;
      font-size: 16px;
    }
    body {
      color: #FFFFFF;
    }
    body a {
      color: #fe5d61;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start-->

     <!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#fe5d61" data-body-style="font-size:16px; font-family:courier, monospace; color:#FFFFFF; background-color:#f2f4fb;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f2f4fb">
            <tr>
              <td valign="top" bgcolor="#f2f4fb" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#FFFFFF; text-align:left;" bgcolor="#f2f4fb" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>You've found the secret!</p>
      </td>
    </tr>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7pyDCmyDaGcm5WsBBSaEgv" data-mc-module-version="2019-10-22">
      <tbody><tr>
        <td style="background-color:#69Ab8E; padding:50px 0px 30px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#69Ab8E"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px">Password Reset Request</span></div><div></div></div></td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="nSVYnVzPLnGZ4wUdynLiKo" data-mc-module-version="2019-10-22">
      <tbody><tr>
        <td style="background-color:#69AB8E; padding:30px 50px 30px 50px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#69AB8E"><div><div style="font-family: inherit; text-align: center">Please follow the link below to reset your password.</div>
<div style="font-family: inherit; text-align: center">&nbsp;
     <a href="http://localhost:3000/reset/${token}" target="_blank" alt="localhost reset" title="reset" style="display:inline-block; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">Localhost</a>
</div>
<div style="font-family: inherit; text-align: center">&nbsp;
    <a href="https://dondetravel.herokuapp.com/reset/${token}" target="_blank" alt="heroku reset" title="reset" style="display:inline-block; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">Reset</a>
</div>
<div style="font-family: inherit; text-align: center">If you did not request a password change, please ignore this email and your password will remain unchanged.</div><div></div></div></td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="iYySZ4rAB78PLoW7vU13Bb">
      <tbody><tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="mVyZz43HETwfwb72TGh4iy">
      <tbody><tr>
        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="3px" style="line-height:3px; font-size:3px;">
            <tbody><tr>
              <td style="padding:0px 0px 3px 0px;" bgcolor="#ffffff"></td>
            </tr>
          </tbody></table>
        </td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="sfek66tVLi5d2iy5jmSawj">
      <tbody><tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="87277ffe-54ed-4792-94f3-0a973b71c268">
    <tbody>
      <tr>
        <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
          <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
            <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="#" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#69AB8E; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">
        <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="#" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#69AB8E; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">
        <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="#" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#69AB8E; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">
        <img role="social-icon" alt="Instagram" title="Instagram" src="https://mc.sendgrid.com/assets/social/white/instagram.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="#" target="_blank" alt="Pinterest" title="Pinterest" style="display:inline-block; background-color:#69AB8E; height:30px; width:30px; border-radius:2px; -webkit-border-radius:2px; -moz-border-radius:2px;">
        <img role="social-icon" alt="Pinterest" title="Pinterest" src="https://mc.sendgrid.com/assets/social/white/pinterest.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td></tr></tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#69AB8E; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;" data-muid="txBUUpmixSjuZ5Ad69p1sX"><div class="Unsubscribe--addressLine"></div><p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><a target="_blank" class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`
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
    res.status(200).json(updateInfo);
})

module.exports = router;