const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Registration = require("../models/registration");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

exports.userLogin = (req, res, next) => {
  let fetchdUser;
  User.findOne({ phone: req.body.phone }).then(user => {
    
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    if(user.name !== req.body.name) {
        return res.status(401).json({
            message: "Auth failed"
          });
    }
    fetchdUser = user;
    return user;
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    
    const token = jwt.sign({phone: fetchdUser.phone, name: fetchdUser.name},  'secret', { expiresIn: "1h" } );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        id: fetchdUser._id,
        phone: fetchdUser.phone,
        name: fetchdUser.name,
        userImage: fetchdUser.userImage,
        is_active: fetchdUser.is_active
      });
      
  }).catch(err => {
    return res.status(401).json({
      message: "Invalid authentication credentials!" + err
    });
  });
}

exports.registerUser = (req, res, next) => {
  const verificationToken = uuidv4();
  const from = req.body.from;
  const to = req.body.to;
  let mailStatus;


  const registration = new Registration({
    email: to,
    token: verificationToken
  });
  registration.save().then(result => {
    
    const registrationUrl = 'http://localhost:3000/registration/' + verificationToken;
    const link = `<div style="width: 50%; margin: 0px auto 0px auto; text-align: center; border: 1px solid black; background-color: aliceblue;">
                <p style="font-size: x-large; font-weight: bold; color: blue;">your friend ${from} invited you to join him on WazzUp.</p>
                <br>
                 <p style="font-size: large; font-weight: bold;">for registration please follow this link:</p>
                 <br>
                 <a style="font-size: large;" href="${registrationUrl}">registration link</a>
                 <br>
                 <img style="width: 100%; height: auto; text-align: center; border: 1px solid black;" src="https://indtech.in/wp-content/uploads/2020/10/whatsapp-logo.jpg" alt="Mute WhatsApp Chat Forever">
             </div>`;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
        user: 'subconsciou.Service@gmail.com',
        pass: 'aviad2342'
      },
    }
    );
    const mailOptions = {
      from : 'subconsciou.Service@gmail.com',
      to : to,
      subject : 'WazzUp registration',
      text: 'registration',
      html: link,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log('noooo'+error);
    }
    mailStatus = true;
    console.log('okkkkk'+info);
  });
    res.status(201).json({
      message: 'created!',
      user: {
        ...result
      }
    });
  }).catch(err => {
    res.status(500).json({
        message: "Invalid authentication!"
    });
  });


}

exports.verifyUser = (req, res, next) => {
  Registration.findOne({ token: req.params.token  }).then(regData => {
    if(!regData) {
      return res.json({message: "Invalid authentication token!", verified: false});
    }
    return res.json({message: "Success!", verified: true});
  });

}


