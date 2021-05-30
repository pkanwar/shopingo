
const getCart = ()=>{
    const fetchCartUrl = '/api/cart/items/';
    fetch(fetchCartUrl).then((res)=>{
        console.log('res : ' + res.status);
        return res.json();
    }).then(cart=>{
        console.log('cart : ',cart)
        return cart;
    }).catch(err=>{
        console.log('error : ',err);
    })
}

export {getCart}