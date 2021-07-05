const { io } = require('../app');


exports.createMessage = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const message = new Message({
    from_user: req.body.from_user,
    date: Date.parse(req.body.date),
    body: req.body.body,
  });
  message.save().then(result => {
    res.status(201).json({
      message: {
        ...result
      }
    });
    io.emit('message', result);
  }).catch(err => {
    res.status(500).json({
        message: "Invalid authentication credentials!"
    });
  });

}