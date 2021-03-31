const User = require('../models/user');
const bcrypt = require('bcryptjs');
const error = require('../util//error');

exports.loginUser = (req,res)=>{
    const sessionId =req.sessionID;
    if(!req.body){
        res.status(400).send(error.getError('ER005'));
        return;
    }
    const {loginId,password} = req.body;
    
    User.findOne({loginId}).then(user=>{
          if(!user){
            res.status(404).send(error.getError('ER006'));
            return;
          }

          const match = bcrypt.compareSync(password, user.password);

          if(!match){
            res.status(400).send(error.getError('ER007'));
            return;
          }
          req.session.userId = user.id;
          res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });

}

exports.logoutUser = (req, res) => {
    delete req.session.userId;
    res.status(204).send();
}






