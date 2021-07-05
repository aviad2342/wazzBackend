const Chat = require("../models/chat");

exports.createChat = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const chat = new Chat({
    id: req.body.id,
    users: req.body.users,
    messages: req.body.messages
  });
  chat.save().then(result => {
    res.status(201).json({
      chat: {
        ...result
      }
    });
  }).catch(err => {
    res.status(500).json({
        message: "Invalid authentication credentials!" + err
    });
  });

}


exports.getChat  = (req, res, next) => {
  Chat.findOne({'id': req.params.id }).then(chat => {
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({message: 'Chat not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching chat failed!" + error
    })
  });
  };

  exports.addChatMessage  = (req, res, next) => {
    Chat.findOne({'id': req.params.id }).then(chat => {
      if (chat) {
        chat.messages.push(req.body.message);
        chat.save().then(result => {
          res.status(201).json({
            chat: {
              ...result
            }
          });
        }).catch(err => {
          res.status(500).json({
              message: "Invalid authentication credentials!" + err
          });
        });
      } else {
        res.status(404).json({message: 'Chat not found!'});
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching chat failed!" + error
      })
    });
    };

exports.updateChat = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const chat = new Chat({
    id: req.body.from_user,
    users: req.body.users,
    messages: req.body.messages
  });
  chat.save().then(result => {
    res.status(201).json({
      chat: {
        ...result
      }
    });
    io.emit('newChat', result);
  }).catch(err => {
    res.status(500).json({
        message: "Invalid authentication credentials!"
    });
  });

}