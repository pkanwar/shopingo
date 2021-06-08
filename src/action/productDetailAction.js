
export function createAddProductRequest(product)
{
    let postMap = {};
    postMap['productId'] = product._id;
    postMap['title'] = product.title;
    postMap['imageUrl'] = product.imageUrl;
    postMap['discount'] = product.discount;
    postMap['quantity'] = 1;
    postMap['actualPrice'] = product.price.actualPrice;
    postMap['discountedPrice'] = product.price.discountedPrice;
    return postMap;
}

export function getProductById()
{
    const fetchUrl = '/api/products/' + this.state.id;
        fetch(fetchUrl).then(res=>{
            if(res.status===200){
                return res.json();
            }
        }).then((product)=>{
            this.setState({
                product : product
            })
           this.isItemPresentInCart();
           this.updateProductBtn();
        })
}

export function isItemPresent()
{
    const fetchUrl = '/api/cart/itemPresent/' + this.state.id;
        fetch(fetchUrl).then(res=>{
            return res.json();
        }).then((product)=>{
            console.log('product present ? : '+ product.isProductPresent);
            let value = "";
            if(product.isProductPresent === true){
                value = "GO TO CART";
            }else{
                value = "ADD TO CART";
            }
            this.setState({
                isItemPresent : product.isProductPresent,
                buttonValue : value
            })
        })
}

export function updateProduct()
{
    if(this.state.isItemPresent === true){
        this.setState({
            buttonValue : "GO TO CART"
        })
    }else{
        this.setState({
            buttonValue : "ADD TO CART"
        })
    }
}


export function handleOnClickProduct(product)
{
    if(this.state.isItemPresent===true){
        window.location = '/productCart/'
    }else{
    const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(this.createPostRequest(product))
         
     };
     fetch('/api/cart/', requestOptions).then(res=>{
         return res.json();
     }).then(data=>{
         if(data.status === 'SUCCEEDED'){
             this.setState({
                 isItemPresent : true
             })
         }
         console.log('data.productStatus : ',data.productStatus)
         if(data.productStatus === 'ADDED'){
             this.setState({
                 isItemAdded : true
             })
         }
     })
 }
}









