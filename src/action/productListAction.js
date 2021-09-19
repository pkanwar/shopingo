
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
            products : productList,
            sideBarList : productList
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

export function getProductsByFilter(key,value)
{
    let filterMap = this.state.filterMap;
    let filter = []
    if(filterMap[key]){
        filter = filterMap[key];
        if(filter.includes(value))
        {
            const index = filter.indexOf(value);
            filter.splice(index,1);
        }else{
            filter.push(value);
        }
        
    }else{
        filter.push(value);
        filterMap[key] = filter;
    }
    console.log('filter : ', filter);
    console.log('filterMap : ', filterMap);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterMap)
    };
    fetch('/api/products/filter', requestOptions).then(res=>{
        return res.json();
    }).then(result=>{
        console.log('result : ', result);
        if(result.status === 'SUCCEEDED'){
            this.setState({
                filterMap : filterMap,
                products : result.products
            })
        }
    })
}

export function clearAllfilters()
{
    this.setState({
        filterMap : {},
    })
    getProducts.call(this)
    let author = document.getElementsByName("author") ;
    for(let i = 0;i < author.length; i++)
    {
        author[i].checked = false;
    }
    let genre = document.getElementsByName("genre");
    for(let i = 0;i < genre.length; i++)
    {
        genre[i].checked = false;
    }
    let rating =  document.getElementsByName("rating");
    for(let i = 0;i < rating.length; i++)
    {
        rating[i].checked = false;
    }
}