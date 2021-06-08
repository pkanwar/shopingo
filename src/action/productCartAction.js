
export function getCartItems()
{
    const fetchCartUrl = '/api/cart/items/';
    fetch(fetchCartUrl).then((res)=>{
        console.log('res : ' + res.status);
        return res.json();
        
    }).then((cartItem)=>{
        if(cartItem.status === "SUCCEEDED"){
            this.setState({
                items : cartItem.items,
                cartQuantity : cartItem.cartQuantity,
                actualPrice : cartItem.actualPrice,
                discount : cartItem.discount,
                totalPrice : cartItem.totalPrice,
                isDeleteAction : false,
                isIncrementAction : false
            });
        }else if(cartItem.status === "FAILED"){
            let msg = "";
            let location = "";
            msg = cartItem.message;
            const redirect = '/error/' + msg + '|' + location;
            window.location = redirect;
        }
    })
}

export function placeOrderRequestMap(item)
{
    let postMap = {};
    console.log('product id : ',item.productId);
     postMap['productId'] = item.productId;
     postMap['title'] = item.title;
     postMap['imageUrl'] = item.imageUrl;
     postMap['discount'] = item.discount;
     postMap['quantity'] = 1;
     postMap['actualPrice'] = item.actualPrice;
     postMap['discountedPrice'] = item.discountedPrice;
     console.log('postmap : ',postMap);
     return postMap;
}

export function placeOrder()
{
    const requestOptions = {
        method: 'POST',
    };
    fetch('/api/orders/', requestOptions).then(res=>{
       return res.json();
    }).then(result=>{
        let redirect = '/productOrder/'
        if(result.errorCode === 'ER008'){
            let msg = "";
            let location = "";
            msg = result.message;
            redirect = '/error/' + msg + '|' + location;
        }
        window.location = redirect;
    })
}

export function addItemForOrder(item)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.createPostRequest(item))
    };
    fetch('/api/cart/', requestOptions).then(res=>{
        return res.json();
    }).then(result=>{
        if(result.status === 'SUCCEEDED'){
            this.setState({
                isIncrementAction : true
            })
        }
    })
}

export function deleteItemFromOrder(productId,isDecrement)
{
    let reqBody = {
        productId,
        isDecrement
    };
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };
    fetch('/api/cart/', requestOptions).then((res)=>{
        return res.json();
    }).then((result)=>{
        if(result.status === 'SUCCEEDED'){
            this.setState({
                isDeleteAction : true
            })
        }
    })
}