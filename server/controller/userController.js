const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcryptjs');
const error = require('../util/error');
const util = require('../util/utility');

exports.addUser = (req,res)=>{
    const {email,loginId,password,firstName,lastName,mobileNumber,address} = req.body;

    User.findOne({email}).then(user1 => {
        console.log('user1 : ',user1);
        if(user1){
            res.status(400).send(error.getError('ER002'));
            return;
        }

        User.findOne({loginId}).then(user2 => {
            console.log('user2 : ',user2)
            if(user2){
                res.status(400).send(error.getError('ER004'));
                return;
            }

            User.findOne({mobileNumber}).then(user3 => {
                console.log('user3 : ',user3)
                if(user3){
                    res.status(400).send(error.getError('ER003'));
                    return;
                }else{
                    const hashPassword = bcrypt.hashSync(password);
                    const newUser = new User({email,loginId,password: hashPassword,firstName,lastName,mobileNumber,address,cart:[]});
                    newUser.save().then(()=>{
            
                        console.log('user registered')
                
                        res.status(201).send(
                            {
                             id : newUser.id,
                             message : "Your account is successfully created . Please login to continue",
                             status : "SUCCEEDED"                
                            });
                        return;
                    })
                }
            })
        })

    })

}

exports.updateUser = (req,res)=>{
    const userId = req.session.userId;
    const updateMap = util.getUpdateMap(req.body);
    User.findOneAndUpdate({_id : userId},updateMap,(err,result)=>{
        if(err){
            console.log('err : ',err);
        }
        res.status(200).send({message : 'successfully update user information'});
        return;
    })
}

exports.getUserInfo = (req,res)=>{
    const userId = req.session.userId;    
    User.findById({_id : userId},(err,user)=>{
        if(err){
            console.log('err : ',err);
            res.status(400).send(error.getError('ER009'));
            return;
        }
        console.log('user : ', user);
        const userMap = util.getUserDetails(user);           
       res.status(200).send(userMap);
        
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}

exports.deleteUser = (req,res)=>{
    const userId = req.session.userId;
    User.findByIdAndDelete({_id:userId},(err,result)=>{
        if(err){
            console.log('err : ',err);
            res.status(400).send(error.getError('ER009'));
            return;
        }
        console.log('result : ',result);
        res.status(200).send({'message' : 'your account has been deactivated.'});
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}