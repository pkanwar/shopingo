import React from 'react';
import '../css/productList.css';
import '../util/Sidebar';
import '../util/Navbar';
import Sidebar from '../util/Sidebar';
import ProductItem from '../util/ProductItem';
import Navbar from '../util/Navbar';
import SlideShow from '../util/SlideShow';

class ProductList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            products : [],
            page : 1,
            size : 16,
            cartQauntity : 0
        }
    }

    onCheckBoxClick(name,val){
        
        console.log('name clicked !! ',name);
        console.log('value clicked !! ',val);
    }

    componentDidMount(){
        let pageNo = this.page;
        let numberOfItems = this.size;
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
        })
        
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

    render(){
        console.log('error show : ' + this.state.errorShow);
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
            <ProductItem key={index} onCheckBoxClick={this.onCheckBoxClick} product={product} />
        );

        return (
        <div>
        <Navbar quantity={this.state.cartQauntity} />
        <div className="container" >
            <Sidebar products={products} onCheckBoxClick={this.onCheckBoxClick}  />
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