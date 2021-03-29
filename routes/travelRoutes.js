const router = require("express").Router();
const Travel = require("../models/travelModel");
const auth = require("../middleware/auth");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/new", auth, async (req, res) => {
  try {
    const newTravel = new Travel({
      tripName: req.body.tripName,
      budget: req.body.budget,
      expenses: req.body.expenses,
      startLocation: req.body.startLocation,
      destination: req.body.destination,
      dates: req.body.dates,
      userId: req.body.userId
    });

    const createMsg = {
      to: req.body.email,
      from: "fouramigos36@gmail.com",
      subject: 'Welcome to Donde!',
      text: 'Welcome to Donde!',
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
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="98ndJyAY9BSGjoVqrr6FYx">
      <tbody><tr>
      </tr>
    </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3Ypdby9Xfsf2rN27zTDEfN">
      <tbody><tr>
      </tr>
    </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7pyDCmyDaGcm5WsBBSaEgv" data-mc-module-version="2019-10-22">
      <tbody><tr>
        <td style="background-color:#69AB8E; padding:50px 0px 30px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#69AB8E"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px">Thank you for building your trip!</span></div><div></div></div></td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="nSVYnVzPLnGZ4wUdynLiKo" data-mc-module-version="2019-10-22">
      <tbody><tr>
        <td style="background-color:#69AB8E; padding:30px 50px 30px 50px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#69AB8E"><div><div style="font-family: inherit; text-align: center">Your Trip to: ${req.body.destination}!</div>
<div style="font-family: inherit; text-align: center">&nbsp;</div>
<div style="font-family: inherit; text-align: center">To view more information about your trip, or change any of the plans, click the button down below!.</div>
<div style="font-family: inherit; text-align: center">&nbsp;</div>
<div style="font-family: inherit; text-align: center">Thank you for using Donde!</div><div></div></div></td>
      </tr>
    </tbody></table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%" data-muid="4ywPd9vJ6WFyV1Si75h9vh"><tbody><tr><td align="center" bgcolor="#69AB8E" class="outer-td" style="padding:10px 10px 60px 10px; background-color:#69AB8E;"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a style="background-color:#ffffff; border:1px solid #ffffff; border-color:#ffffff; border-radius:3px; border-width:1px; color:#69AB8E; display:inline-block; font-size:16px; font-weight:700; letter-spacing:1px; line-height:40px; padding:12px 20px 12px 20px; text-align:center; text-decoration:none; border-style:solid;" href="https://shielded-woodland-30004.herokuapp.com/" target="_blank">Trip Info</a></td></tr></tbody></table></td></tr></tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6jxKSRk9dKQ1Tvi1wtnu8q">
      <tbody><tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="https://mc.sendgrid.com/assets/uploads/0accac77b1e34c614730ab732317a493478835c96bd549fb2df7a921ec1177fdb30d6d33e1d0a33d8c6c579344890ae408ce13aaed0e478f1fd6d2219d308365.png" alt="" width="600" data-responsive="true" data-proportionally-constrained="false"></td>
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
  </table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#FFFFFF; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;" data-muid="txBUUpmixSjuZ5Ad69p1sX"><p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
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
      .send(createMsg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })


    const saveTravel = await newTravel.save();
    res.json(saveTravel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Get route

router.get("/:id", auth, async (req, res) => {
  try {
    const travels = await Travel.find({ userId: req.params.id });
    res.json(travels);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/trip/:id", auth, async (req, res) => {
  try {
    const travel = await Travel.findOne({ _id: req.params.id });
    res.json(travel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/update/:id", auth, async (req, res) => {
  try {
    const updatedTravel = await Travel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        tripName: req.body.tripName,
        budget: req.body.budget,
        startLocation: req.body.startLocation,
        destination: req.body.destination,
        dates: req.body.dates
      }
    )
    res.json(updatedTravel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/activities/:id", auth, async (req, res) => {
  try {

    const updatedTravel = await Travel.findOneAndUpdate(
      { _id: req.params.id }, { activities: req.body.activities }
    )
    res.json(updatedTravel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedTravel = await Travel.deleteOne({ _id: req.params.id });
    res.json(deletedTravel);

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;