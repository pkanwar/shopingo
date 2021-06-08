
export function getProducts(){
    let pageNo = 1;
    let numberOfItems = 16;
    const fetchProductsUrl = `/api/products?page=${pageNo}&size=${numberOfItems}&title=&category=&subCategory=`;
    fetch(fetchProductsUrl).then(res=>{
        console.log('products response : '+ res);
        if(res.status===200){
            return res.json();
        }else{
            // throw error 500
        }
    }).then((productList)=>{
        this.setState({
            products : productList
        });
    }).catch(err=>{
        console.log('error : ',err);
    })
}

export function getCart()
{
    const fetchCartUrl = '/api/cart/items/';
        fetch(fetchCartUrl).then((res)=>{
            console.log('res : ' + res.status);
            return res.json();
        }).then(cart=>{
            this.setState({
                cartQauntity : cart.cartQauntity
            })
    })
}
