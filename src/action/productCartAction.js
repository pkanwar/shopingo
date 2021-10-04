const pageSize = 10;

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
     postMap['productId'] = item.productId;
     postMap['title'] = item.title;
     postMap['imageUrl'] = item.imageUrl;
     postMap['discount'] = item.discount;
     postMap['quantity'] = 1;
     postMap['actualPrice'] = item.actualPrice;
     postMap['discountedPrice'] = item.discountedPrice;
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

export function getProductsBySearch(title,pageNumber,pages){
    console.log('title : ',title);
    console.log('pageNumber : ',pageNumber);
    let pageNo = 1;
    let numberOfItems = pageSize;
    let totalPages = this.state.totalPages;;
    if(pages)
    {
        totalPages = pages;
    }
    if(pageNumber){
        pageNo = getPageNumber(pageNumber,totalPages);
    }
    const fetchProductsUrl = `/api/products?page=${pageNo}&size=${numberOfItems}&title=${title}&category=&subCategory=`;
    console.log('url : ',fetchProductsUrl)
    fetch(fetchProductsUrl).then(res=>{
        console.log('products response : '+ res);
        if(res.status===200){
            return res.json();
        }else{
            // throw error 500
        }
    }).then((productList)=>{

        console.log("list : ", productList)
        if(!productList.products.length){
            let msg = "No search results found for '"+title+"'";
            let location = "";
            const redirect = '/error/' + msg + '|' + location;
            window.location = redirect;
        }
        this.setState({
            items : productList.products,
            totalPages: productList.totalPages,
            currentPage : pageNo,
        });
    }).catch(err=>{
        console.log('error : ',err);
    })
}

export function nextPageAction(value)
{
    let currentPage = this.state.currentPage;
    let pageNumber = 0;
   
    if(isPageNumberClick(value))
    {
        pageNumber = value;
    }else{
         pageNumber = getPageNumber(currentPage-1,this.state.totalPages);
        if(isIncrementOperation(value))
        {
            pageNumber = getPageNumber(currentPage+1,this.state.totalPages);
        }
    }
   
    getProductsBySearch.call(this,this.state.title,pageNumber);
   
}

function getPageNumber(pageNumber,totalPages)
{
    if(pageNumber > totalPages)
    {
        return totalPages;
    }else if(pageNumber < 1){
        return 1;
    }
    return pageNumber;
}

function isPageNumberClick(value)
{
    if(value==="<<" || value===">>")
    {
        return false;
    }
    return true;
}

function isIncrementOperation(operationType)
{
    if(operationType === "<<"){
        return false;
    }

    return true;
}
