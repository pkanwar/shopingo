const order = require('../models/order');
const Order = require('../models/order');
const error = require('../util/error');
const util = require('../util/utility');


exports.createOrder = (req,res)=>{
    const userId = req.session.userId;
    console.log('userId : ',userId);
    console.log('session id : ',req.sessionID);
    if(!req.body){
        res.status(400).send(error.getError('ER012'));
    }
    let itemsList = [];
    let totalAmount = 0;
    let amountToBePaid = 0;
    req.body.items.forEach(item=>{
        console.log('item : ',item);
        const itemMap = {};
        itemMap['productId'] = item.productId;
        itemMap['title'] = item.title;
        itemMap['imageUrl'] = item.imageUrl;
        itemMap['discount'] = item.discount;
        itemMap['actualPrice'] = item.actualPrice;
        itemMap['discountedPrice'] = item.discountedPrice;
        totalAmount  += item.actualPrice * item.quantity;
        if(item.discount){
            amountToBePaid += item.discountedPrice *item.quantity;
            itemMap['isDiscountAvailable'] = 'Y';
        }else{
            amountToBePaid += item.actualPrice *item.quantity;
            itemMap['isDiscountAvailable'] = 'N';
        }
        itemsList.push(itemMap);
    })
    console.log('itemsList : ',itemsList);
    console.log('amountToBePaid : ',amountToBePaid);
   const newOrder = new Order({
       userId,
       items : itemsList,
       totalAmount,
       amountToBePaid,
       status: 'CREATED'
   })

   newOrder.save().then(()=>{
       res.status(200).send({message :'order successfully created'});
   })
    
}