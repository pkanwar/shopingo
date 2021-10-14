const error = require('../util/error');

const authenticate = (req,res,next)=>{
    if(!req.session.userId){
        res.status(401).send(error.getError('ER008'));
        return;
    }
    next();
}

module.exports = {
    authenticate
};
