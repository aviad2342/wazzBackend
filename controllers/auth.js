const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");


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

// exports.registerUser = (req, res, next) => {
//   let fetchdUser;
//   User.findOne({ phone: req.body.phone }).then(user => {
//     fetchdUser = user;
//    const registrationnUrl = 'http://localhost:8000/registration/' + result.verificationToken;
//    const link = `<div style="width: 50%; margin: 0px auto 0px auto; text-align: center; border: 1px solid black; background-color: aliceblue;">
//                <p style="font-size: x-large; font-weight: bold;">your friend ${user.name} invited you to join them on WazzUp.</p>
//                 <p style="font-size: large; font-weight: bold;">for registration please follow this link</p>
//                 <br>
//                 <a style="font-size: large;" href="${registrationnUrl}">fregistration link</a>
//                 <br>
//                 <img src="https://st3.depositphotos.com/10953546/14866/v/600/depositphotos_148660113-stock-illustration-technology-social-media-network-link.jpg" alt="wazzup">
//             </div>`;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//       auth: {
//       user: 'subconsciou.Service@gmail.com',
//       pass: 'aviad2342'
//     },
//  }
// );
// const mailOptions = {
//    from : 'subconsciou.Service@gmail.com',
//    to : req.body.email,
//    subject : 'WazzUp registration',
//    text: 'registration',
//    html: link,
//  };
//     return user;
//   }).then(result => {
//     if (!result) {
//       return res.status(401).json({
//         message: "Auth failed"
//       });
//     }
    
//     const token = jwt.sign({phone: fetchdUser.phone, name: fetchdUser.name},  'secret', { expiresIn: "1h" } );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600,
//         id: fetchdUser._id,
//         phone: fetchdUser.phone,
//         name: fetchdUser.name,
//         userImage: fetchdUser.userImage,
//         is_active: fetchdUser.is_active
//       });
      
//   }).catch(err => {
//     return res.status(401).json({
//       message: "Invalid authentication credentials!" + err
//     });
//   });
// }


// export async function registerUser(req: Request, res: Response): Promise<any> {
//   const user: any = getRepository(Registered).create(req.body);
//   let minfo;
//  // hash the password, to securely store on DB
//   user.hashPassword();

// const result: Registered = await getRepository(Registered).save(user).catch( error => {
//   const imagePhat: string = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
//   if(fs.existsSync(imagePhat)) {
//       fs.unlinkSync(imagePhat);
//   }
// });

// const verificationUrl = 'http://localhost:8100/verification/' + result.verificationToken;
// const link = `<div style="width: 50%; margin: 0px auto 0px auto; text-align: center; border: 1px solid black; background-color: aliceblue;">
//                 <p style="font-size: x-large; font-weight: bold;">להפעלת החשבון לחץ על הקישור:</p>
//                 <br>
//                 <a style="font-size: large;" href="${verificationUrl}">קישור להפעלת חשבון</a>
//                 <br>
//                 <img src="https://images.ravpages.co.il/xsite_resources/user_content/5c/f5/a5/b4/5cf5a5b4496ea854fc907351d3823ee1/images/3495e0655839037a776975053843933c_226X236.png?ver=3.12&rxc=1532355884" alt="פילאי הנשמה">
//             </div>`;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//     auth: {
//       user: 'subconsciou.Service@gmail.com',
//       pass: 'aviad2342'
//     },
//  }
// );
// const mailOptions = {
//    from : 'subconsciou.Service@gmail.com',
//    to : result.email,
//    subject : 'הפעלת חשבון פלאי הנשמה',
//    text: 'להפעלת החשבון לחץ על הקישור:',
//    html: link,
//  };

// transporter.sendMail(mailOptions, async (error, info) => {
//   if (error) {
//     minfo = error;
//   }
//   result.emailSent = true;
//   await getRepository(Registered).save(result);
// });

// return res.json(result);
// }


