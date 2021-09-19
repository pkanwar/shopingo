import React from 'react';
import '../css/productList.css';
import '../util/Navbar';
import Sidebar from '../util/Sidebar';
import ProductItem from '../util/ProductItem';
import Navbar from '../util/Navbar';
import SlideShow from '../util/SlideShow';
import {getProducts,getCart,getProductsByFilter,clearAllfilters} from '../action/productListAction.js';

class ProductList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            products : [],
            sideBarList : [],
            page : 1,
            size : 16,
            cartQauntity : 0,
            filterMap : {},
            searchTitle : ""
        }
    }

    handleClearFilterClick()
    {
        clearAllfilters.call(this)
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
        console.log("search text val : ", e.target.value);
       this.setState({
           searchTitle : e.target.value
       })
       console.log("state text : ", this.state.searchTitle);
    }

    componentDidMount(){
        getProducts.call(this)
        getCart.call(this)
    }

    render(){
        const products = this.state.products;
        let noOfProducts =  products.length;
        let productListSize = 50 + (parseInt(Math.ceil(noOfProducts/4)))*400;
        let productContainerSize = parseInt(420 + (parseInt(Math.ceil(noOfProducts/4)))*400);
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
                <div className="slide-show" >
                    <SlideShow />
                </div>
                <div className="product-list-class" style={productListStyle} >
                    <div className="product-grid" style={productGridStyle} >
                        {productList}
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }
}

export default ProductList;