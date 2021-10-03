import React from 'react';
import '../css/productList.css';
import '../util/Navbar';
import Sidebar from '../util/Sidebar';
import ProductItem from '../util/ProductItem';
import Navbar from '../util/Navbar';
//import SlideShow from '../util/SlideShow';
import PageLink from '../util/PageLink';
import {getProducts,getCart,getProductsByFilter,clearAllfilters,nextPageAction} from '../action/productListAction.js';

class ProductList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            products : [],
            sideBarList : [],
            page : 1,
            size : 16,
            totalPagesWithFilter : 0,
            totalPagesWithoutFilter : 0,
            currentPageWithFilter : 1,
            currentPageWithoutFilter : 1,
            totalPages : 0,
            currentPage : 1,
            cartQauntity : 0,
            filterMap : {},
            searchTitle : ""
        }
    }

    handleClearFilterClick(e)
    {
        e.preventDefault();
        clearAllfilters.call(this)
    }
  
    handleAnchorClick(e)
    {
        // console.log('filter options : ',IsFilterOptionsPresent(this.state.filterMap))
        console.log('page number ', e.target.value)
        console.log('page operationType ', e.target.operationtype)
        nextPageAction.call(this,e.target.value)
    }
     
    onCheckBoxClick(e){
        getProductsByFilter.call(this,e.target.name,e.target.value);
    }

    onSearchClick(e){
        
        let searchText = document.getElementById("searchInput").value;
        console.log("text val : ", searchText);
        if(this.state.searchTitle!=="")
        {
            window.location = '/productFilter/' + this.state.searchTitle;
        }
    }

    onSearchText(e){
       this.setState({
           searchTitle : e.target.value
       })
    }

    componentDidMount(){
        let pageNumber = this.props.match.params.pageNumber;
        getProducts.call(this,pageNumber)
        getCart.call(this)
    }

    render(){
        console.log('filter map : ',this.state.filterMap)
        console.log('total pages : ',this.state.totalPages)
        const products = this.state.products;
        let noOfProducts =  products.length;
        let productListSize = 80 + (parseInt(Math.ceil(noOfProducts/4)))*400;
        let productContainerSize = parseInt(150 + (parseInt(Math.ceil(noOfProducts/4)))*400);

        const productListStyle = {
            height : productListSize
        }

        const productContainerStyle = {
            height : productContainerSize
        }

        let productGridHeight = parseInt(50 + (parseInt(Math.ceil(noOfProducts/4)))*400);
        const productGridStyle = {
            height : productGridHeight
        } 
        const productList = products.map((product,index)=>
            <ProductItem key={index} onCheckBoxClick={this.onCheckBoxClick.bind(this)} product={product} />
        );

        return (
        <div>
        <Navbar onSearchText={this.onSearchText.bind(this)}  onSearchClick={this.onSearchClick.bind(this)} quantity={this.state.cartQauntity} />
        <div className="container" >
            <Sidebar products={this.state.sideBarList} onCheckBoxClick={this.onCheckBoxClick.bind(this)} handleClearFilterClick={this.handleClearFilterClick.bind(this)}  />
            <div className="product-container" style={productContainerStyle} >
                {/* <div className="slide-show" >
                    <SlideShow />
                </div> */}
                <div className="product-list-class" style={productListStyle} >
                    <div className="product-grid" style={productGridStyle} >
                        {productList}
                    </div>
                </div>
                <div className="pagination" >
                    <input className="anchor" type="button" value="<<" onClick={this.handleAnchorClick.bind(this)} />
                    <PageLink handleAnchorClick={this.handleAnchorClick.bind(this)} currentPage={this.state.currentPage}  totalPages={this.state.totalPages} />
                    <input className="anchor" type="button" value=">>"  onClick={this.handleAnchorClick.bind(this)} />
                 </div>
            </div>
        </div>
        </div>
        );
    }
}

export default ProductList;