
const pageSize = 12;

export const passivePageStyle = {
    "color" : "black",
    "background-color" : "#F0F0F0"
}

export const activePageStyle = {
    "color" : "#ffff",
    "background-color" : "#2F4F4F"
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
         console.log('is increment : ',isIncrementOperation(value))
        if(isIncrementOperation(value))
        {
            pageNumber = getPageNumber(currentPage+1,this.state.totalPages);
        }
    }
    if(IsFilterOptionsPresent(this.state.filterMap))
    {
        goToOtherPageByFilter.call(this,pageNumber);
    }else{
        getProducts.call(this,pageNumber);
    }
   
}

export function getProducts(pageNumber,pages){
    
    let totalPages = this.state.totalPages;;
    if(pages)
    {
        totalPages = pages;
    }
    let pageNo = 1;
    if(pageNumber){
        pageNo = getPageNumber(pageNumber,totalPages);
    }
    console.log("pageNo : ",pageNo)
    let numberOfItems = pageSize;
    const fetchProductsUrl = `/api/products?page=${pageNo}&size=${numberOfItems}&title=&category=&subCategory=`;
    fetch(fetchProductsUrl).then(res=>{
        console.log('products response : '+ res);
        if(res.status===200){
            return res.json();
        }else{
            // throw error 500
        }
    }).then((productList)=>{
        console.log('product list : ',productList)
        this.setState({
            products : productList.products,
            sideBarList : productList.products,
            totalPagesWithoutFilter : productList.totalPages,
            currentPageWithoutFilter : pageNo,
        });
        updatePageDetails.call(this)
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
    console.log('current page : ',this.state.currentPage)
    let filterMap = this.state.filterMap;
    let filter = []
    // filterMap['page'] = 1;
    // filterMap['size'] = pageSize;
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
    getPageAndSize.call(this,filterMap);
    console.log('filter : ',filterMap)
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
                products : result.products,
                currentPageWithFilter : 1,
                totalPagesWithFilter : result.totalPages,
            })
            updatePageDetails.call(this)
        }
    })
}

export function goToOtherPageByFilter(pageNumber)
{
    let filterMap = this.state.filterMap;
    filterMap['page'] = getPageNumber(pageNumber,this.state.totalPages);
    filterMap['size'] = 12;
    console.log('filter : ',filterMap)
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
                products : result.products,
                currentPageWithFilter : pageNumber,
                totalPagesWithFilter : result.totalPages,
            })
            updatePageDetails.call(this)
        }
    })

}

export function clearAllfilters()
{
    this.setState({
        filterMap : {},
    })
    console.log('state current page : ',this.state.currentPage);
    console.log('state total page : ',this.state.totalPages);
    console.log('state current page with filter : ',this.state.currentPageWithFilter);
    console.log('state total page with filter : ',this.state.totalPagesWithFilter);
    console.log('state current page without filter : ',this.state.currentPageWithoutFilter);
    console.log('state total page wihtout filter : ',this.state.totalPagesWithoutFilter);
        
    console.log('page current : ',this.state.currentPageWithoutFilter)
    getProducts.call(this,this.state.currentPageWithoutFilter,this.state.totalPagesWithoutFilter)
    
    console.log('update state current page : ',this.state.currentPage);
    console.log('update state total page : ',this.state.totalPages);
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

function updatePageDetails()
{
    console.log('updatePageDetails')
    if(IsFilterOptionsPresent(this.state.filterMap))
    {
        this.setState({
            currentPage : this.state.currentPageWithFilter,
            totalPages : this.state.totalPagesWithFilter
        })
    }else{
        console.log('wihtout')
        this.setState({
            currentPage : this.state.currentPageWithoutFilter,
            totalPages : this.state.totalPagesWithoutFilter
        })
        console.log('current p : ',this.state.currentPage)
    }
    return "done"
}

function getPageAndSize(filterMap)
{
    if(IsFilterOptionsPresent(filterMap))
    {
        filterMap['page'] = this.state.currentPageWithFilter
    }else{
        filterMap['page'] = this.state.currentPageWithoutFilter
    }
    filterMap['size'] = pageSize
}


export function IsFilterOptionsPresent(filterMap)
{
    if((filterMap.author && filterMap.author.length>0) || (filterMap.genre && filterMap.genre.length>0) || (filterMap.rating && filterMap.rating.length>0))
    {
        return true;
    }
    return false;
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