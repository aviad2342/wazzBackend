const jwt = require("jsonwebtoken");
const User = require("../models/user");



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


