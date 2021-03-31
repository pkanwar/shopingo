const Product = require('../models/product');

module.exports.getUpdateMap = (updateBody)=>{
    let updateMap = {};
    if(updateBody.email){
        updateMap['email'] = updateBody.email;
    }
    if(updateBody.firstName){
        updateMap['firstName'] = updateBody.firstName;
    }
    if(updateBody.lastName){
        updateMap['lastName'] = updateBody.lastName;
    }
    if(updateBody.mobileNumber){
        updateMap['mobileNumber'] = updateBody.mobileNumber;
    }
    if(updateBody.address){
        updateMap['address'] = updateBody.address;
    }

    return updateMap;
}

module.exports.getUserDetails = (user)=>{

    const userMap = {};

    if(user.email){
        userMap['email'] = user.email;
    }
    if(user.firstName){
        userMap['firstName'] = user.firstName;
    }
    if(user.lastName){
        userMap['lastName'] = user.lastName;
    }
    if(user.mobileNumber){
        userMap['mobileNumber'] = user.mobileNumber;
    }
    if(user.address){
        userMap['address'] = user.address;
    }
    if(user.cart){
        userMap['cart'] = user.cart;
    }
    return userMap;
}

module.exports.getPrice = (productId,quantity)=>{
    const totalPriceMap = {};
    Product.findOne({_id: productId}).then(product=>{
        const priceMap = product.price;
        console.log('priceMap : ',priceMap);
        let totalPrice = priceMap.actualPrice * quantity;
        let discountedPrice = null;
        if(priceMap.discountedPrice){
            discountedPrice = priceMap.discountedPrice * quantity;
        }
        totalPriceMap['totalPrice'] = totalPrice;
        totalPriceMap['discountedPrice'] = discountedPrice;
        console.log('priceMap : ',totalPriceMap);
        return totalPriceMap;
    })
}

module.exports.getCartInfo = (cartBody)=>{
    const cartMap = {};
    let quantity = 1;
    if(cartBody.quantity){
        quantity = cartBody.quantity;
    }
    cartMap['productId'] = cartBody.productId;
    cartMap['quantity'] = quantity;
    return cartMap;
} 